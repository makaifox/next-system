import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CategoryEditModal from './CategoryEditModal';
import CategoryDeleteModal from './CategoryDeleteModal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface Category {
  id: string;
  nome: string;
}

interface CategoryListProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>; // Add this prop to update categories
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories }) => {
  const router = useRouter();

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setEditModalOpen(true);
  };

  const handleEditSave = (editedCategory: Category) => {
    fetch(`http://localhost:5000/api/categories/${editedCategory.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) => (cat.id === editedCategory.id ? editedCategory : cat))
        );
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Erro ao atualizar a categoria:', error);
      });
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      fetch(`http://localhost:5000/api/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat.id !== categoryToDelete.id)
          );
          setDeleteModalOpen(false);
        })
        .catch((error) => {
          console.error('Erro ao deletar a categoria:', error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const isCategoriesPage = router.pathname === '/categories';

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nome</th>
            {isCategoriesPage && <th className='actiontab'>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.nome}</td>
              {isCategoriesPage && (
                <td>
                  <Button className="tablebutton" onClick={() => handleEdit(category)}>Editar</Button>
                  <Button className="tablebutton" variant="danger" onClick={() => handleDelete(category)}>Deletar</Button>
                </td>
              )}
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
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default CategoryList;
