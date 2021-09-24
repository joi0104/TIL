## Flyweight 패턴

### 동기

- 객체 중심의 프로그램에서 객체의 생성에 대해서 비용이 많이 드는 경우가 있다.
- 예를 들어, 문서 편집기에서 문자를 나타내는 `Character` 라는 객체가 존재하는 경우 수천개의 문자를 포함하는 문서에서는 `Character`라는 객체를 수천개 생성해야하는 문제가 생긴다.
- 이는 곧 엄청난 메모리와 예상치 못한 실행 시간 낭비를 초래한다.
- 이때, `Flyweight 패턴`을 사용하면 본질적인 상태가 비슷한 객체를 공유 가능하도록 만들어서 객체 생성의 비용을 최소화 할 수 있다.

### 정의

> 많은 수의 소립 객체들을 공유 가능하도록 만드는 패턴

### 활용성

- 응용 프로그램이 대량의 객체를 사용해야 할 때
- 객체의 수가 너무 많아져 저장 비용이 너무 높아질 때
- 대부분의 객체 상태를 부가적인 것으로 만들 수 있을 때
- 부가적인 속성들을 제거한 후 객체들을 보사해보니 본질적인 속성들로 묶을 수 있을 때
- 응용프로그램이 객체의 정체성에 의존하지 않을 때

### 구조

![](https://blog.kakaocdn.net/dn/by7IEA/btq9t6DL2Ck/WfihOKmTK1JP8PeZxgOtVk/img.gif)

![](https://blog.kakaocdn.net/dn/bWeATB/btqwR35KP1W/LzpFCb97vggS2VOvt7mvwK/img.png)

- `Flyweight` : 부가적인 상태에서 동작해야하는 인터페이스를 가진 추상 객체
- `Concrete Flyweight` : `Flyweight` 인터페이스를 구현하고 내부적으로 본질적인 상태를 정의하고 있는 객체. 공유할 수 있는 객체.
- `UnsharedConcrete Flyweight` : `Flyweight` 인터페이스를 구현하고 내부적으로 모든 상태를 정의하고 있는 객체. 공유될 수도 되지 않을수도 있는 객체. `UnsharedConcrete Flyweight` 객체가 `Concrete Flyweight` 를 자신의 자식으로 가지고 있는 것은 흔함.
- `FlyweightFactory` : `Flyweight` 객체를 생성하고 관리하며, `Flyweight` 객체가 제대로 공유되도록 보장하는 객체

### 협력 방법

- `Flyweight` 객체가 기능을 수행하는 데 필요한 상태가 본질적인 것인지 부가적인 것인지 구분해야 한다. 본질적인 상태는 `Concrete Flyweight`에 저장해야 하고, 부가적인 상태는 사용자가 저장하거나 연산되어야 하는 다른 상태로 관리해야 한다.
- 사용자는 `Concrete Flyweight` 직접 만들 수 없다. 오직 `FlyweightFactory` 를 통해서 얻어야 한다.

### 결과

- 본질이 같은 객체를 공유가능한 객체로 만들어 인스턴스의 전체 수를 줄일 수 있다.
- 객체별 본질적 상태의 양을 줄일 수 있고 부가적인 상태는 연산되거나 저장될 수 있다.
- 하지만 `Flyweight 패턴`은 본질적인 상태로 저장되 있던 것을 부가적인 상태로 만들어, 부가적인 상태의 연산과 전송에 드는 런타임 비용을 새로 들여올 수 있다.
