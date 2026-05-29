import { useEffect, useMemo, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from './apiClient';

function ResourceView({ resourceName, title, endpoint }) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpointUrl = useMemo(() => endpoint, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResource() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(endpointUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const normalized = normalizeResponse(payload);

        setItems(normalized.items);
        setCount(normalized.count);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    }

    loadResource();

    return () => controller.abort();
  }, [endpointUrl]);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h2 className="h4 mb-0">{title}</h2>
          <span className="badge text-bg-dark">Count: {count}</span>
        </div>

        <p className="small text-muted mb-3">
          API base: <code>{getApiBaseUrl()}</code>
        </p>

        {loading && <p className="mb-0">Loading {resourceName}...</p>}

        {!loading && error && (
          <div className="alert alert-danger mb-0" role="alert">
            Failed to load {resourceName}: {error}
          </div>
        )}

        {!loading && !error && (
          <pre className="bg-light border rounded p-3 mb-0 data-preview">
            {JSON.stringify(items, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}

export default ResourceView;
