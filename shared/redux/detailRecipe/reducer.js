const initState = {
  detailRecipe: {},
  status: false,
};
export default function detailRecipeReducer(state = initState, action) {
  switch (action.type) {
    case "FETCH_RECIPE":
      return {
        detailRecipe: action.detailRecipe,
        status: true,
      };
    case "CLOSE_RECIPE":
      return {
        detailRecipe: {},
        status: false,
      };
    default:
      return state;
  }
}
