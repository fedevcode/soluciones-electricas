"""Backend tests for Soluciones Eléctricas API"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://electric-trust-ba.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
class TestHealth:
    def test_health(self, client):
        r = client.get(f"{API}/health", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

    def test_root(self, client):
        r = client.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# Contact endpoint
class TestContact:
    valid_payload = {
        "name": "TEST_Carlos Pérez",
        "email": "test_carlos@example.com",
        "phone": "011 5152-7707",
        "service": "Instalación eléctrica",
        "message": "Necesito un presupuesto para instalación en mi casa.",
    }

    def test_create_contact_success(self, client):
        r = client.post(f"{API}/contact", json=self.valid_payload, timeout=60)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == self.valid_payload["name"]
        assert data["email"] == self.valid_payload["email"]
        assert data["service"] == self.valid_payload["service"]
        assert data["email_status"] in ("sent", "failed", "skipped")
        # Resend integration must work per requirement
        assert data["email_status"] == "sent", f"Expected 'sent' got {data['email_status']}"
        assert data.get("email_id"), "email_id missing"
        # No mongo _id leak
        assert "_id" not in data

    def test_missing_required_fields(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"}, timeout=20)
        assert r.status_code == 422

    def test_invalid_email(self, client):
        bad = dict(self.valid_payload, email="not-an-email")
        r = client.post(f"{API}/contact", json=bad, timeout=20)
        assert r.status_code == 422

    def test_short_message(self, client):
        bad = dict(self.valid_payload, message="hi")
        r = client.post(f"{API}/contact", json=bad, timeout=20)
        assert r.status_code == 422

    def test_list_contacts(self, client):
        r = client.get(f"{API}/contact", timeout=30)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "email_status" in it
