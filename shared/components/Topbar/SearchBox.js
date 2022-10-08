import React from "react";
import { InputSearch } from "../uielements/input";
// import { TopbarSearchIcon } from "@iso/config/icon.config";
export default function (props) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        document.getElementById("InputTopbarSearch").focus();
      } catch (e) {}
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <InputSearch
      id="InputTopbarSearch"
      size="large"
      placeholder="Nhập món ăn của bạn(vd: beetroot, green pepper, onion,...)"
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      // prefix={<TopbarSearchIcon size={24} />}
      prefix={
        <div
          style={{
            position: "relative",
            left: "975px",
            width: "45px",
            height: "45px",
            zIndex: "100",
            cursor: "pointer",
          }}
          onClick={props.onButton}
        ></div>
      }
    />
  );
}
