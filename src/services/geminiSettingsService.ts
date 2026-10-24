export interface GeminiModelInfo {
  id: string;
  name: string;
  description: string;
  is_recommended: boolean;
}

export interface GeminiSettings {
  model: string;
  has_active_key: boolean;
  has_custom_key: boolean;
  masked_key: string;
  status: 'active' | 'invalid' | 'rate_limited' | 'not_configured' | 'error';
  status_message: string;
  latency_ms: number | null;
  supported_models: GeminiModelInfo[];
}

export interface TestKeyResult {
  is_active: boolean;
  status: 'active' | 'invalid' | 'rate_limited' | 'not_configured' | 'error';
  status_message: string;
  latency_ms: number | null;
  model: string;
}

export async function fetchGeminiSettings(): Promise<GeminiSettings> {
  try {
    const res = await fetch('/api/settings/gemini');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      model: 'gemini-2.5-flash',
      has_active_key: false,
      has_custom_key: false,
      masked_key: '',
      status: 'not_configured',
      status_message: 'Backend connection unavailable or using demo mode.',
      latency_ms: null,
      supported_models: [
        {
          id: 'gemini-2.5-flash',
          name: 'Gemini 2.5 Flash',
          description: 'Recommended: Ultra-low latency, native multimodal audio understanding, high rate limits.',
          is_recommended: true,
        },
        {
          id: 'gemini-2.0-flash',
          name: 'Gemini 2.0 Flash',
          description: 'Fast multimodal reasoning model.',
          is_recommended: false,
        },
        {
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash',
          description: 'Standard lightweight audio processing model.',
          is_recommended: false,
        },
        {
          id: 'gemini-2.5-pro',
          name: 'Gemini 2.5 Pro',
          description: 'Deep thinking model for complex multi-party financial extortion calls.',
          is_recommended: false,
        },
      ],
    };
  }
}

export async function updateGeminiSettings(
  model?: string,
  apiKey?: string
): Promise<GeminiSettings> {
  const res = await fetch('/api/settings/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      api_key: apiKey,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update settings: HTTP ${res.status}`);
  return await res.json();
}

export async function deleteGeminiKey(): Promise<GeminiSettings> {
  const res = await fetch('/api/settings/gemini', {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete key: HTTP ${res.status}`);
  return await res.json();
}

export async function testGeminiKey(
  apiKey?: string,
  model?: string
): Promise<TestKeyResult> {
  const res = await fetch('/api/settings/gemini/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      model,
    }),
  });
  if (!res.ok) throw new Error(`Failed to test key: HTTP ${res.status}`);
  return await res.json();
}
