import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProject] = useState([])
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setProject(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      
        title: "Desafio Node.js",
        url: "https://github.com/Merchanntt/Desafio_Node.js",
        techs: ["Node.js", "React"]
      
    })
    
    const project = response.data

    setProject([...projects, project])
  }
  
 
  async function handleRemoveRepository(id) {
    
    let response = await api.delete(`repositories/${id}`)
    if (response.status === 204) {
      const project = projects
      const projectIndex = project.findIndex(project => project.id === id)
      setProject(projects.filter(project => project.id !== id))
    }
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>
          {project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
