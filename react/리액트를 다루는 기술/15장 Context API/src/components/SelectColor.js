import React, { useContext } from "react";
import ColorContext from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const SelectColor = () => {
  const { actions } = useContext(ColorContext);
  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <div style={{ display: "flex" }}>
        {colors.map((c) => (
          <div
            key={c}
            style={{
              background: c,
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={() => {
              actions.setColor(c);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              actions.setSubColor(c);
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default SelectColor;
