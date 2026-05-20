from app.utils.openai_client import client


async def generateFairRewrite(clause, fair_clause_context):
    formatted_context = "\n\n".join([f"""
        Similar Clause {i+1}:
        Category: {c["category"]}
        Text: {c["text"]}
        Explanation: {c["explanation"]}
        """ for i, c in enumerate(fair_clause_context)])
    prompt = f"""
    You are a contract law analyst. Analyse the following clause with similar clause context and give fair rewrite
    Risky Clause: {clause["text"]}
    Why it is risky : {clause["reason"]}
    Here are similar fair industry-standard clauses : {formatted_context}

    Using the context above:
    1. Generate a fair rewrite in 1-2 lines.
    2. Keep professional legal tone.
    3. Preserve original intent while reducing unfairness.
    4. Do not use placeholders like [Number], [Company], or [Date] Generate realistic legal wording directly.

    Return ONLY the rewritten clause.
    """
    response = client.chat.completions.create(
        model="google/gemini-2.5-flash-lite",
        messages=[
            {
                "role": "system",
                "content": "You are a contract law analyst",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.1,
        max_tokens=500,
    )
    fair_rewrite = response.choices[0].message.content
    if not fair_rewrite:
        raise Exception("No fair clause rewrite generated!")

    return fair_rewrite.strip()
