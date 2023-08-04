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
    <Modal show={true} onHide={onCancel}>
      <Modal.Header className="modal-header">
        <Modal.Title>Editar Categoria</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {editedCategory && (
          <>
            <input type="text" value={editedCategory.nome} onChange={handleChange} />
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditModal;
