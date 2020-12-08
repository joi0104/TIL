import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./TodoTemplate.js";
import TodoInsert from "./TodoInsert.js";
import TodoList from "./TodoList.js";

function App() {
  function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 2500; i++) {
      array.push({
        id: i,
        text: `할일 ${i}`,
        checked: false,
      });
    }
    return array;
  }

  const [todos, setTodos] = useState(createBulkTodos);
  const nextId = useRef(2501);

  const onInsert = useCallback((value) => {
    const newTodo = {
      id: nextId.current,
      text: value,
      checked: false,
    };
    setTodos((preTodos) => preTodos.concat(newTodo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((preTodos) => preTodos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((preTodos) =>
      preTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);
  /*
  function todoReducer(todos, action) {
    switch (action.type) {
      case 'INSERT':
        return todos.concat(action.todo);
      case 'TOGGLE':
        return todos.map(todo => todo.id === action.id? {...todo, checked: !todo.checked} : todo)l
      case 'DELETE':
        return todos.filter(todo => todo.id !== action.id);
    }
  }
  const [todos, setTodos] = useReducer(todoReducer, undefined, createBulkTodos);
  원래는 두번째 파라미터에 초기상태를 넣어주지만, 다음과 같이 두번째 파라미터에 undefined 세번째 파라미터에
  createBulkTodos를 넣으면 컴포넌트가 맨 처음 랜더링될 때만 함수가 호출된다.

  const onInsert = useCallback(
    ...
    dispatch({ type: 'INSERT', newTodo })
  );

  const onToggle = useCallback(
    ...
    dispatch({ type: 'TOGGLE', id });
  )

  const onDelete = useCallback(
    ...
    dispatch({ type: 'DELETE', id });
  )
  */

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
