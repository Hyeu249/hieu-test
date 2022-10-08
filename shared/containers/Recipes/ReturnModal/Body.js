import React from "react";
import { IoIosCheckmark } from "react-icons/io";

const Body = ({ ingredients, color }) => {
  return (
    <>
      <h2 style={{ color: color }} className="heading--2">
        Recipe ingredients
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          padding: "0px 15px",
          // backgroundColor: "red",
        }}
      >
        {ingredients.map((ingre, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                paddingBottom: "15px",
              }}
            >
              <IoIosCheckmark style={{ fontSize: "30px", color: "#f38e82" }} />
              <div> {ingre}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Body;
