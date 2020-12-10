import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  //유용한 커스텀 훅! useQuery()
  return new URLSearchParams(useLocation().search);
};

const About = () => {
  let query = useQuery();
  let detail = query.get("detail");

  return (
    <div>
      <h1>About</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 페이지 입니다</p>
      {
        detail === "true" && <p>detail 값을 true로 설정하셨군요!</p> //쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열
      }
    </div>
  );
};

export default About;
