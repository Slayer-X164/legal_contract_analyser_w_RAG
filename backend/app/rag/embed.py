import json
from app.rag.supabase_client import supabase
from app.utils.hf_client import client


with open("app/rag/data/fair_clauses.json", "r") as file:
    fairClauses = json.load(file)
    for clause in fairClauses:
        embedding = client.feature_extraction(
            clause["text"],
            model="BAAI/bge-small-en-v1.5",
        )
        clause["embedding"] = embedding.tolist()

    enrichedClauses = []
    for clause in fairClauses:
        enrichedClauses.append(clause)
    try:
        response = (
            supabase.table("fair_clauses")
            .upsert(enrichedClauses)
            .execute()
        )
        print("seeding database...")
    except Exception as e:
        print(e)

    if response.data:
        print(len(response.data))
