from app.core.config import settings
from upstash_redis import Redis
from upstash_ratelimit import FixedWindow, Ratelimit
from fastapi import Request, HTTPException, status
redis_client = Redis(
  url = settings.upstash_redis_rest_url,
  token = settings.upstash_redis_rest_token
)

rate_limiter = Ratelimit(
  redis=redis_client,
  limiter=FixedWindow(max_requests=3, window=60)
)

def rate_checker(request: Request):
    print("inside rate limiter")
    forwarded = request.headers.get("X-Forwarded-For")
    client_ip = forwarded.split(",")[0] if forwarded else request.client.host
    print("ip:",client_ip)
    response = rate_limiter.limit(client_ip)

    if not response.allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={"error": "Too Many Requests! try again in a minute"}
        )
    return response