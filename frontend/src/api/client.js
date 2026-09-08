const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('sewapath_token');
}

export async function apiRequest(
  path,
  { method = 'GET', body, auth = true } = {}
) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log(res);


  const isJson = res.headers
    .get('content-type')
    ?.includes('application/json');

  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      data?.message || `Request failed (${res.status})`;

    throw new Error(message);
  }

  return data;
}