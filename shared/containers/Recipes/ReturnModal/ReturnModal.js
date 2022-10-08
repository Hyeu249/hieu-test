import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import Head from "./Head";
import Body from "./Body";
import "./ReturnModal.css";

const ReturnModal = () => {
  const randomnum = Math.floor(Math.random() * 5);
  const color = ["#f38e82", "#829ff3", "#e782f3", "#23c506", "#ed82f3"];

  const dispatch = useDispatch();
  const { detailRecipe, status } = useSelector((state) => state.detailRecipe);

  const { title = "", ingredients = {}, publisher, source_url } = detailRecipe;
  const {} = ingredients;
  // console.log("ingredients: ", ingredients);

  const cancelHandle = () => {
    dispatch({ type: "CLOSE_RECIPE" });
  };

  return (
    <Modal
      wrapClassName=""
      // visible={true}
      visible={status}
      onCancel={cancelHandle}
      footer={null}
    >
      {/* <div>{detailRecipe?.publisher}</div> */}
      <div style={{ height: "650px", backgroundColor: "#ff00001f" }}>
        <Head title={title} color={color[randomnum]} />
        <Body ingredients={ingredients} color={color[randomnum]} />
        <h2
          style={{ paddingTop: "10px", color: color[randomnum] }}
          className="heading--2"
        >
          How to cook it
        </h2>
        <p style={{ padding: "0px 15px" }}>
          This recipe was carefully designed and tested by{" "}
          <a href={source_url} target="_blank">
            {publisher}
          </a>{" "}
          . Please check out directions at their website.
        </p>
      </div>
    </Modal>
  );
};

export default ReturnModal;
