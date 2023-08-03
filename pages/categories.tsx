import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

interface Category {
  nome: string;
}

const CategoriesPage: React.FC = () => {
  const [updatedCategories, setUpdatedCategories] = useState<number>(0);

  const handleCategorySubmit = (category: Category) => {
    fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdatedCategories((prevUpdatedCategories) => prevUpdatedCategories + 1);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar a categoria:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <CategoryForm onSubmit={handleCategorySubmit} />
      <CategoryList key={updatedCategories} />
    </div>
  );
};

export default CategoriesPage;
