import React from "react";

import articleActions from "@iso/redux/articles/actions";
import investorActions from "@iso/redux/investors/actions";
import { useDispatch } from "react-redux";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
} from "../Article/Article.styles";

const Header = ({ type, handleModal }) => {
  const { resetFireStoreDocuments: resetArticles } = articleActions;
  const { resetFireStoreDocuments: resetInvestors } = investorActions;

  const resetRecords = (type) => {
    if (type === "article") dispatch(resetArticles());
    if (type === "investor") dispatch(resetInvestors());
  };

  const dispatch = useDispatch();

  return (
    <TitleWrapper>
      <ComponentTitle>Articles</ComponentTitle>

      <ButtonHolders>
        <ActionBtn type="danger" onClick={() => resetRecords(type)}>
          Reset record
        </ActionBtn>

        <ActionBtn type="primary" onClick={() => handleModal(null)}>
          Add new record
        </ActionBtn>
      </ButtonHolders>
    </TitleWrapper>
  );
};
export default Header;
