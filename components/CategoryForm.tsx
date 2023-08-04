import React, { useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

interface Category {
  nome: string;
}

interface CategoryFormProps {
  onSubmit: (category: Category) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory: Category = { nome };
    onSubmit(newCategory);
    setNome('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <input
          type="text"
          value={nome}
          onChange={handleChange}
          placeholder="Digite o nome da categoria"
          required
        />
        <Button type="submit" variant="outline-secondary" id="button-addon2">
          Adicionar
        </Button>
      </InputGroup>
    </Form>
  );
};

export default CategoryForm;
