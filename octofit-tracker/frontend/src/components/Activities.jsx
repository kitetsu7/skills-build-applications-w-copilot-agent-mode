import ResourceView from './ResourceView';

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  return (
    <ResourceView resourceName="activities" title="Activities" endpoint={endpoint} />
  );
}

export default Activities;
