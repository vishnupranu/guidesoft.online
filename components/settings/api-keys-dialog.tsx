'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Eye, EyeOff, Plus, Trash2, Key } from 'lucide-react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Provider = 'openai' | 'anthropic' | 'gemini' | 'cursor' | 'aigateway'

interface ApiKeyEntry {
  provider: Provider
  name: string
  placeholder: string
  description: string
  icon: string
}

const PROVIDERS: ApiKeyEntry[] = [
  {
    provider: 'openai',
    name: 'OpenAI',
    placeholder: 'sk-...',
    description: 'OpenAI API key for GPT models and other services',
    icon: 'OpenAI',
  },
  {
    provider: 'anthropic',
    name: 'Anthropic',
    placeholder: 'sk-ant-...',
    description: 'Anthropic API key for Claude models',
    icon: 'Anthropic',
  },
  {
    provider: 'gemini',
    name: 'Gemini',
    placeholder: 'AIza...',
    description: 'Google Gemini API key for Gemini models',
    icon: 'Gemini',
  },
  {
    provider: 'cursor',
    name: 'Cursor',
    placeholder: 'cur_...',
    description: 'Cursor API key for Cursor agent',
    icon: 'Cursor',
  },
  {
    provider: 'aigateway',
    name: 'AI Gateway',
    placeholder: 'gw_...',
    description: 'AI Gateway key for proxy and unified access',
    icon: 'Gateway',
  },
]

interface ApiKeysDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface StoredKey {
  provider: Provider
  keyHash: string
  last4: string
  createdAt: string
}

export function ApiKeysDialog({ open, onOpenChange }: ApiKeysDialogProps) {
  const [keys, setKeys] = useState<Record<Provider, string>>({
    openai: '',
    anthropic: '',
    gemini: '',
    cursor: '',
    aigateway: '',
  })
  const [savedKeys, setSavedKeys] = useState<StoredKey[]>([])
  const [showKeys, setShowKeys] = useState<Record<Provider, boolean>>({
    openai: false,
    anthropic: false,
    gemini: false,
    cursor: false,
    aigateway: false,
  })
  const [loading, setLoading] = useState(false)
  const [newProvider, setNewProvider] = useState<Provider>('openai')
  const [newKey, setNewKey] = useState('')
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [keyError, setKeyError] = useState('')

  useEffect(() => {
    if (open) {
      fetchApiKeys()
    }
  }, [open])

  const fetchApiKeys = useCallback(async () => {
    try {
      const response = await fetch('/api/api-keys')
      const data = await response.json()

      if (data.success) {
        const storedKeys: StoredKey[] = data.apiKeys.map((k: { provider: Provider; value: string; createdAt: string }) => ({
          provider: k.provider,
          keyHash: k.value,
          last4: k.value.slice(-4),
          createdAt: k.createdAt,
        }))
        setSavedKeys(storedKeys)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
    }
  }, [])

  const handleSave = async (provider: Provider) => {
    const key = keys[provider]
    if (!key.trim()) {
      setKeyError('Please enter an API key')
      return
    }

    setLoading(true)
    setKeyError('')
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: key }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(`${PROVIDERS.find((p) => p.provider === provider)?.name} API key saved`)
        setKeys((prev) => ({ ...prev, [provider]: '' }))
        fetchApiKeys()
      } else {
        setKeyError(data.error || 'Failed to save API key')
      }
    } catch (error) {
      setKeyError('Failed to save API key')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (provider: Provider) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/api-keys?provider=${provider}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success(`${PROVIDERS.find((p) => p.provider === provider)?.name} API key deleted`)
        setSavedKeys((prev) => prev.filter((k) => k.provider !== provider))
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete API key')
      }
    } catch (error) {
      toast.error('Failed to delete API key')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = async () => {
    if (!newKey.trim()) {
      toast.error('Please enter an API key')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: newProvider, apiKey: newKey }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(`${PROVIDERS.find((p) => p.provider === newProvider)?.name} API key added`)
        setNewKey('')
        fetchApiKeys()
      } else {
        toast.error(data.error || 'Failed to add API key')
      }
    } catch (error) {
      toast.error('Failed to add API key')
    } finally {
      setLoading(false)
    }
  }

  const toggleShowKey = (provider: Provider) => {
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }))
  }

  const hasSavedKey = (provider: Provider) => savedKeys.some((k) => k.provider === provider)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </DialogTitle>
          <DialogDescription>
            Manage your API keys for connected providers. Add new keys or remove existing ones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Connected Keys</h3>
            {savedKeys.length === 0 ? (
              <p className="text-sm text-muted-foreground">No API keys connected yet.</p>
            ) : (
              <div className="space-y-2">
                {savedKeys.map((storedKey) => {
                  const providerInfo = PROVIDERS.find((p) => p.provider === storedKey.provider)
                  return (
                    <div
                      key={storedKey.provider}
                      className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Key className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{providerInfo?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ••••{storedKey.last4} • Added {new Date(storedKey.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(storedKey.provider)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add New Key</h3>
            <div className="flex gap-2">
              <Select value={newProvider} onValueChange={(v) => setNewProvider(v as Provider)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map((p) => (
                    <SelectItem key={p.provider} value={p.provider}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter API key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="pr-10"
                />
                <button
                  onClick={() => setNewKey(prev => {
                    const val = prev.startsWith('••') ? '' : prev
                    return val
                  })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  {newKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button onClick={handleAddNew} disabled={loading || !newKey.trim()}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {keyError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {keyError}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}