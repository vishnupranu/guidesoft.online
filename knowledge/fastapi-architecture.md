# FastAPI Backend Architecture

## Overview
The AI Orchestration engine is built on FastAPI, utilizing asynchronous workers via Celery and Redis to handle long-running agent tasks.

## Core Principles
1. **Dependency Injection**: Always use FastAPI's `Depends` for injecting database sessions, external API clients, and configuration.
2. **Pydantic Validation**: All incoming requests and outgoing responses must be strictly validated using Pydantic models.
3. **Async Everything**: Use `async def` for API routes to prevent blocking the event loop. Heavy AI computation should be offloaded to Celery workers using `.delay()`.

## Directory Structure
- `api/`: FastAPI route definitions.
- `core/`: Configuration, security, and global dependencies.
- `models/`: Database models (SQLAlchemy or Supabase).
- `schemas/`: Pydantic models for request/response validation.
- `services/`: Business logic and external API integrations.
- `worker.py`: Celery entry point.
