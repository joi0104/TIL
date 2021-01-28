## 16장 Math

- 자바스크립트에서 숫자는 **IEEE 754 64비트 부동소숫점 숫자**이다.
- 복잡한 큰 숫자를 다룰 땐, `Math.js` 를 사용해야 한다.



### 숫자 형식

- 자바스크립트에서는 `2,8,16,10진수 형식` `고정 소수점 형식` `지수 형식` 을 지원한다.
- `2,8,16,10진수 형식`

```javascript
const x = 12;
x.toString(); //"12" (10진수)
x.toString(10); //"12" (10진수)
x.toString(16); //"c" (16진수)
x.toString(8); //"14" (8진수)
x.toString(2); //"1100" (2진수)
```

- `고정 소수점 형식`

```javascript
const x = 19.51;

//반올림을 한다.
z.toFixed(3); //"19.510"
z.toFixed(2); //"19.51" 
z.toFixed(1); //"19.5" 
z.toFixed(0); //"20"
```

- `지수 형식`

```javascript
const x = 3800.5;

//반올림을 한다.
x.toExponential(4); //"3.8005e+3"
x.toExponential(3); //"3.801e+3"
x.toExponential(2); //"3.80e+3"
x.toExponential(1); //"3.8e+3"
x.toExponential(0); //"4e+3"
```

- `고정 전체 자리수`

```javascript
let x = 1000;
x.toPrecision(5); //"1000.0"
x.toPrecision(4); //"1000"
x.toPrecision(3); //"1.00e+3"
x.toPrecision(2); //"1.0e+3"
x.toPrecision(1); //"1e+3"

x = 15.335;
//반올림을 한다.
x.toPrecision(5); //"15.335"
x.toPrecision(4); //"15.34"
x.toPrecision(3); //"15.3"
x.toPrecision(2); //"15"
x.toPrecision(1); //"2e+1"
```

- 이외의 고급 숫자 형식은 `Numeral.js` 를 이용하자.



### 상수

- `Math` 객체에는 몇가지의 중요한 상수가 내장되어 있다.

```javascript
Math.E //자연로그의 밑수 ~2.718
Math.PI //원주율 ~3.142

Math.LN2 //2의 자연로그 ~0.693
Math.LN10 //10의 자연로그 ~2.303
Math.LOG2E //Math.E의 밑수가 2인 로그 ~1.433
Math.LOG10E //Math.E의 상용 로그 ~0.434

Math.SQRT1_2 //1/2의 제곱근 ~0.707
Math.SQRT2 //2의 제곱근 ~1.414
```



### 대수함수

- 거듭제곱 함수

```javascript
Math.pow(x,y); //x의 y승
Math.sqrt(x); //x의 제곱근
Math.cbrt(x); //x의 세제곱근
Math.exp(x); //e의 x승
Math.expm1(x); //e의 x승-1
Math.hypot(x1,x2,..); //x1의 제곱, x2의 제곱들으 합의 제곱근
```

- 로그 함수

```javascript
Math.log(x); //x의 자연로그
Math.log10(x); //x의 상용로그
Math.log2(x); //x의 밑수가 2인 로그
Math.qog1p(x); //1+x의 자연로그
```

- 기타 함수

```javascript
Math.abs(x); //x의 절댓값
Math.sign(x); //x의 부호
Math.ceil(x); //x의 올림
Math.floor(x); //x의 내림
Math.trunc(x); //x의 버림
Math.round(x); //x의 반올림
Math.min(x1,x2,...); //매개변수 중 최솟값
Math.max(x1,x2,...); //매개변수 중 최댓값
```



### 의사난수

- 난수 : 예측 불가능하게 무작위한 수
- 의사난수 : 가짜난수. 특정한 공식을 통하여 연관성이 없는 듯한 숫자의 나열.
- 의사난수는 다음과 같이 `Math.random()` 함수를 통해서 만들 수 있다.

```javascript
Math.random(); //0이상 1미안의 의사난수
x + (y-x)*Math.random(); //x이상 y미안의 의사난수
m + Math.floor((n-m)*Math.random()); //m이상 n미만의 정수
m + Math.floor((n-m+1)*Math.random()); //m이상 n이하의 정수
```

- 시드 숫자를 사용해 의사난수를 생성해야 한다면 `seedrandom.js` 를 사용하면 된다.



### 삼각함수, 쌍곡선함수

- 삼각함수

```javascript
Math.sin(x); //x의 사인
Math.cos(x); //x의 코사인
Math.tan(x); //x의 탄젠트
Math.asin(x); //x의 아크사인
Math.acon(x); //x의 아크코사인
Math.atan(x); //x의 아크탄젠트
```

- 쌍곡선함수는 사용할 일이 별로 없을 것 같아 생략한다.