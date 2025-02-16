from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import os
from mainmodel import predict_subtype_with_heatmap  # Change this line

router = APIRouter()

# Configure upload directory
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process the file with the ML model
        predicted_subtype, confidence, heatmap = predict_subtype_with_heatmap(file_path)
        
        return {
            "filename": file.filename,
            "status": "success",
            "predicted_subtype": predicted_subtype,
            "confidence": confidence,
            "heatmap": heatmap.tolist()  # Convert heatmap to list for JSON serialization
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list")
async def list_images():
    try:
        files = os.listdir(UPLOAD_DIR)
        return {"images": files}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))