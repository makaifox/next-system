import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch the categories from the server here
    // and update the state with the received data
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // Assuming the API response contains the categories array
      })
      .catch((error) => {
        console.error('Erro ao buscar as categorias:', error);
      });
  }, [updatedCategories]);

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
        <Row className='d-flex justify-content-center'>
            <Col xs="12" className='d-flex justify-content-center index-title'>
            <h1 className='index-title'>Crie novas categorias de clientes</h1>
            </Col>
            <Col xs="12" className='d-flex justify-content-center search'>
              <br/>
              <CategoryForm onSubmit={handleCategorySubmit} />
                </Col>
                <Col xs="12">
                <CategoryList key={updatedCategories} categories={categories} setCategories={setCategories} />
                </Col>
          </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;
