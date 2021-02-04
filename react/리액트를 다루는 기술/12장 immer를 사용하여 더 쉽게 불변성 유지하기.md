## 12장 immer를 사용하여 더 쉽게 불변성 유지하기



### immer 설치하기

- `yarn add immer` 로 설치할 수 있다.



### immer 사용법

- `produce` : **불변성을 유지해주면서 새로운 상태**를 생성해준다. 첫번째 파라미터는 수정하고 싶은 상태이고, 두번째 파라미터는 상태를 어떻게 업데이트를 할지 정의하는 함수이다.
- 이때, 두번째 파라미터에 들어가는 함수는 **불변성을 무시한채** 작성한다.

```jsx
import produce from 'immer';

const nextState = produce(originalState, draft => {
  draft.somewhere.deep.inside = 5;
});
```

```jsx
function App() {
  ...
   const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce(form, (draft) => {
        draft[name] = value;
      })
    );
  }, []);
  
  const onSubmit = useCallback(
    (e) => {
      ...
      setData(
        produce(data, (draft) => {
          draft.array.push(info);
        })
      );
    ...
    }, [form.name, form.username]);

  const onRemove = useCallback((id) => {
    setData(
      produce(data, (draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);
 ...
}
```



### useState의 함수형 업데이트와 immer 함께 쓰기

- `useState` 의 함수형 업데이트가 들어 갈 자리에 `produce` 함수를 넣어준다.

```jsx
function App() {
  ...
   const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);
  
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );
      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [form.name, form.username]
  );

  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);
 ...
}
```

