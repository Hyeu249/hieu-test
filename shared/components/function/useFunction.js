import searchQueries from "./searchQueries";
import { useDispatch } from "react-redux";

const useFunction = () => {
  const dispatch = useDispatch();

  const searchingForRecipe = (value) => {
    const query = searchQueries.filter((query) => query === value?.trim());
    if (query.length > 0) {
      fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
        .then((data) => data.json())
        .then((data) => {
          dispatch({
            type: "RECIPE_VALUE",
            recipeValues: data.recipes,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchRecipeHandle = (id = false) => {
    if (id) {
      fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
        .then((data) => data.json())
        .then((data) => {
          dispatch({
            type: "FETCH_RECIPE",
            detailRecipe: data.recipe,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return [searchingForRecipe, fetchRecipeHandle];
};

export default useFunction;
