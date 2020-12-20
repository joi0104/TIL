import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useActions from "../lib/useActions";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";

const SampleContainer = () => {
  const { post, users } = useSelector(({ sample }) => ({
    post: sample.post,
    users: sample.users,
  }));

  const { loadingPost, loadingUsers } = useSelector(({ loading }) => ({
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_POST"],
  }));

  const [getPostAction, getUsersAction] = useActions([getPost, getUsers], []);

  useEffect(() => {
    (async () => {
      try {
        await getPostAction(1);
        await getUsersAction();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default SampleContainer;
