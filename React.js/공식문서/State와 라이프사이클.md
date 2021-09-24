## State와 라이프사이클





### State

- `State` 란 컴포넌트에 의해 완전히 제어되며 컴포넌트에 private 한 속성이다.



### State 업데이트는 비동기일 수 있습니다.

- `setState` 함수를 통해서만, `State` 를 변경가능하며 이때 `setState` 는 호출 성능을 위해 비동기적으로 업데이트 될 수 있다.

- `setState((pre,props) => ...)` 를 통해서 문제를 해결 할 수 있다.

  

### State 업데이트는 병합됨

- `Class형 컴포넌트` 에서는 `setState` 에서 제공한 객체와 현재 `state` 를 병합한다. ( 함수형에서는 놉! )

```javascript
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
  
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        //comments는 유지된다.
        posts: response.posts
      });
    });
  }
  
	fetchComments().then(response => {
      this.setState({
        //posts는 유지된다.
        comments: response.comments
      });
    });
  }
}
```





### 데이터가 아래로 흐릅니다.

- 부모 컴포넌트나 자식 컴포넌트는 특정 컴포넌트의 `state` 유무를 알 수 없으며 캡슐화 되어 자기자신만 접근할 수 있다.

- 하지만 `state` 를 `props` 로 넘겨주어서 자식 컴포넌트가 부모 컴포넌트의 `state` 에 접근 할 수 있는데, 이때 유의해야 할 점은 `props` 로 받은 `state` 는 오직 `read-only` 이다.

  



