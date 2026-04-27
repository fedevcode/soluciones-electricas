from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'lucianaklein17@gmail.com')

# Create app
app = FastAPI(title="Soluciones Eléctricas API")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=4, max_length=40)
    service: Optional[str] = Field(default="Consulta general", max_length=120)
    message: str = Field(..., min_length=5, max_length=2000)


class ContactRecord(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    service: str
    message: str
    created_at: str
    email_status: str
    email_id: Optional[str] = None


# ---------- Email helpers ----------
def _build_html(payload: ContactRequest) -> str:
    return f"""
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: Arial, sans-serif; background-color:#F8FAFC; padding:24px;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #E2E8F0;">
            <tr>
              <td style="background-color:#0F172A; padding:24px 28px; color:#FACC15; font-size:20px; font-weight:bold;">
                ⚡ Soluciones Eléctricas — Nueva consulta
              </td>
            </tr>
            <tr>
              <td style="padding:28px; color:#0F172A; font-size:15px; line-height:1.6;">
                <p style="margin:0 0 18px 0;">Recibiste una nueva solicitud desde el sitio web.</p>
                <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-size:14px;">
                  <tr><td style="background:#F1F5F9; width:140px; font-weight:bold;">Nombre</td><td style="background:#F8FAFC;">{payload.name}</td></tr>
                  <tr><td style="background:#F1F5F9; font-weight:bold;">Email</td><td style="background:#F8FAFC;">{payload.email}</td></tr>
                  <tr><td style="background:#F1F5F9; font-weight:bold;">Teléfono</td><td style="background:#F8FAFC;">{payload.phone}</td></tr>
                  <tr><td style="background:#F1F5F9; font-weight:bold;">Servicio</td><td style="background:#F8FAFC;">{payload.service}</td></tr>
                  <tr><td style="background:#F1F5F9; font-weight:bold; vertical-align:top;">Mensaje</td><td style="background:#F8FAFC; white-space:pre-wrap;">{payload.message}</td></tr>
                </table>
                <p style="margin:24px 0 0 0; font-size:12px; color:#64748B;">Respuesta dentro del horario comercial: Lunes a Sábado, 9:00 a 17:00 hs.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#0F172A; color:#94A3B8; font-size:12px; padding:14px 28px; text-align:center;">
                Soluciones Eléctricas · Cid Campeador, CABA · 011 5152-7707
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    """


async def _send_email(payload: ContactRequest) -> dict:
    if not resend.api_key:
        return {"status": "skipped", "id": None, "error": "RESEND_API_KEY not set"}

    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFY_EMAIL],
        "reply_to": payload.email,
        "subject": f"Nueva consulta — {payload.service} — {payload.name}",
        "html": _build_html(payload),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "sent", "id": result.get("id"), "error": None}
    except Exception as e:
        logger.error(f"Resend error: {e}")
        return {"status": "failed", "id": None, "error": str(e)}


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Soluciones Eléctricas API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactRecord)
async def create_contact(payload: ContactRequest):
    record_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    email_result = await _send_email(payload)

    doc = {
        "id": record_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "service": payload.service or "Consulta general",
        "message": payload.message,
        "created_at": created_at,
        "email_status": email_result["status"],
        "email_id": email_result["id"],
        "email_error": email_result["error"],
    }

    await db.contact_requests.insert_one(doc)

    if email_result["status"] == "failed":
        # Don't block user — record is saved. Surface as warning.
        logger.warning(f"Contact saved but email failed: {email_result['error']}")

    return ContactRecord(
        id=record_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        service=doc["service"],
        message=payload.message,
        created_at=created_at,
        email_status=email_result["status"],
        email_id=email_result["id"],
    )


@api_router.get("/contact", response_model=List[ContactRecord])
async def list_contacts(limit: int = 100):
    items = await db.contact_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [
        ContactRecord(
            id=i["id"],
            name=i["name"],
            email=i["email"],
            phone=i["phone"],
            service=i.get("service", "Consulta general"),
            message=i["message"],
            created_at=i["created_at"],
            email_status=i.get("email_status", "unknown"),
            email_id=i.get("email_id"),
        )
        for i in items
    ]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
