import React, { useState } from 'react';
import Link from 'next/link'; // Importe o Link do next/link
import Navbartab from '../components/Navbartab';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Category {
  id: string;
  nome: string;
}

const CategoriesPage: React.FC = () => {
  const [updatedCategories, setUpdatedCategories] = useState<number>(0);

  const handleCategorySubmit = (category: Category) => {
    fetch('http://localhost:5000/api/categories', {
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
      <Navbartab />
      <Container>
      <Row>
            <Col>
              <h1>Crie novas categorias de clientes</h1>
        <CategoryForm onSubmit={handleCategorySubmit} />
        <CategoryList key={updatedCategories} categories={[]} />
            </Col>
          </Row>
      </Container>
    </div>
  );
};
export default CategoriesPage;
