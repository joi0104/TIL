## SOP

- 동일 출처 정책. Same Origin Policy.
- 동일한 출처에게만 리소스를 공유할 수 있도록 하는 브라우저의 기본 보안 정책.
- 개인정보가 다른 사이트로 넘어가는 것을 방지하기 위해 대두되었다.
- 출처? `protocol` + `domain` + `port`

## CORS

- 교차 출처 정책. Cross Origin Resource Sharing.
- 다른 출처간에 리소스를 공유할 수 있도록 하는 브라우저의 보안 정책.
- 웹 생태계가 다양해지면서 여러 서비스간에 자유롭게 데이터가 주고 받아질 필요가 생기므로써 대두되었다.
- `CORS`를 허용해줌으로써 `SOP`를 위반하는 출처 또한 리소스를 받아올 수 있다.

### CORS 허용 방법

- 백엔드 쪽에서 허락할 출처들을 미리 명시. 어떠한 출처도 가능하다면 `*` 을 명시.
- 만약 사용자 식별 정보가 담긴 요청이라면 더욱 엄격하다.
  - 프론트 쪽에서는 옵션에 `withCredentials: true` 로 셋팅하여 요청을 보내고
  - 백엔드 쪽에서는 `Access-Control-Allow-Origin`를 `*`가 아닌 특정 출처로 명시해야 하며, `Access-Control-Allow-Credentials: true` 로 셋팅해야 한다.

### CORS 절차

- 프론트 쪽에서는 다른 출처로 요청을 보낼 때, 요청하는 쪽의 출처정보가 담긴 `origin`을 정보를 헤더에 담아 보낸다.
- 백엔드 쪽에서는 응답을 보낼 때, 허락할 출처들을 명시한 `Access-Control-Allow-Origin` 정보를 헤더에 담아 보낸다.
- 브랴우저는 `request header`의 `origin`값이 `response header`의 `Access-Control-Allow-Origin`에 똑같이 있는지 확인한다.
- 있으면 안전한 요청으로 간주하고 응답 리소스를 받아온다.
- 없으면 응답 리소스를 거부한 뒤, `CORS`를 허용해달라는 경고 메시지를 띄운다.

### 브라우저 측에서 응답을 거부한다면 서버에 요청이 가는건가? 위험하지 않나?

- `CORS`에서 http의 요청은 `simple request` 와 `preflight request` 로 나뉜다.
- `simple request`: 요청이 가긴 하지만 브라우저 측에서 응답을 거부하는 방식. `GET` `HEAD` `POST`메서드 중 일정 요건을 충족한 요청들이 존재한다.
- `preflight request`: 요청을 보내기전에 `preflight` 요청을 먼저 보내서 안전한지 확인하고 서버에서 허가가 떨어져야 본 요청을 보내는 방식.

### simple request를 통해서 서버에 변경이 가해질 수 있지 않나? 위험하지 않나?

- 따라서 `SOP`만 믿으면 안되고, 개발자들도 이러한 시나리오를 유의해가며 코딩해야 한다.
