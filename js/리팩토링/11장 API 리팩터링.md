## 11장 API 리팩터링



### 11.1 질의 함수와 변경 함수 분리하기

- `명령-질의 분리` : 질의 함수는 모두 부수효과가 없어야 한다.

- 값을 반환하면서 부수효과도 있는 함수를 발견하면 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도한다. 무조건!

- 절차는 다음과 같다.

  - 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.

  - 새 질의 함수에서 부수효과를 모두 제거한다.

  - 정적 검사를 수행한다.
  - 원래 함수를 호출하는 곳에서 반환값을 사용한다면 질의 함수를 호출하도록 바꾼다. 그리고 원래의 변경 함수를 호출하는 코드를 바로 아래에 삽입한다.

  - 원래 함수에서 질의 관련 코드를 제거한다.

  - 테스트 한다.
  - 참고로 위 코드는 중복이 많이 보인다. 그럴 땐, 변경함수에서 질의 함수를 사용하도록 고치면 해결된다.

- 예시는 다음과 같다.

  ```javascript
  //수정 전
  function alertForMiscreant(people){
  	for(const p of people) {
  		if(p === '조커') {
  			setOffAlarms();
  			return '조커';
  		}
  		if(p === '사루만') {
  			setOffAlarms();
  			return '사루만';
  		}
  	}
  	return "";
  }
  
  const found = alertForMiscreant(people);
  ```

  ```javascript
  //수정 후
  function findMiscreant(people){ 
  	for(const p of people) {
  		if(p === '조커') {
  			return '조커';
  		}
  		if(p === '사루만') {
  			return '사루만';
  		}
  	}
  	return "";
  }
  
  function alertForMiscreant(people){
  	for(const p of people) {
  		if(p === '조커') {
  			setOffAlarms();
  		}
  		if(p === '사루만') {
  			setOffAlarms();
  		}
  	}
  	return "";
  }
  
  const found = findMiscreant(people);
  alertForMiscreant(people);
  ```

  - 참고로 위 코드는 중복이 많이 보인다. 그럴 땐, 변경함수에서 질의 함수를 사용하도록 고치면 해결된다.

  ```javascript
  function alertForMiscreant(people) {
  	if(findMiscreant(people) !== "") setOffAlarms();
  }
  ```

  

### 11.2 함수 매개변수화하기

- 두 함수의 로직이 아주 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다.
- 절차는 다음과 같다.
  - 비슷한 함수 중 하나를 선택한다.
  - 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
  - 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
  - 테스트 한다.
  - 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
  - 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트 한다.
- 예시는 다음과 같다.

```javascript
//수정 전
function tenParcentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.05);
}
```

```javascript
//수정 후
function raise(aPerson, factor) {
	aPerson.salary = aPerson.salary.multiply(1+factor);
}
```



### 11.3 플래그 인수 제거하기

- `플래그 인수`: 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수

  - 호출하는 쪽에서 불리언 값으로 리터럴 값을 건네야 한다.
  - 호출되는 쪽에서 데이터가 아닌 제어 흐름을 결정하는데 사용해야 한다.
  - 어떻게 호출해야 하는지 이해를 저해하기 때문에 사용하지 않는 것이 좋다.

- 절차는 다음과 같다.

  - 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
  - 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

- 예시는 다음과 같다.

  - 조건문 분해하기 이용

  ```javascript
  //수정 전
  function deliveryData(anOrder, isRush){
  	if(isRush){
  		let deliveryTime;
  		if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  		else if (["NY","NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  		else deliveryTime = 3;
  		return anOrder.placeOn.plusDays(1+deliveryTime);
  	} else {
  		let deliveryTime;
  		if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 2;
  		else if (["NY","NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
  		else deliveryTime = 4;
  		return anOrder.placeOn.plusDays(1+deliveryTime);
  	}
  }
  
  aShipment.deliveryDate = deliveryDate(anOrder, true);
  aShipment.deliveryDate = deliveryDate(anOrder, false);
  ```

  ```javascript
  //수정 후
  function rushDeliberyDate(anOrder) {
    let deliveryTime;
  	if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  	else if (["NY","NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  	else deliveryTime = 3;
  	return anOrder.placeOn.plusDays(1+deliveryTime);
  }
  
  function regularDeliberyDate(anOrder) {
    let deliveryTime;
  	if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  	else if (["NY","NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  	else deliveryTime = 3;
  	return anOrder.placeOn.plusDays(1+deliveryTime);
  }
  
  aShipment.deliveryDate = rushDeliveryDate(anOrder);
  aShipment.deliveryDate = regularDeliveryDate(anOrder);
  ```

  - 래핑함수 이용

  ```javascript
  //수정 전
  function deliveryData(anOrder, isRush){
  	let result;
  	let deliveryTime;
  	if (anOrder.deliveryState === 'MA') || anOrder.deliveryState === 'CT')
  		deliveryTime = isRush? 1 : 2;
  	else if (anOrder.deliveryState === 'NY') || anOrder.deliveryState === 'NH') {
  		deliveryTime = 2;
  		if (anOrder.deliveryState === 'NH' && !isRush)
  			deliveryTime= 3;
  	}
  	else if (isRush)
  		deliveryTime = 3;
  	else if (anOrder.deliveryState === 'ME')
  		deliveryTime = 3;
  	else
  		deliveryTime = 4;
  }
  ```

  ```javascript
  //수정 후
  function deliveryData(anOrder, isRush){
  	let result;
  	let deliveryTime;
  	if (anOrder.deliveryState === 'MA') || anOrder.deliveryState === 'CT')
  		deliveryTime = isRush? 1 : 2;
  	else if (anOrder.deliveryState === 'NY') || anOrder.deliveryState === 'NH') {
  		deliveryTime = 2;
  		if (anOrder.deliveryState === 'NH' && !isRush)
  			deliveryTime= 3;
  	}
  	else if (isRush)
  		deliveryTime = 3;
  	else if (anOrder.deliveryState === 'ME')
  		deliveryTime = 3;
  	else
  		deliveryTime = 4;
  }
  
  function rushDeliveryDate(anOrder) { return deliveryDate(anOrder, true); }
  function regularDeliveryDate(anOrder) { return deliveryDate(anOrder, false); }
  ```

  