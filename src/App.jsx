import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  // cadastro com hooks
  const Cadastro = () => {
    const [tarefas, setTarefas] = useState([]);
    const [texto, setTexto] = useState('')


    //carregar dados do localStorage ao abrir
    useEffect(() => {
      const salvas = localStorage.getItem('tarefas');
      if (salvas) {
        setTarefas(JSON.parse(salvas))
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas])
    const adicionar = (e) => {
      e.preventDefault();
      if (!texto.trim()) return;
      setTarefas([...tarefas, texto]);
      setTexto('');
    }
    const remover = (index) => {
      setTarefas(tarefas.filter((_, i) => i != index))
    }
    return (
      <>
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4 text-primary">Gerenciador de Tarefas</h2>
            
            <form onSubmit={adicionar} className="input-group mb-3">
              <input 
                type="text" 
                className="form-control"
                placeholder='Digite uma nova tarefa' 
                value={texto} 
                onChange={(e) => setTexto(e.target.value)} 
              />
              <button type='submit' className="btn btn-primary">Adicionar</button>
            </form>

            <ul className="list-group">
              {tarefas.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item}</span>
                  <button onClick={() => remover(index)} className="btn btn-danger btn-sm">Remover</button>
                </li>
              ))
              }
            </ul>
          </div>
        </div>
      </>
    )
  } // Fechamento da chave da const da cadastro
  return (<Cadastro />)
}

export default App
