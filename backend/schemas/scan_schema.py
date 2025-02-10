from typing import Optional
from pydantic import BaseModel

class ScanCreate(BaseModel):
    name: str
    type: str
    patient_name: str
    patient_id: str
    gender: str
    scan_data: str

class ScanUpdate(BaseModel):
    status: Optional[str]
    confidence_score: Optional[float]
    anomalies: Optional[list]

class ScanResponse(ScanCreate):
    id: str
    status: str
    confidence_score: Optional[float]
    anomalies: list
    created_at: str