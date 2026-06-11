from fastapi import APIRouter
from app.api.v1 import contract
router = APIRouter(prefix="/api/v1")
router.include_router(contract.router,tags=["Analyse"])