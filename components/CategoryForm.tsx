import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Category {
  nome: string;
}

const CategoryForm: React.FC = () => {
  const [nome, setNome] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory: Category = { nome };

    fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        // Lógica para atualizar a lista de categorias após o cadastro
        console.log('Nova categoria cadastrada:', data);
      })
      .catch((error) => {
        // Tratar erros, se necessário
        console.error('Error:', error);
      });

    setNome('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={handleChange}
        placeholder="Digite o nome da categoria"
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default CategoryForm;
