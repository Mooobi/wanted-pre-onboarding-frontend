import { styled } from 'styled-components';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { useState } from 'react';
import TodoProvider from '../components/TodoProvider';

export default function Todo() {
  const [todos, setTodos] = useState([]);

  return (
    <Box>
      <TodoProvider setTodos={setTodos}>
        <TodoInput setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </TodoProvider>
    </Box>
  );
}

const Box = styled.section`
  border: 1px solid #cccccc;
  border-radius: 1rem;
  width: 30rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;
