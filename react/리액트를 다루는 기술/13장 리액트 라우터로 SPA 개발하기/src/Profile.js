import React from "react";
import { useParams } from "react-router-dom";

const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  glidong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = () => {
  let { username } = useParams();
  let profile = data[username];

  return !profile ? (
    <div>존재하지 않는 사용자 입니다.</div>
  ) : (
    <div>
      <h3>{profile.name}</h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
