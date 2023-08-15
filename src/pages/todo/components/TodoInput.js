import { styled } from 'styled-components';
import { postData } from '../../../common/apis/api/defaultApi';
import { useState } from 'react';

export default function TodoInput({ setTodos }) {
  const [newTodo, setNewTodo] = useState('');

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async () => {
    if (newTodo !== '') {
      const res = await postData('/todos', { todo: newTodo });
      setTodos((prevTodos) => [...prevTodos, res.data]);
      setNewTodo('');
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Wrapper>
      <input
        type='text'
        data-testid='new-todo-input'
        value={newTodo}
        onChange={handleTodoChange}
        onKeyUp={handleKeyUp}
      />
      <button data-testid='new-todo-add-button' onClick={handleSubmit}>
        추가
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;

  > input {
    flex: 1;
  }
`;
