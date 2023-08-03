import React, { useEffect, useState } from 'react';
import CategoryEditModal from './CategoryEditModal';
import CategoryDeleteModal from './CategoryDeleteModal';

interface Category {
  id: string;
  nome: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  useEffect(() => {
    console.log('Fetching categories from backend...');
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

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
    <h2>Lista de Categorias de Cliente</h2>
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          {category.nome}
          <button onClick={() => handleEdit(category)}>Editar</button>
          <button onClick={() => handleDelete(category)}>Deletar</button>
        </li>
      ))}
    </ul>
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