import { Switch, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profiles from "./Profiles";
import PromptSample from "./PromptSample";
import NotFound from "./NotFound";

function App() {
  const activeStyle = {
    color: "red",
  };
  return (
    <div className="App">
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/about?detail=true" activeStyle={activeStyle}>
            소개
          </NavLink>
        </li>
        <li>
          <NavLink to="/profiles" activeStyle={activeStyle}>
            프로필
          </NavLink>
        </li>
        <li>
          <NavLink to="/prompt" activeStyle={activeStyle}>
            프롬프트 예제
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={["/about", "/info"]}>
          <About />
        </Route>
        <Route path="/profiles">
          <Profiles />
        </Route>
        <Route path="/prompt">
          <PromptSample />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
