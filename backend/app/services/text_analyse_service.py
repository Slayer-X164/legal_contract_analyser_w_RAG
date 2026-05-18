from openai import OpenAI
from app.core.config import settings
import json
import re
from app.rag.embed import client as hf_client
from app.rag.retrieve import retrieve
client = OpenAI(
    api_key=settings.openrouter_api_key, base_url="https://openrouter.ai/api/v1"
)


async def analyse_text(text: str):

    prompt = f"""You are a contract law analyst. Analyse the following contract and identify risky clauses.
    For each risky clause, return a JSON object with this exact structure:
  {{
    "overall_score": "<integer 0-100, where 0 is extremely dangerous and 100 is perfectly fair>",
    "summary": "<1-2 sentence overall assessment>",
    "number_of_clauses": {{
      "low":"<exact number of low risk clause>",
      "medium":"<exact number of medium risk clause>",
      "high":"<exact number of high risk clause>"
    }},
    "clauses": [
      {{
        "id": "<unique string like c1, c2>",
        "text": "<exact clause text copied from the contract>",
        "risk": "<high | medium | low>",
        "category": "<e.g. Termination, IP Ownership, Non-Compete>",
        "reason": "<plain English explanation of why this is risky>",
        "suggestion": "<a fairer rewrite of this clause>"
      }}
    ]
  }}
  Return ONLY the JSON. No markdown, no backticks, no explanation outside the JSON.
  CONTRACT:
  {text}"""

    response = client.chat.completions.create(
        model="google/gemini-2.5-flash-lite",
        messages=[
            {
                "role": "system",
                "content": "You are a legal contract risk analyzer that only returns valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.1,
        max_tokens=4000,
    )
    raw = response.choices[0].message.content.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
      data = json.loads(raw)
      #from data.clauses extract each medium and high risk clause and embed them
      for clause in data["clauses"]:

        if clause["risk"] == "medium" or clause["risk"] == "high":
          embedding = hf_client.feature_extraction(
            clause["text"],
            model="BAAI/bge-small-en-v1.5",
          )
          fair_clause_context = retrieve(embedding.tolist())
          clause["retrieved_context"] = fair_clause_context

      print(data["clauses"])
      return data
    except json.JSONDecodeError as e:
      raise Exception(f"Invalid JSON returned: {e}")
