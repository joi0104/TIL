import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./TodoTemplate.js";
import TodoInsert from "./TodoInsert.js";
import TodoList from "./TodoList.js";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트에 스타일링 해보기",
      checked: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checked: false,
    },
  ]);
  const nextId = useRef(4);

  const onInsert = useCallback(
    (value) => {
      const newTodo = {
        id: nextId.current,
        text: value,
        checked: false,
      };
      setTodos(todos.concat(newTodo));
      nextId.current += 1;
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
