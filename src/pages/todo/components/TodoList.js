import { styled } from 'styled-components';
import { deleteData, putData } from '../../../common/apis/api/defaultApi';
import { useState } from 'react';

export default function TodoList({ todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  const handleUpdateTodo = async (id, todo, isCompleted) => {
    if (editedTodo !== '') {
      const updatedTodo = {
        todo: todo,
        isCompleted: isCompleted,
      };

      const res = await putData(`/todos/${id}`, updatedTodo);

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? res.data : todo,
      );

      setTodos(updatedTodos);
      setIsEditing(null);
    }
  };

  const handleDeleteTodo = (id) => {
    deleteData(`/todos/${id}`);

    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const handleEditClick = (id, todo) => {
    setIsEditing(id);
    setEditedTodo(todo);
  };

  const handleKeyUp = (e, id, todo, isCompleted) => {
    if (e.key === 'Enter') {
      handleUpdateTodo(id, todo, isCompleted);
    }
  };

  return (
    <List>
      {todos?.map((todo) => (
        <li key={todo.id}>
          {isEditing !== todo.id ? (
            <>
              <ContentSection>
                <input
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={() =>
                    handleUpdateTodo(todo.id, todo.todo, !todo.isCompleted)
                  }
                />
                <span>{todo.todo}</span>
              </ContentSection>
              <EditSection>
                <button
                  data-testid='modify-button'
                  onClick={() => handleEditClick(todo.id, todo.todo)}
                >
                  수정
                </button>
                <button
                  data-testid='delete-button'
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  삭제
                </button>
              </EditSection>
            </>
          ) : (
            <>
              <ContentSection>
                <input
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={() =>
                    handleUpdateTodo(todo.id, todo.todo, !todo.isCompleted)
                  }
                />
                <input
                  data-testid='modify-input'
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  onKeyUp={(e) =>
                    handleKeyUp(e, todo.id, editedTodo, todo.isCompleted)
                  }
                />
              </ContentSection>
              <EditSection>
                <button
                  data-testid='submit-button'
                  onClick={() =>
                    handleUpdateTodo(todo.id, editedTodo, todo.isCompleted)
                  }
                >
                  제출
                </button>
                <button
                  data-testid='cancel-button'
                  onClick={() => setIsEditing(null)}
                >
                  취소
                </button>
              </EditSection>
            </>
          )}
        </li>
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-self: center;
  width: 100%;
  gap: 0.5rem;

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ContentSection = styled.label`
  display: flex;
  align-items: center;

  > input {
    margin-right: 0.5rem;
  }
`;

const EditSection = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: 0.5rem;
  }
`;
