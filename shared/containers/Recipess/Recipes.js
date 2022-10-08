import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const Recipes = () => {
  const { recipeValues } = useSelector((state) => state.recipeValues);
  const { url } = useRouteMatch();

  const myUrl = url.split("/")[2];
  const myPublisher = recipeValues?.filter((recipe) => {
    return recipe.publisher?.replaceAll(" ", "-").toLowerCase() === myUrl;
  });

  return <div>{myUrl}</div>;
};

export default Recipes;
