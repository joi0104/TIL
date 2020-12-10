import React from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <Link to={`${url}/velopert`}>velopert</Link>
        </li>
        <li>
          <Link to={`${url}/glidong`}>glidong</Link>
        </li>
      </ul>
      <Route exact path={`${path}/:username`} component={Profile} />
    </div>
  );
};

export default Profiles;
