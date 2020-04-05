## 뷰 라우터



### 라우팅이란?

라우팅이란 웹 페이지 간의 이동방법을 말한다. 라우팅은 현대 웹 앱 형태 중 하나인 싱글 페이지 애플리케이션(SPA)에서 주로 이용하고 있다.

> 싱글페이지 어플리케이션(SPA)? 미리 해당 페이지들을 받아 놓고 페이지 이동 시에 클라이언트의 라우팅을 이용하여 화면을 갱신하는 패턴을 적용한 어플리케이션



### 뷰 라우터

- <router-link to="URL값"\> : 페이지 이동 태그. 클릭하면 지정한 URL로 이동한다.
- <router-view\> : 페이지 표시 태그. 변경되는 URL에 따라 해당 컴포넌트를 뿌려주는 영역이다.

```
<p>
	<router-link to="/main">Main 컴포넌트로 이동</router-link>
	<router-link to="/login">Login 컴포넌트로 이동</router-link>
</p>
<router-view></router-view>
...
<script>
	var Main = {teplate:'<div>main</div>}
	var Login = {teplate:'<div>login</login>}
	
	var routes = [
        {path:'/main', component: Main},
        {path:'/login', component: Login}
	];
	
	var router = new VueRouter({
        routes
	});
	
	var app = new Vue({
        router
	}).$mount('#app');
</script>

```

> $mount? 

### 네스티드 라우터

라우터로 페이지를 이동할 때 최소 2개 이상의 컴포넌트를 화면에 나타낼 수 있다. 상위 컴포넌트 1개에 하위 컴포넌트 1개를 포함하는 구조로 구성되어 있다.

```
<div id="app>
	<router-view></router-view>
</div>
...
<script>
	var User = {
        template:
        	<div>
        		User component
        		<router-view></router-view>
        	</div>
	};
	var UserProfile = {template:}
```

