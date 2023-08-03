import Navbar from '../components/Navbar';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // Faz uma requisição GET simples ao backend para verificar se está rodando
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend está rodando:', data);
      })
      .catch((error) => {
        console.error('Erro ao conectar ao backend:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Conteúdo Central Estático</h1>
    </div>
  );
};

export default HomePage;
