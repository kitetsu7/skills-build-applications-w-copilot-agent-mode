import ResourceView from './ResourceView';

function Users() {
  const codespaceName =
    import.meta.env.VITE_CODESPACE_NAME ||
    window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1];
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  return <ResourceView resourceName="users" title="Users" endpoint={endpoint} />;
}

export default Users;
