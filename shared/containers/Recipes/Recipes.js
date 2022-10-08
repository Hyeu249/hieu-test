import React, { useState } from "react";
import FlipMove from "react-flip-move";
import throttle from "lodash/throttle";
import Toggle from "./Toggle";
import ListItem from "./ShuffleList";
import IntlMessages from "@iso/components/utility/intlMessages";
import { SortableCardWrapper } from "./Shuffle.styles";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Pagination } from "antd";
import useFunction from "@iso/components/function/useFunction";

export default function () {
  const [_, fetchRecipeHandle] = useFunction();
  const { recipeValues } = useSelector((state) => state.recipeValues);
  const { url } = useRouteMatch();

  const myUrl = url.split("/")[2];
  const myPublisher = recipeValues?.filter((recipe) => {
    return recipe.publisher?.replaceAll(" ", "-").toLowerCase() === myUrl;
  });

  const articles = myPublisher.map((recipe) => {
    const randomNum = Math.floor(Math.random() * 1000) / 100 + 90;

    let ratePoint;
    if (randomNum > 90) ratePoint = 4;
    if (randomNum > 94) ratePoint = 4.5;
    if (randomNum > 97) ratePoint = 5;

    return {
      id: recipe.recipe_id,
      publisher: recipe.publisher,
      desc: recipe.title,
      img: recipe.image_url,
      publisherWebsite: recipe.source_url,
      socialRank: randomNum,
      rate: ratePoint,
    };
  });

  const [page, setPage] = useState(0);

  const four_articles_one_index = (value) => {
    const shalowValue = value.slice();
    const array = [];
    const length_of_Pagination = Math.ceil(shalowValue?.length / 4);

    for (let i = 0; i < length_of_Pagination; i++) {
      array[i] = [];
      for (let j = 0; j < 4; j++) {
        if (!shalowValue.length) break;
        array[i].push(shalowValue.shift());
      }
    }

    return array;
  };

  const concat_array_of_array = (array_of_array) => {
    return array_of_array.flat();
  };

  const [state, setState] = React.useState({
    removedArticles: [],
    view: "grid",
    order: "asc",
    sortingMethod: "chronological",
    enterLeaveAnimation: "accordionVertical",
    articles: four_articles_one_index(articles),
  });

  function toggleList() {
    setState({
      ...state,
      view: "list",
      enterLeaveAnimation: "accordionVertical",
    });
  }

  function toggleGrid() {
    setState({
      ...state,
      view: "grid",
      enterLeaveAnimation: "accordionHorizontal",
    });
  }
  function moveArticle(source, dest, id) {
    const sourceArticles = state[source].slice();
    let destArticles = state[dest].slice();
    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id
      ? sourceArticles[page].findIndex((article) => article.id === id)
      : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles[page].splice(i, 1), destArticles);

    setState({
      ...state,
      [source]: four_articles_one_index(concat_array_of_array(sourceArticles)),
      [dest]: destArticles,
    });
  }

  function renderArticles() {
    return state.articles[page]?.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={state.view}
          index={i}
          clickHandler={throttle(
            () => moveArticle("articles", "removedArticles", article.id),
            800
          )}
          {...article}
          onClick={fetchRecipeHandle.bind(null, article.id)}
        />
      );
    });
  }
  return (
    <SortableCardWrapper
      id="shuffle"
      className={`isomorphicSortableCardsHolder ${state.view}`}
    >
      <header className="isoControlBar">
        <div className="isoViewBtnGroup">
          <Toggle
            style={{ backgroundColor: "red" }}
            clickHandler={toggleList}
            text={<IntlMessages id="toggle.list" />}
            icon={<BarsOutlined />}
            active={state.view === "list"}
          />
          <Toggle
            style={{ backgroundColor: "blue" }}
            clickHandler={toggleGrid}
            text={<IntlMessages id="toggle.grid" />}
            icon={<AppstoreOutlined />}
            active={state.view === "grid"}
          />
        </div>
      </header>
      <div style={{ paddingBottom: "30px" }}>
        <Pagination
          total={concat_array_of_array(state.articles).length}
          pageSize={4}
          onChange={(e) => setPage(e - 1)}
        />
      </div>

      <div className="isoSortableCardsContainer">
        <FlipMove
          staggerDurationBy="30"
          duration={500}
          enterAnimation={state.enterLeaveAnimation}
          leaveAnimation={state.enterLeaveAnimation}
          typeName="ul"
        >
          {renderArticles()}
        </FlipMove>
      </div>
    </SortableCardWrapper>
  );
}
