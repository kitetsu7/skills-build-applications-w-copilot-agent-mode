import ResourceView from './ResourceView';

function Teams() {
  const codespaceName =
    import.meta.env.VITE_CODESPACE_NAME ||
    window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1];
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  return <ResourceView resourceName="teams" title="Teams" endpoint={endpoint} />;
}

export default Teams;
