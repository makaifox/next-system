import React, { useState } from 'react';
import Link from 'next/link'; // Importe o Link do next/link
import CategoryEditModal from './CategoryEditModal';
import CategoryDeleteModal from './CategoryDeleteModal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; // Import Row from 'react-bootstrap', not 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/Col'; // Import Col from 'react-bootstrap', not 'react-bootstrap/esm/Col'

interface Category {
  id: string;
  nome: string;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setEditModalOpen(true);
  };

  const handleEditSave = (editedCategory: Category) => {
    // Lógica para salvar a edição no backend
    // Atualize a categoria no estado local ou refaça a busca no backend
    // Para atualizar a lista de categorias após a edição
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Lógica para deletar a categoria no backend
    // Remova a categoria do estado local ou refaça a busca no backend
    // Para atualizar a lista de categorias após a exclusão
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <Row>
        <Col> <h2>Lista de Categorias de Cliente</h2></Col>
      </Row>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <Row>
                  <Col>{category.nome}</Col>
                  <Col>
                    <Button onClick={() => handleEdit(category)}>Editar</Button>
                    <Link href={`/categories/${category.id}`} passHref>
                      <Button as="a" variant="secondary">Editar</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button onClick={() => handleDelete(category)}>Deletar</Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editModalOpen && (
        <CategoryEditModal
          category={categoryToEdit}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
      {deleteModalOpen && (
        <CategoryDeleteModal
          category={categoryToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default CategoryList;
