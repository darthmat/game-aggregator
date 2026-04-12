export function urlBuilder(
  urlPath: string,
  params?: Record<string, string>,
  apiKey?: string,
): string {
  const url = new URL(urlPath);

  if (apiKey) {
    url.searchParams.set('key', apiKey);
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}
