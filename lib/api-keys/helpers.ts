import 'server-only'

import { db } from '@/lib/db/client'
import { keys } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from '@/lib/session/get-server-session'
import { encrypt, decrypt } from '@/lib/crypto'
import { nanoid } from 'nanoid'

type Provider = 'openai' | 'gemini' | 'cursor' | 'anthropic' | 'aigateway'

export async function getUserApiKeys(): Promise<
  Record<string, string | undefined>
> {
  const session = await getServerSession()

  const apiKeys: Record<string, string | undefined> = {
    openai: process.env.OPENAI_API_KEY,
    gemini: process.env.GEMINI_API_KEY,
    cursor: process.env.CURSOR_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    aigateway: process.env.AI_GATEWAY_API_KEY,
  }

  if (!session?.user?.id) {
    return apiKeys
  }

  try {
    const userKeys = await db.select().from(keys).where(eq(keys.userId, session.user.id))

    userKeys.forEach((key) => {
      const decryptedValue = decrypt(key.value)
      apiKeys[key.provider] = decryptedValue
    })
  } catch (error) {
    console.error('Error fetching user API keys:', error)
  }

  return apiKeys
}

export async function setUserApiKey(provider: Provider, apiKey: string): Promise<void> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  if (!['openai', 'gemini', 'cursor', 'anthropic', 'aigateway'].includes(provider)) {
    throw new Error('Invalid provider')
  }

  const encryptedKey = encrypt(apiKey)

  const existing = await db
    .select()
    .from(keys)
    .where(and(eq(keys.userId, session.user.id), eq(keys.provider, provider)))
    .limit(1)

  if (existing.length > 0) {
    await db
      .update(keys)
      .set({ value: encryptedKey, updatedAt: new Date() })
      .where(and(eq(keys.userId, session.user.id), eq(keys.provider, provider)))
  } else {
    await db.insert(keys).values({
      id: nanoid(),
      userId: session.user.id,
      provider,
      value: encryptedKey,
    })
  }
}

export async function deleteUserApiKey(provider: Provider): Promise<void> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  if (!['openai', 'gemini', 'cursor', 'anthropic', 'aigateway'].includes(provider)) {
    throw new Error('Invalid provider')
  }

  await db.delete(keys).where(and(eq(keys.userId, session.user.id), eq(keys.provider, provider)))
}