import React from "react";
import { useSelector } from "react-redux";
import Searchbar from "@iso/components/Topbar/SearchBox";
import TopbarSearchModal from "./TopbarSearchModal.styles";
import { TopbarSearchIcon } from "@iso/config/icon.config";

// import searchQueries from "./searchQueries";
import useFunction from "@iso/components/function/useFunction";

export default function TopbarSearch() {
  const [searchingForRecipe] = useFunction();
  // const dispatch = useDispatch();

  const [visible, setVisiblity] = React.useState(false);
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );

  const handleBlur = () => {
    setTimeout(() => {
      setVisiblity(false);
    }, 200);
  };

  // const searchingForRecipe = (value) => {
  //   const query = searchQueries.filter((query) => query === value.trim());
  //   if (query.length > 0) {
  //     fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
  //       .then((data) => data.json())
  //       .then((data) => {
  //         dispatch({
  //           type: "RECIPE_VALUE",
  //           recipeValues: data.recipes,
  //         });
  //         setVisiblity(false);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <div onClick={() => setVisiblity(true)}>
      <TopbarSearchIcon size={24} color={customizedTheme.textColor} />
      <TopbarSearchModal
        visible={visible}
        onOk={() => setVisiblity(false)}
        onCancel={() => setVisiblity(false)}
        wrapClassName="isoSearchModal"
        width="60%"
        footer={null}
      >
        <div className="isoSearchContainer">
          {visible ? (
            <Searchbar
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchingForRecipe(e.target.value);
                  setVisiblity(false);
                }
              }}
            />
          ) : (
            ""
          )}
        </div>
      </TopbarSearchModal>
    </div>
  );
}
