import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
  if (!category) {
    return null;
  }

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Deletar Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja deletar a categoria: <strong>{category.nome}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryDeleteModal;
