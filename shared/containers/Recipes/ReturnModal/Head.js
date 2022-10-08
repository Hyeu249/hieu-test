import React from "react";
import { IoIosTimer, IoMdPersonAdd } from "react-icons/io";
// import { IoPersonAddOutline } from "react-icons/io5";

const Head = ({ title, color }) => {
  const styleIcon = { fontSize: "20px", color: color };
  const alignCenter = {
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
  };

  return (
    <>
      <h1 className="recipe__title">
        <span style={{ color: color }}>{title.slice(0, 19)}</span>
      </h1>
      <div style={{ display: "flex", marginLeft: "20px", paddingTop: "80px" }}>
        <div style={alignCenter}>
          <IoIosTimer style={styleIcon} /> &nbsp; 75 MINUTE
        </div>
        <div style={alignCenter}>
          <IoMdPersonAdd style={styleIcon} /> &nbsp; 4 SERVINGS
        </div>
      </div>
    </>
  );
};

export default Head;
