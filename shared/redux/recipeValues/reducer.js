const initState = {
  recipeValues: [],
};
export default function recipeValuesReducer(state = initState, action) {
  switch (action.type) {
    case "RECIPE_VALUE":
      return {
        recipeValues: action.recipeValues,
      };
    default:
      return state;
  }
}
