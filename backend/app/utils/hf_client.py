from huggingface_hub import InferenceClient
from app.core.config import settings

client = InferenceClient(
    provider="hf-inference",
    api_key=settings.hf_token,
)