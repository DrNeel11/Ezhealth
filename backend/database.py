from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect_db(cls):
        cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        cls.db = cls.client[settings.DB_NAME]
        
    @classmethod
    async def close_db(cls):
        cls.client.close()

    @classmethod
    def get_collection(cls, collection_name: str):
        return cls.db[collection_name]