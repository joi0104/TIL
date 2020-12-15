## 15장 Context API



- 상태들을 전역으로 관리할 수 있는 API
- `CreateContext(defaultValue)` :  Context 객체를 생성하며 이에 대응되는 `Provider`  와 `Consumer` 를 생성한다.
- `Provider`: Context 변경 사항을 자손들에게 제공 할 수 있다.
-  `Consumer` : Provide의 Value의 변경 사항을 구독하며, Context 에서 가장 가까운 Provider 의 Value 를 참조한다.
- `useContext` : Context를 좀 더 쉽게 사용할 수 있도록 추가된 React Hook
- (공식문서 참고하기)[https://ko.reactjs.org/docs/context.html]