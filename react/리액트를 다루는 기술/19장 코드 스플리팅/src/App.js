import React, { useState, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadable from "@loadable/component";
const SplitMe = React.lazy(() => import("./SplitMe"));
const SplitMe2 = loadable(() => import("./SplitMe2"), {
  fallback: <div>loading..</div>,
});

function App() {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe2.preload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          hello React!
        </p>
        <Suspense fallback={<div>loading..</div>}>
          {visible && <SplitMe />}
        </Suspense>
        {visible && <SplitMe2 />}
      </header>
    </div>
  );
}

export default App;
