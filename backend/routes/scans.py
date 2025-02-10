from fastapi import APIRouter, Depends, HTTPException
from schemas.scan_schema import ScanCreate, ScanUpdate, ScanResponse
from models.scan_model import Scan
from database import Database
from utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=ScanResponse)
async def create_scan(scan: ScanCreate, user=Depends(get_current_user)):
    scan_data = scan.dict()
    scan_data["user_id"] = user["id"]
    
    collection = Database.get_collection("scans")
    result = await collection.insert_one(scan_data)
    created_scan = await collection.find_one({"_id": result.inserted_id})
    return ScanResponse(**created_scan)

@router.get("/", response_model=list[ScanResponse])
async def get_scans(user=Depends(get_current_user)):
    collection = Database.get_collection("scans")
    scans = []
    async for scan in collection.find({"user_id": user["id"]}):
        scans.append(ScanResponse(**scan))
    return scans