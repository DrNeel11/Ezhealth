from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Database
from routes import auth, scans

app = FastAPI(title="Medical Scan Analysis API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB on startup
@app.on_event("startup")
async def startup_db_client():
    await Database.connect_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    await Database.close_db()

# Include routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(scans.router, prefix="/scans", tags=["Scans"])