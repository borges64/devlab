import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Dashboard() {
  // 1. Estado inicializado explicitamente como array
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@devlab:token');

    if (!token) {
      navigate('/');
      return;
    }

    // 2. Verificação da resposta da API dentro do axios.get
    axios.get('http://localhost:3000/all-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Garante que o estado só recebe dados se for um array válido
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        localStorage.removeItem('@devlab:token');
        navigate('/');
      });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('@devlab:token');
    navigate('/');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Painel Principal (Dashboard)</h1>
      <button onClick={handleLogout}>Sair</button>

      <h2>Usuários Cadastrados:</h2>
      <ul>
        {/* O && só executa o .map se Array.isArray(users) for verdadeiro */}
        {Array.isArray(users) && users.map((user: any) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}