import list from "./List.js";
import newItem from "./New.js";
import notFound from "./404.js";

export const routes = {
  "/": list,
  "/new": newItem,
  "/404": notFound
};
