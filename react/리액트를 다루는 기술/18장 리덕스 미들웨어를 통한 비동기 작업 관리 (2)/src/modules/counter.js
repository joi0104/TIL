import { createAction, handleActions } from "redux-actions";
import { delay, put, takeLatest, select, throttle } from "redux-saga/effects";

//액션 타입 생성
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

//액션 생성함수 생성. 외부에서도 사용하므로 export.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC);
export const decreaseAsync = createAction(DECREASE_ASYNC);

//실제 액션을 수행하는 Worker 생성
function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
  const number = yield select((state) => state.counter); //사가 내부에서 상태 조회하기
  console.log(`현재 값은 ${number}입니다.`);
}

//실제 액션을 수행하는 Worker 생성
function* decreaseSage() {
  yield delay(1000);
  yield put(decrease());
}

//액션을 구독하는 Watcher 생성
export function* counterSaga() {
  yield throttle(3000, INCREASE_ASYNC, increaseSaga); //n초에 단 한번만 호출되도록 설정하는 함수
  yield takeLatest(DECREASE_ASYNC, decreaseSage); //기존에 진행중이던 작업이 있다면 취소처리하고 가장 마지막으로 실행된 작업만 수행하도록 설정하는 함수
}

//상태 초깃값 설정
const initialState = 0;

//리듀서 생성
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
