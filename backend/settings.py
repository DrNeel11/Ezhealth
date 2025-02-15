from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .database import get_db
from .auth import get_current_user

router = APIRouter()

class PrivacySettings(BaseModel):
    share_data: bool
    receive_newsletters: bool

class ProfileUpdate(BaseModel):
    name: str
    email: str

class NotificationSettings(BaseModel):
    email_notifications: bool
    sms_notifications: bool

@router.put("/settings/privacy")
async def update_privacy_settings(settings: PrivacySettings, db=Depends(get_db), current_user=Depends(get_current_user)):
    # Update privacy settings in the database
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"privacy_settings": settings.dict()}})
    return {"message": "Privacy settings updated"}

@router.put("/settings/profile")
async def update_profile(profile: ProfileUpdate, db=Depends(get_db), current_user=Depends(get_current_user)):
    # Update profile information in the database
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"name": profile.name, "email": profile.email}})
    return {"message": "Profile updated"}

@router.put("/settings/notifications")
async def update_notification_settings(settings: NotificationSettings, db=Depends(get_db), current_user=Depends(get_current_user)):
    # Update notification settings in the database
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"notification_settings": settings.dict()}})
    return {"message": "Notification settings updated"}