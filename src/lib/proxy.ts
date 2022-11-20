import * as dotenv from 'dotenv';
dotenv.config();
const corsAnywhere = process.env.PUBLIC_CORS || '';

type requestOptions = RequestInit & {
  timeout?: number;
};

async function fetchWithTimeout(url: string, options: requestOptions = {}) {
  const { timeout = 10000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch {
    clearTimeout(id);
    return new Response();
  }
}

export async function proxy<ProxyResult>(
  url: string,
  options: requestOptions = {}
): Promise<ProxyResult> {
  const response = await fetchWithTimeout(`${corsAnywhere}${url}`, {
    ...options,
  });
  return response.json();
}

export default proxy;
