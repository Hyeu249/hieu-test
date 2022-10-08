import zhMessages from "../locales/zh-Hans.json";

const zh_text =
  "输 新 密 码 并 进 行 确 认 用 户 名 密 码 或 者 点 击 任 意 按 钮 未 读 电 子 邮 件 电 子 邮 件 地 址 查 看 购 物 车 查 看 全 部 我 的 简 历";

zhMessages["sidebar.publisher"] = "输 入 新";

const Zhlang = (recipeValues) => {
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

  if (recipeValues) {
    uniqueRecipes.forEach((recipe) => {
      const wordLength = recipe.key.split(" ").length;
      const zh_text_array = zh_text.split(" ");
      const randomNumber = Math.floor(
        Math.random() * (zh_text_array.length - wordLength - 1)
      );

      const text = zh_text_array
        .slice(randomNumber, randomNumber + wordLength)
        .join(" ");

      zhMessages[recipe?.label] = text;
    });
  }

  const ZhLan_data = {
    messages: {
      ...zhMessages,
    },
    antd: null,
    locale: "zh-Hans-CN",
  };

  return ZhLan_data;
};

export default Zhlang;
