## 13장 리액트 라우터로 SPA 개발하기



- `SPA` : single page application 의 약자. 단 한개의 페이지를 유지하고 변경되는 부분만 자바스크립트를 사용하여 업데이트 하는 어플리케이션

- `라우팅` : 다른 주소에 다른 화면을 보여 주는 것

- `SPA` 의 단점 :

  - 앱의 규모가 커지면 자바스크립트 파일도 커진다. 왜? 실제 방문하지 않는 페이지까지 불러오기 때문에. `코드 스플리팅` 으로 트래픽과 로딩속도를 개선할 수 있다.

  - 검색엔진 `SEO` 의 결과에 페에지가 잘 나타나지 않을 수 있다.

  - 추후 서버 사이드 랜더링을 배운다.

    

### History, Match, Location

- [history? match? location?](https://gongbu-ing.tistory.com/45) 포스팅에 잘 나와있다.

  

### react-router-dom 설치하기

- `yarn add react-router-dom` 으로 라이브러리를 설치한다.



### react-router-dom 적용하기

- `BrowserRouter` 컴포넌트를 사용하여 앱을 감싸준다.

```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```



### Route

- `Route` 컴포넌트를 사용하여 특정 주소에 보여줄 컴포넌트를 연결할 수 있다.

```jsx
<Route exact! path="주소 규칙" component={보여 줄 컴포넌트} />
```

```jsx
import { Route } from 'react-router-dom';

const App = () => {
  return(
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  )
}
```



### Link

- `a 태그` 는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태들을 모두 날려버리게 된다. 즉, `history` 관리가 되지 않는다.
- `Link` 컴포넌트를 사용하여  `history` 관리하며 특정 주소로 이동할 수 있다.

```jsx
<Link to="주소">내용</Link>
```

```jsx
import { Route, Link } from 'react-router-dom';

const App = () => {
  return(
    <div>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  )
}
```



### Route 하나에 여러 개의 path 설정하기

- 다음과 같이 여러개의 `path`를 하나의 `Route`에 설정할 수 있다.

```jsx
<Route exact! path={["주소1","주소2"]} component={보여 줄 컴포넌트} />
```



### 쿼리? 파라미터?

- 파라미터를 써야할 지, 쿼리를 써야 할지 따라야하는 규칙은 없다. 일반적으로 `파라미터`는 조회할 때 사용하고, `쿼리`는 검색이다 옵션을 전달할 때 사용한다.



### URL 파라미터

- `Route` 컴포넌트는 `match` , `history` , `location` 객체를 지정한 컴포넌트에 `props` 로 전달한다.
- `Route` 컴포넌트의 `path`  안에 `/:{파라미터}` 형식으로 `match` 객체에 파라미터를 전달할 수 있다.
- 그리고  `match` 객체의 `params` 프로퍼티를 통해서 얻을 수 있다.
- 위 방법이 아닌  `useParams` 라는 훅을 사용해서 파라미터를 얻을 수 있다. [react-router-dom 공식문서](https://reactrouter.com/web/guides/quick-start) 를 참고하자.

```jsx
//App.js

const App = () => {
  return (
    <>
    <Link to="/profile/velopert">velopert 프로필</Link>
    <Route path="/profile/:username" component={Profile} />
    </>
  )
}
```

```jsx
//Profile.js

const Profile = ({ match }) => {
  const { username } = match.params;
  return (
    <p>{ username }</p> 
  );
};
```



### URL 쿼리

- `url` 안에 `?key=value` 형식으로 `location` 객체에 쿼리를 전달할 수 있다.
- 그리고  `location` 객체의 `search` 프로퍼티를 통해서 얻을 수 있다.
- 또한, 쿼리는 문자열로 되어있기 때문에 객체로 변환하는 과정이 필요하다. 주로 `qs` 라이브러리를 사용한다.
- 위 방법이 아닌  `useLocation` 라는 훅을 사용해서 파라미터를 얻을 수 있다. [react-router-dom 공식문서](https://reactrouter.com/web/guides/quick-start) 를 참고하자.

```jsx
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true //문자열 맨앞의 ?를 생략한다.
  });
  
  return (
    <p>{ query }</p>
  );
};
```



### 서브 라우트

- 서브라우트: 라우트 내부에 또 라우트를 정의하는 것
- 라우트로 사용되고 있는 컴포넌트 내부에 또 `Route` 컴포넌트를 사용하면 된다.

```jsx
//App.js

const App = () => {
  return (
    <>
    <Link to="/profile/velopert">velopert 프로필</Link>
    <Route path="/profile/:username" component={Profiles} />
    </>
  )
}
```

```jsx
//Profiles.js

const Profiles = () => {
  return (
    <>
    <Link to="/profile/amanda">amanda</Link>
    <Link to="/profile/tom">tom</Link>
    <Route path="/profile/:username" component={Profile} />
    </>
  );
};
```

```jsx
//Profile.js

const Profile = ({ match }) => {
  const { username } = match.params;
  return (
    <p>{ username }</p> 
  );
};
```



### Switch

- `Switch` 컴포넌트는 여러 `Route` 를 감싸서 그중 일치하는 단 하나의 라우트만을 랜더링시켜 준다.

```jsx
import { Route, Link, Switch } from 'react-router-dom';

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  )
}
```



### NavLink

- `Link` 와 비슷하지만 링크가 활성화되었을 때의 스타일을 쉽게 적용할 수 있다.

```jsx
import { NavLink } from 'react-router-dom';

//Profiles.js

const Profiles = () => {
  const activeStyle = {
    background: 'black',
    color: 'white'
  }
  return (
    <>
    <NavLink activeStyle={activeStyle} to="/profile/amanda" active>amanda</NavLink>
    <NavLink activeStyle={activeStyle} to="/profile/tom">tom</NavLink>
    </>
  );
};
```

