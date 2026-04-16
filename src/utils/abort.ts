export async function fetchWithTimeout(
  input: string | URL,
  init?: RequestInit,
  timeoutMs = 5000,
  customFetch: typeof fetch = fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return await customFetch(input, {
    ...init,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}
