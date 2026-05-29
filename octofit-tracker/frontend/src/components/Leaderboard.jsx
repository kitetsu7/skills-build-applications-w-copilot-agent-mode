import ResourceView from './ResourceView';

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  return (
    <ResourceView
      resourceName="leaderboard"
      title="Leaderboard"
      endpoint={endpoint}
    />
  );
}

export default Leaderboard;
