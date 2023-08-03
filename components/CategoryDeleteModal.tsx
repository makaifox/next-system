import React from 'react';

interface Category {
  id: string;
  nome: string;
}

interface CategoryDeleteModalProps {
  category: Category | null;
  onDelete: () => void;
  onCancel: () => void;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({ category, onDelete, onCancel }) => {
  const handleDelete = () => {
    if (category) {
      onDelete();
    }
  };

  return (
    <div>
      <h2>Confirmar Exclusão</h2>
      {category && (
        <>
          <p>Tem certeza que deseja excluir a categoria "{category.nome}"?</p>
          <button onClick={handleDelete}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default CategoryDeleteModal;
