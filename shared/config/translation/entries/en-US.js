import antdEn from "antd/lib/locale-provider/en_US";
import enMessages from "../locales/en_US.json";

import list from "@iso/cra/src/containers/Topbar/searchQueries";

enMessages["sidebar.list"] = "Từ khóa tìm kiếm";
enMessages["sidebar.publisher"] = "Nhà xuất bản";

list.forEach((query) => {
  enMessages[`sidebar.${query}`] = query;
});

const EnLang = (recipeValues) => {
  const uniqueRecipes = recipeValues
    ?.map((recipe) => recipe.publisher)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((_recipe) => {
      const recipe = _recipe.replaceAll(" ", "-").toLowerCase();
      return {
        key: _recipe,
        label: `sidebar.${recipe}`,
      };
    });

  if (recipeValues)
    uniqueRecipes.forEach((recipe) => {
      enMessages[recipe?.label] = recipe?.key;
    });

  const EnLang_data = {
    messages: {
      ...enMessages,
    },
    antd: antdEn,
    locale: "en-US",
  };

  return EnLang_data;
};

export default EnLang;
