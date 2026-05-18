from app.rag.supabase_client import supabase

def retrieve(user_clause_embedding):

    response = supabase.rpc(
      "match_fair_clauses",
      {
        "user_clause_embedding":user_clause_embedding,
        "match_count":5
      }
    ).execute()

    return response.data