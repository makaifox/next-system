import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      aria-labelledby="contained-modal-title-vcenter"
      
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {category && (
        <>
          <p>Tem certeza que deseja excluir a categoria "{category.nome}"?</p>
          <Button onClick={handleDelete}>Confirmar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </>
      )}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default CategoryDeleteModal;
