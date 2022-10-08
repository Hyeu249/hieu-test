import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "@iso/components/utility/loader";

const routes = [
  {
    path: "",
    component: lazy(() => import("@iso/containers/Recipes/Recipes")),
    exact: true,
  },
  {
    path: "recipes",
    component: lazy(() => import("@iso/containers/Recipes/Recipes")),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();

  const { recipeValues } = useSelector((state) => state.recipeValues);

  const newRoutes = recipeValues
    .map((recipe) => recipe.publisher)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((_recipe) => {
      const recipe = _recipe.replaceAll(" ", "-").toLowerCase();
      return {
        path: recipe,
        component: lazy(() => import("@iso/containers/Recipes/Recipes")),
      };
    });

  const combineRoutes = [...routes, ...newRoutes];

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {combineRoutes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
