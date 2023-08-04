import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      aria-labelledby="contained-modal-title-vcenter"
      
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {editedCategory && (
        <>
          <input type="text" value={editedCategory.nome} onChange={handleChange} />
          <Modal.Footer>
          <Button onClick={handleSave}>Salvar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
          </Modal.Footer>
        </>
      )}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default CategoryEditModal;