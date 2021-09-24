## 14장 외부 API를 연동하여 뉴스 뷰어 만들기



- 서버 `API` 와 통신할때에는 네트워크 송수신 과정에서 시간이 걸리기 때문에 해당 작업을 비동기적으로 처리해야한다.
- 자바스크립트에서 비동기 처리를 하는 방법은 크게 `콜백 함수`, `Promise` , `async/await` 3가지가 있다.



### 콜백 함수

- 비동기 작업을 순차적으로 처리하고 싶다면, 콜백함수를 중첩하여 구현할 수 있는데 이때 너무 중첩되면 `콜백 지옥` 이 생기면서 가독성이 떨어질 수 있다.

```javascript
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
};

increase(0, (result) => { console.log(result); });
```





### Promise

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10;
      if(result > 50) return reject(new Error('numberTooBig'));
      resolve(result);
    }, 1000);
  });
  return promise;
}

increase(0)
	.then(number => { console.log(number); });
	.catch(err => { console.log(err); });
```





### async/await

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10;
      if(result > 50) return reject(new Error('numberTooBig'));
      resolve(result);
    }, 1000);
  });
  return promise;
}

try {
  const result = await increase(0);
  console.log(result);
} catch (err) {
  cossole.log(err);
}
```



### usePromise 커스텀 Hook 만들기

- `Promise` 를 다루는 패턴은 많기 때문에 커스텀 `Hook` 을 만들어서 비동기 처리를 훨씬 간결하게 할 수 있다.

```jsx
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const promise = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    promise();
  }, deps);

  return [loading, resolved, error];
}
```

```jsx
import axios from "axios";
import usePromise from "./lib/usePromise";

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === undefined ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ed6f5b3db1e54374b8ecee25f33b20ad`
    );
  }, [category]);

  if (loading) {
    return <NewListWrapper>대기 중..</NewListWrapper>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewListWrapper>에러 발생!</NewListWrapper>;
  }

  const { articles } = response.data;

  return (
    <NewListWrapper>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewListWrapper>
  );
};

```

