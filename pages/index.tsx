import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importe o Link do next/link
import Navbartab from '../components/Navbartab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryList from '../components/CategoryList';

interface Category {
  id: string;
  nome: string;
}

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Erro ao conectar ao backend:', error));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Navbartab />
        <Container>
          <Row className='d-flex justify-content-center'>
            <Col xs="12" className='d-flex justify-content-center index-title'>
              <h1>categorias de clientes</h1>
            </Col>
            <Col xs="12" className='d-flex justify-content-center search'>
              <br/>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar categoria..."
                />
                </Col>
                <Col xs="10">
              <CategoryList categories={filteredCategories} />
                </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
