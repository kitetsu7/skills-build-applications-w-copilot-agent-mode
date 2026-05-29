import ResourceView from './ResourceView';

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  return <ResourceView resourceName="users" title="Users" endpoint={endpoint} />;
}

export default Users;
