import React, { Component } from "react";
// import moment from "moment";
import { CloseOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "./Shuffle.styles";
import { Rate } from "antd";

import ReturnModal from "./ReturnModal/ReturnModal";

export default class extends Component {
  render() {
    const listClass = `isoSingleCard card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <SingleCardWrapper id={this.props.id} className={listClass}>
        <div className="isoCardImage" onClick={this.props.onClick}>
          <img alt="#" src={this.props.img} />
        </div>
        <div className="isoCardContent">
          <h3 className="isoCardTitle">{this.props.desc}</h3>
          <span className="isoCardDate">{this.props.publisher}</span>
          <a href={this.props.publisherWebsite} target="_blank">
            {this.props.socialRank}% Social Rank
          </a>
          <Rate value={this.props.rate} allowHalf disabled />
        </div>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <CloseOutlined />
        </button>
        <ReturnModal />
      </SingleCardWrapper>
    );
  }
}
