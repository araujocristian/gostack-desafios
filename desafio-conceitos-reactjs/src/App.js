import React, { useEffect, useState } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repo ${Date.now()}`,
      url: 'http://reposit',
      techs: ['React', 'JS'],
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    api.delete(`repositories/${id}`).then(setRepositories(newRepositories));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((project) => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
