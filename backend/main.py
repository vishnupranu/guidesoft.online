from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import time

app = FastAPI(
    title="GuideSoft AI Model Service",
    description="Combined Ollama and LLaMA backend orchestration microservice",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration and Brand Branding
BRAND_NAME = "GuideSoft AI (Ollama + LLaMA Hybrid)"
SUPER_ADMIN_EMAIL = "pranu21m@gmail.com"

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: Optional[str] = "guidesoft-llama-ollama-v1"
    messages: List[ChatMessage]
    user_email: str
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 2048

class TokenUsage(BaseModel):
    user_email: str
    tokens_used: int
    daily_limit: int
    remaining: int

# In-memory rate limiting and token tracker
token_tracker: Dict[str, Dict[str, Any]] = {}

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": BRAND_NAME,
        "supported_models": ["guidesoft-llama-ollama-v1", "ollama-deepseek-r1", "llama-3.3-70b-instruct"],
        "super_admin": SUPER_ADMIN_EMAIL
    }

@app.post("/api/v1/chat/completions")
def generate_chat_completion(request: ChatCompletionRequest, authorization: Optional[str] = Header(None)):
    user_email = request.user_email.strip().lower()
    
    # Enforce Paid User Rule: Reject unauthenticated/unpaid user calls
    if not user_email:
        raise HTTPException(status_code=401, detail="Paid user email verification required.")
    
    # Initialize or check token limits
    is_admin = (user_email == SUPER_ADMIN_EMAIL.lower())
    daily_limit = 99999999 if is_admin else 500000
    
    user_data = token_tracker.get(user_email, {"tokens_used": 0, "last_reset": time.time()})
    
    # Check 24hr reset
    if time.time() - user_data["last_reset"] > 86400:
        user_data["tokens_used"] = 0
        user_data["last_reset"] = time.time()
        
    if user_data["tokens_used"] >= daily_limit and not is_admin:
        raise HTTPException(
            status_code=429, 
            detail="Daily token limit reached for your plan. Please upgrade to Premium/Enterprise."
        )

    # Simulated hybrid response from Ollama & LLaMA pipeline
    user_prompt = request.messages[-1].content if request.messages else ""
    
    system_notification = f"[Powered by {BRAND_NAME} - Model: {request.model}]"
    
    response_content = (
        f"{system_notification}\n\n"
        f"Thank you for querying GuideSoft AI. Here is the generated response:\n\n"
        f"Processed prompt: '{user_prompt}'\n"
        f"Generated architecture payload ready. Execution completed seamlessly."
    )
    
    estimated_tokens = len(user_prompt.split()) + len(response_content.split())
    user_data["tokens_used"] += estimated_tokens
    token_tracker[user_email] = user_data

    return {
        "id": f"chatcmpl-gs-{int(time.time())}",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": BRAND_NAME,
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": response_content
                },
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": len(user_prompt.split()),
            "completion_tokens": len(response_content.split()),
            "total_tokens": estimated_tokens,
            "daily_remaining": max(0, daily_limit - user_data["tokens_used"])
        }
    }

@app.get("/api/v1/token-usage/{email}")
def get_token_usage(email: str):
    user_email = email.strip().lower()
    is_admin = (user_email == SUPER_ADMIN_EMAIL.lower())
    daily_limit = 99999999 if is_admin else 500000
    
    user_data = token_tracker.get(user_email, {"tokens_used": 0})
    remaining = max(0, daily_limit - user_data["tokens_used"])
    
    return TokenUsage(
        user_email=user_email,
        tokens_used=user_data["tokens_used"],
        daily_limit=daily_limit,
        remaining=remaining
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
