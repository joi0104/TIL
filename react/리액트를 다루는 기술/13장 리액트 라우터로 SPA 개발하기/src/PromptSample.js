import React, { useCallback, useState } from "react";
import { useHistory, Prompt } from "react-router-dom";

const PromptSample = () => {
  let history = useHistory();
  const [isBlock, setIsBlock] = useState(true);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleGoHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <div>
      <Prompt when={isBlock} message={"정말로 떠나실건가요?"} />
      <button onClick={handleGoBack}>뒤로</button>
      <button onClick={handleGoHome}>홈으로</button>
    </div>
  );
};

export default PromptSample;
