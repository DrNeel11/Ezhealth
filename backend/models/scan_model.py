from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class ScanBase(BaseModel):
    name: str
    type: str
    patient_name: str
    patient_id: str
    gender: str
    scan_data: str  # Base64 encoded image or file path
    status: str = "pending"
    confidence_score: Optional[float] = None
    anomalies: list = []
    doctor: str
    created_at: datetime = datetime.now()

class ScanCreate(ScanBase):
    pass

class Scan(ScanBase):
    id: str
    user_id: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Breast Cancer Scan",
                "type": "MRI",
                "patient_name": "Jane Doe",
                "patient_id": "PT-12345",
                "gender": "female",
                "status": "completed",
                "confidence_score": 92.5,
                "anomalies": ["High cell density", "Abnormal morphology"],
                "doctor": "Dr. Sarah Johnson"
            }
        }