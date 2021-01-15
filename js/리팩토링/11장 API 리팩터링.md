## 11장 API 리팩터링



### 11.1 질의 함수와 변경 함수 분리하기

- `명령-질의 분리` : 질의 함수는 모두 부수효과가 없어야 한다.
- 값을 반환하면서 부수효과도 있는 함수를 발견하면 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도한다. 무조건!

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



### 11.4 객체 통째로 넘기기

- 하나의 레코드에서 값 두어개를 가져오는 대신 레코드를 통째로 넘기고 함수 본문에서 필요한 값들을 꺼내 쓰도록 수정한다.

- 중복도 없애고 매개변수 목록의 수정을 덜 할 수 있다는 점에서 변화에 대응하기 쉽다.

- 악취 맡기

  - 어떤 객체로 부터 값 몇개를 얻고 그 값들만으로 무언가를 하는 로직
  - 다른 객체의 메서드를 호출하면서 객체 자신의 데이터 여러개를 건네는 로직

- 예시는 다음과 같다.

  ```javascript
  //수정 전
  const low = aRoom.daysTempRange.low;
  const high = aRoom.daysTempRange.high;
  if (aPlan.withinRange(low,high)) alerts.push("방 온도가 지정 범위를 벗어났습니다.");
  
  //HeatingPlan 클래스
  withinRange(bottom,top) {
    return (bottom >= this._temperatureRange.low) &&
      			(top <= this._temperatureRange.high);
  }
  
  //수정 후
  if (aPlan.withinRange(aRoom.daysTempRange)) alerts.push("방 온도가 지정 범위를 벗어났습니다.");
  
  //HeatingPlan 클래스
  withinRange(aNumberRange) {
    return (aNumberRange.bottom >= this._temperatureRange.low) &&
      			(aNumberRange.top <= this._temperatureRange.high);
  }
  ```



### 11.5 매개변수를 질의 함수로 바꾸기

- 제거하려는 매개변수의 값을 다른 매개변수에 질의해서 얻을 수 있다면 안심하고 질의 함수로 바꿀 수 있다.

- 주의해야할 점

  - 참조 투명해야한다. (함수에 똑같은 값을 건네 호출하면 항상 똑같이 동작한다)
  - 매개변수를 제거했을 때 피호출 함수에 원치않는 의존성이 생기면 안된다.

- 책의 저자는 주로 **호출하는 쪽을 간소하게 하고, 책임 소재를 피호출 함수로 옮긴다.**

- 예시는 다음과 같다.

  ```javascript
  //수정 전
  get finalPrice() {
  	const basePrice = this.quantity * this.itemPrice;
  	let discountLevel;
  	if (this.quantity > 100) discountLevel = 2;
  	else discountLevel = 1;
  	return this.discountedPrice(basePrice, discountLevel);
  }
  
  discountedPrice(basePrice, discountLevel) {
  	switch (discountLevel) {
  		case 1: return basePrice * 0.95;
  		case 2: return basePrice * 0.9;
  	}
  }
  
  //수정 후
  get finalPrice() {
  	const basePrice = this.quantity * this.itemPrice;
  	return this.discountedPrice(basePrice);
  }
  
  get discountLevel() {
   return (this.quantity > 100) ? 2 : 1;
  }
  
  discountedPrice(basePrice) {
  	switch (this.discountLevel) {
  		case 1: return basePrice * 0.95;
  		case 2: return basePrice * 0.9;
  	}
  }
  ```



### 11.6  질의 함수를 매개변수로 바꾸기

- 참조 투명하지 않은 원소에 접근하믄 모든 함수를 매개변수로 바꾸어서 참조 투명하게 만든다.

- 주의사항

  - 어떤 값을 제공할지를 호출자가 알아내야 하기 때문에 호출자가 복잡해지는 단점이 존재한다.
  - **호출자의 삶이 단순** 해지지 않지만, 정답이 있지 않고 균형만 존재한다.

- 예시는 다음과 같다.

  - `targetTemperature()` 메서드가 전역 객체인 `thermostat` 에 의존하는 것을 볼 수 있다.

  ```javascript
  //수정 전
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max ) return this._max;
    else if (thermostat.selectedTemperature < this._min) return this._min;
    else return thermostat.selectedTemperature;
  }
  
  if (thePlan.targetTemperature > thermostat.currentTemperature ) setToHeat();
  else if (thePlan.targetTemperature < thermostat.currentTemperature ) setToCool();
  else setOff();
  
  //수정 후
  get targetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max ) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }
  
  if (thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature ) setToHeat();
  else if (thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature ) setToCool();
  else setOff();
  ```