import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//액션 타입 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//액션 생성 함수
const toggleSwitch = () => ({
  type: TOGGLE_SWITCH,
});
const increase = () => ({
  type: INCREASE,
});
const decrease = () => ({
  type: DECREASE,
});

//초깃값 설정
const initalState = {
  toggle: false,
  counter: 0,
};

//변화를 일으키는 리듀서 함수 정의. state와 action을 파라미터로 받는다.
function reducer(state = initalState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

//스토어 생성
const store = createStore(reducer);

//상태가 업데이트 될 때마다 호출되는 함수
const render = () => {
  const state = store.getState();
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  counter.innerHTML = state.counter;
};

//구독하기. 리액트에서는 'react-redux'가 해주기 때문에 설정할 필요가 없다.
render();
store.subscribe(render);

//액션 발생시키기.
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
