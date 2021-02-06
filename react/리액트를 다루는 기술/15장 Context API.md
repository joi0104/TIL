## 15장 Context API



- 상태들을 전역으로 관리할 수 있는 API



### 새 Context 만들기

- Context 객체를 생성하며 이에 대응되는 `Provider` 와 `Consumer` 를 생성한다.

```jsx
import { createContext } from 'react';

const ColorContext = createContext({ color: 'black'});

export default ColorContext;
```



### Consumer 사용하기

- `Cousumer` 를 통해서 컴포넌트 내부에서 전역 상태를 조회할 수 있다.

```jsx
import ColorContext from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorContext.Consumner>
      {value => (
        <div
          style={{
            witdh: '64px',
            height: '64px',
            background: value.color   
          }}
        />
      )}
    </ColorContext.Consumner>
  );
};
```



### Provider 사용하기

- `Provider` 를 통해서 컴포넌트 내부에서 전역 상태를 변경할 수 있다.

```jsx
import ColorContext from '../contexts/color';

const App = () => {
  return (
    <ColorContext.Provider value={{ color: 'red' }}> //초기값 설정 없으면 에러.
      <ColorBox />
    </ColorContext.Provider>
  )
}
```



### 동적 Context 사용하기

- `Context` 에 무조건 상태값만 정의하는 것이 아닌, `state` 와 `actions` 를 정의해 줄 수 있다.

```jsx
import React, { createContext, useState } from "react";

//Context 생성
const ColorContext = createContext({
  state: { color: "black" },
  actions: {
    setColor: () => {},
  },
});

//Provier 생성. 초기값 설정
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");

  const value = {
    state: { color },
    actions: { setColor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

//Consumer 생성
const { Consumer: ColorConsumer } = ColorContext;

export { ColorConsumer, ColorProvider };

export default ColorContext;
```

- 위에 작성한 `Consumer ` 와 `Provider` 를 수정한다.

```jsx
import ColorConsumer from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorConsumner>
      {value => (
        <div
          style={{
            witdh: '64px',
            height: '64px',
            background: value.state.color   
          }}
        />
      )}
    </ColorConsumner>
  );
};
```

```jsx
import ColorProvider from '../contexts/color';

const App = () => {
  return (
    <ColorProvider>
      <ColorBox />
    </ColorProvider>
  )
}
```

- 동적으로 `state` 를 변경하기 위해 `Consumer` 를 통해서 `action` 을 호출한다.

```jsx
import ColorConsumer from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorConsumner>
      { ({ state, actions }) => (
        <div
          style={{
            witdh: '64px',
            height: '64px',
            background: state.color   
          }}
        />
        <button onClick={() => { actions.setColor('white')}} />
      )}
    </ColorConsumner>
  );
};
```



### useContext Hook 사용하기

```jsx
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
  cosnt { state, actions } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          witdh: '64px',
            height: '64px',
              background: state.color   
        }}
        />
      <button onClick={() => { actions.setColor('white')}} />
    </>
  );
};
```



### 기타

- (공식문서 참고하기)[https://ko.reactjs.org/docs/context.html]

