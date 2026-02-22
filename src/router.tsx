import { App } from "@/components";
import { NotFoundPage, PokemonDetailPage } from "@/pages";
import { createHashRouter } from "react-router-dom";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
