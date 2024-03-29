# Array VS ArrayList VS LinkedList

## Array

- 연관된 데이터를 그룹핑해서 관리하는 자료구조이다.
- `index`를 가지고 있는 것이 가장 큰 특징이다.

### 장점

- `index`를 통해 데이터를 빠르게 검색, 조회할 수 있다.

### 단점

- 사용하기 전에 배열의 크기를 지정해줘야 하고, 지정한 크기로 고정된다.
- 데이터를 삽입하거나 삭제하는 작업에서는 시간이 오래 걸린다.

## ArrayList

- `Array`에서 배열의 크기를 미리 정해 놓아야하는 단점을 극복하기 위해 나온 자료구조이다.
- 초기에 고정된 크기를 할당 받으며 생성되고, 초기에 지정한 크기를 넘어서면 동적으로 배열을 할당받아 크기를 늘린다는 특징을 가지고 있다.
- `index` 이외에도 할당된 배열을 가지키는 `참조변수`, `capacity 변수`, `size 변수`가 존재한다.

### 장점

- `Array`와 다르게 미리 크기를 지정하지 않아도 된다.
- `index`를 통해 데이터를 빠르게 검색, 조회할 수 있다.

### 단점

- `Array`와 같이 데이터를 삽입하거나 삭제하는 작업에서는 시간이 오래 걸린다.

## LinkedList

- `Array`에서 데이터를 입하거나 삭제할 때 비효율이 발생하는 단점을 극복하기 위해 나온 자료구조이다.
- 한 노드에서 뒤 혹은 앞에 연결된 노드의 참조값을 가리키는 방식으로 되어있다.
- 단일은 뒤에 노드만 가리키고 다중은 앞뒤 노드를 모두 가리킨다.
- index 대신, `뒤 (혹은 앞뒤) 노드의 참조값을 가리키고 있는 참조변수`가 존재한다.

### 장점

- `Array`와 다르게 미리 크기를 지정하지 않아도 된다.
- 참조변수를 통해 데이터를 빠르게 삽입, 삭제할 수 있다.

### 단점

- 데이터를 검색, 조회하는 작업에서는 시간이 오래 걸린다.

## 정리

- `Array`나 `ArrayList`에서는 `index`를 가지고 있기 때문에 빠르게 데이터를 검색할 수 있지만 삽입이나 삭제는 느리고
- `LinkedList`에서는 `뒤 (혹은 앞뒤) 노드의 참조값을 가리키고 있는 참조변수`를 가지고 있기 때문에 빠르게 데이터를 삽입, 삭제할 수 있지만 검색이 느리다는 점이 있다.
- 따라서 상황에 맞게 자료구조를 잘 선택하는 것이 중요할 듯 하다.
