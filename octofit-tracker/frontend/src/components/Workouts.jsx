import ResourceView from './ResourceView';

function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  return (
    <ResourceView resourceName="workouts" title="Workouts" endpoint={endpoint} />
  );
}

export default Workouts;
