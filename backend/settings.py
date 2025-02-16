from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .database import get_db
from .auth import get_current_user, hash_password

router = APIRouter()

class PrivacySettings(BaseModel):
    share_data: bool
    receive_newsletters: bool

class ProfileUpdate(BaseModel):
    name: str
    email: str

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

class NotificationSettings(BaseModel):
    email_notifications: bool
    sms_notifications: bool

@router.put("/settings/privacy")
async def update_privacy_settings(settings: PrivacySettings, db=Depends(get_db), current_user=Depends(get_current_user)):
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"privacy_settings": settings.dict()}})
    return {"message": "Privacy settings updated"}

@router.put("/settings/profile")
async def update_profile(profile: ProfileUpdate, db=Depends(get_db), current_user=Depends(get_current_user)):
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"name": profile.name, "email": profile.email}})
    return {"message": "Profile updated"}

@router.put("/settings/password")
async def update_password(password_update: PasswordUpdate, db=Depends(get_db), current_user=Depends(get_current_user)):
    user = await db["users"].find_one({"_id": current_user["_id"]})
    if not user or not verify_password(password_update.current_password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    hashed_password = hash_password(password_update.new_password)
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"hashed_password": hashed_password}})
    return {"message": "Password updated"}

@router.put("/settings/notifications")
async def update_notification_settings(settings: NotificationSettings, db=Depends(get_db), current_user=Depends(get_current_user)):
    await db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"notification_settings": settings.dict()}})
    return {"message": "Notification settings updated"}