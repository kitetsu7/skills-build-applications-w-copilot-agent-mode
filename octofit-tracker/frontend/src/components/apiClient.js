export function getApiBaseUrl() {
  const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME;

  const derivedCodespaceName =
    typeof window !== 'undefined'
      ? window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1]
      : undefined;

  const codespaceName = envCodespaceName || derivedCodespaceName;

  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getResourceUrl(resourceName) {
  return `${getApiBaseUrl()}/${resourceName}/`;
}

export function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      count: payload.length,
    };
  }

  const items =
    payload?.items ??
    payload?.results ??
    payload?.data ??
    payload?.docs ??
    [];

  const safeItems = Array.isArray(items) ? items : [];
  const count =
    payload?.count ??
    payload?.total ??
    payload?.totalCount ??
    payload?.pagination?.total ??
    safeItems.length;

  return {
    items: safeItems,
    count,
  };
}
