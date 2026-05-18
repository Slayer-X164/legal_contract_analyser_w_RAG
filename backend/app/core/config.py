from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  frontend_url:str

  gemini_api_key:str
  openrouter_api_key:str
  hf_token:str

  supabase_url:str
  supabase_service_role_key:str
  
  class Config:
    env_file = ".env"
    env_file_encoding ="utf-8"

settings = Settings()