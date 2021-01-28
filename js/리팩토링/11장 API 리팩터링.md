11장 API 리팩터링



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



### 11.7 세터 제거하기

- 세터가 없다는 것은 해당 필드는 오직 생성자에 의해 설정되며 수정하지 않고 변경 가능성을 봉쇄한다는 의미이다.
- 세터를 제거하는 상황은 두가지이다.
  - 사람들이 무조건 접근자 메서드를 통해서만 필드를 다루려 할 때
  - `생성 스크립트`를 사용해 객체를 생성할 때
  - 여기서 `생성 스크립트`란 생성자를 호출한 후 일련의 세터를 호출하여 객체를 완성하는 형태의 코드를 말한다.

- 예시는 다음과 같다.

```javascript
//수정 전
class Person {
  get name() { return this._name; }
  set name(arg) { return this._name = arg; }
  get id() { return this._id; }
  set id(arg) { return this._id = arg; }
}

const martion = new Person();
martin.name = "마틴";
martin.id = "1234";
```

```javascript
//수정 후
class Person {
  constructor(id) {
    this._id = id;
  }
  get name() { return this._name; }
  set name(arg) { return this._name = arg; }
  get id() { return this._id; }
  //set id()를 없애고 생성자에 인라인 시켰다.
}

const martion = new Person();
martin.name = "마틴";
```



### 11.8 생성자를 팩터리 함수로 바꾸기

- 생성자란 객체를 초기화하는 특별한 용도의 함수이다. 하지만 생성자는 이상한 제약이 붙기도 한다.
  - 생성자를 정의한 클래스의 인스턴스를 반환해야 한다. (서브 클래스의 인스턴스나 프락시 X)
  - 생성자의 이름은 고정되어 있다.
  - 특별한 연산자를 사용하기 때문에 일반 함수 자리에 사용이 어렵다.
- 위의 단점들을 `팩터리 함수`로 바꿔서 극복할 수 있다. `팩터리 함수` 를 만드는 가장 단순한 방법은 **생성자를 호출하는 방식** 이다.
- 예시는 다음과 같다.

```javascript
//수정 전
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  
  get name() { return this._name; }
  get type() { return Employee.legalTypeCodes[this._typeCode]; }
  
  static get legalTypeCodes(){
    return {"E": "Engineer", "M": "manager", "S": "Saleperson"};
  }
}

const candidate = new Employee(document.name, document,empType);
const leadEngineer = new Employee(document.leadEngineer, 'E');
```

```javascript
//수정 후
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  
  get name() { return this._name; }
  get type() { return Employee.legalTypeCodes[this._typeCode]; }
  
  static get legalTypeCodes후){
    return {"E": "Engineer", "M": "manager", "S": "Saleperson"};
  }
}


function createEmployee(name,typeCode) {
  return new Employee(name,typeCode);
}

function createEngineer(name) {
  return new Employee(name, 'E');
}

const candidate = createEmployee(document.name, document,empType);
const leadEngineer = createEngineer(document.leadEngineer);
```



### 11. 9 함수를 명령으로 바꾸기

- 요청 자체를 캡슐화 하여 사용자를 매개변수로 바꾸고 대기, 로깅, 되돌리기 등을 수행할 수 있도록 하는 객체를 `명령 객체` 혹은 `명령` 이라고 부른다. (참고로 여기서의 `명령` 은 `명령-질의 분리원칙` 과 다르다.)
- 즉, `명령 객체` 는 메서드의 호출를 객체화 했다는 것이다.
- `명령` 의 장점은 다음과 같다.
  - 되돌리기 같은 보조연산을 제공하며 수명주기를 제어하는 데 필요한 매개변수를 만들어주는 메서드도 제공한다.
  - 상속과 훅을 이용할 수 있다.
  - 명령을 이용해 일급 함수 기능의 대부분을 흉내낼 수 있다.
  - 중첩함수를 지원하지 않는 언어에서도 복잡한 함수를 쪼갤 수 있고 테스트와 디버깅에 직접 이용할 수 있다.
- 예시는 다음과 같다.

```javascript
//수정 전
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;
  
  if(medicalExam.isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlah = true;
  }
  let certificationGrade = 'regular';
  if (scoreingGuide.startWithLowCertification(cadidate.originState)) {
    certificationGrade = 'low';
    result -= 5;
  }
  ...
  result -= Math.max(healthLevel - 5, 0);
  return result;
}
```

```javascript
//수정 후
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  
  execute() {
  	let result = 0;
  	let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if(medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlah = true;
    }
    let certificationGrade = 'regular';
    if (scoreingGuide.startWithLowCertification(cadidate.originState)) {
      certificationGrade = 'low';
      result -= 5;
    }
    ...
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
```

```javascript
//되돌리기
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  
  execute() {
  	this._result = 0;
  	this._healthLevel = 0;
    this._highMedicalRiskFlag = false;

    this.scoreSmoking();
    this._certificationGrade = 'regular';
    if (this._scoreingGuide.startWithLowCertification(this._cadidate.originState)) {
      this._certificationGrade = 'low';
      this._result -= 5;
    }
    ...
    this._result -= Math.max(healthLevel - 5, 0);
    return this._result;
  }
  
  scoreSmoking() {
    if(this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlah = true;
    }
  }
}

```



### 11.10 명령을 함수로 바꾸기

- `명령 객체` 는 비용이 많이 들기 때문에, 크게 복잡하지 않다면 그저 함수를 하나 호출하는 것이 좋다.
- 예시는 다음과 같다.

```javascript
//수정 전
function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge * provider.connectionCharge;
}
const monthCharge = charge(customer, usage, provider);
```



### 11.11 수정된 값 반환하기

- 데이터가 수정됨을 알기 위한 방법으로는 변수를 갱신하는 함수에 수정된 값을 반환하여 호출자가 그 값을 변수에 담아두도록 하는 방법이 있다.
- 이 방식은 호출자 코드를 읽을 때 **변수가 갱신도리 것임** 을 분명히 인지하게 된다.
- 값 하나를 계산한다는 분명한 목적이 있는 함수들에게 가장 효과적이다.
- 예시는 다음과 같다.

```javascript
//수정 전
let totalAscent = 0;
let totalTime = 0;
let totalDistance = 0;
calculateAscent();
calculateTime();
calculateDistance();
const pace = totalTime/60/totalDistance;

function calculateAscent() {
  for(let i=1; i < point.length; i++) {
    const varticalChange = points[i].elevation - points[i-1].elevation;
    totalAscent += (verticalChange > 0)? verticalChange : 0;  //totalAscent가 갱신된다는 사실이 드러나지 않는다.
  }
}
```

```javascript
//수정 후
let totalAscent = calculateAscent();
let totalTime = calculateTime();
let totalDistance = calculateDistance();
const pace = totalTime/60/totalDistance;

function calculateAscent() {
  let result = 0'
  for(let i=1; i < point.length; i++) {
    const varticalChange = points[i].elevation - points[i-1].elevation;
    result += (verticalChange > 0)? verticalChange : 0;  //totalAscent가 갱신된다는 사실이 드러나지 않는다.
  }
  return result;
}
```



### 11.12 오류 코드를 예외로 바꾸기

- `오류 코드` : 오류의 상태를 숫자로 정의한 코드를 반환해서 오류를 처리하는 방법. 누군가 처리하기를 바라며 콜스택 위로 던져야 했다.
- `예외` : 독립적인 오류 처리 매커니즘. 오류가 발견하면 예외를 던진다. 
  - 오류 코드를 일일이 검사하거나 콜스택 위로 던지는 일을 신경쓰지 않아도 된다.
  - 또한, 독자적인 흐름이 있어서 프로그램의 나머지는 오류 발생에 따른 복잡한 상황에 대해 대처하지 않아도 된다.
  - 예외의 경우, **정상 동작 범주에 들지 않는 오류를 나타낼 때** 만 쓰여야 한다. 예외대신 프로그램 종료코드를 사용해도 여전히 동작해야 한다.
- 예시는 다음과 같다.

```javascript
//수정 전
function localShippingRules(country) {
  const data = countryData.shippingRules(country);
  if (data) return new ShippingRules(data);
  else return -23;
}

function calculateShippingCosts(anOrder) {
  ...
  const shippingRules = localShippingRules(anOrder.country);
  if (shippingRules < 0) return shippingRules;
  ...
}

const status = calculateShippingCosts(orderData);
if (status < 0) return shippingRules;
```

```javascript
//수정 후
function localShippingRules(country) {
  const data = countryData.shippingRules(country);
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23); //에외를 던지면 콜스텍 위로 전달하는 일은 예외 매커니즘이 대신 처리해준다.
}

function calculateShippingCosts(anOrder) {
  ...
  const shippingRules = localShippingRules(anOrder.country);
  ...
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super();
    this._errorCode = errorCode;
  }
  get name() { return "OrderProcessingError"; }
}


try {
  calculateShippingCosts(orderData);
} catch (e) {
  if (e instanceof OrderProcessingError) errorList.push({order: orderData, errorCode: e.code})
  else throw e;
}
```



### 11.13 예외를 사전확인으로 바꾸기

- 정상 동작 범주에 드는 오류일 경우 예외 처리로 대응하기 보다는 조건을 검사하는 `사전 확인`을 사용한다.
- 예시는 다음과 같다.

```java
//수정 전
public Resource get() {
  Resource result;
  try {
    result = available.pop();
    allocated.add(result);
  } catch (NoSuchElementException e) {
    result = Resource.create();
    allocated.add(result);
  }
  return result;
}
```

```java
//수정 후
public Resource get() {
  Resource result;
  if (available.isEmpty()) {
    result = Resource.create();
    allocated.add(result);
  } else {
    result = available.pop();
    allocated.add(result);
  }
  return result;
}
```

```java
//더 가다듬기
public Resource get() {
  Resource result = available.isEmpty()? Resource.create() : available.pop();
  allocated.add(result);
  return result;
}
```

