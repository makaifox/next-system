import React, { useState } from 'react';

interface Category {
  id: string;
  nome: string;
}

interface CategoryEditModalProps {
  category: Category | null;
  onSave: (editedCategory: Category) => void;
  onCancel: () => void;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({ category, onSave, onCancel }) => {
  const [editedCategory, setEditedCategory] = useState<Category | null>(category);

  const handleSave = () => {
    if (editedCategory) {
      onSave(editedCategory);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategory((prevCategory) =>
      prevCategory ? { ...prevCategory, nome: e.target.value } : null
    );
  };

  return (
    <div>
      <h2>Editar Categoria</h2>
      {editedCategory && (
        <>
          <input type="text" value={editedCategory.nome} onChange={handleChange} />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onCancel}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default CategoryEditModal;
