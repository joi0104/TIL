import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo;
  return (
    <div>
      <input
        type="checkbox"
        checked={done}
        onClick={() => {
          onToggle(id);
        }}
        readOnly={true}
      />
      <span>{text}</span>
      <button
        onClick={() => {
          onRemove(id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

const Todos = ({
  input,
  todos,
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    onChangeInput('');
  };

  const onChange = (e) => {
    onChangeInput(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
