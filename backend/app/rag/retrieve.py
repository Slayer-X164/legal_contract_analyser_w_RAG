from app.rag.supabase_client import supabase
from app.utils.hf_client import client

async def retrieve(clause_text):
  # first embedding text
    embedding = client.feature_extraction(
        clause_text,
        model="BAAI/bge-small-en-v1.5",
    )
    # running vector similarity search
    response = supabase.rpc(
        "match_fair_clauses",
        {"user_clause_embedding": embedding.tolist(), "match_count": 5},
    ).execute()

    return response.data
