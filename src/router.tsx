import { App } from "@/components";
import { NotFoundPage, PokemonDetailPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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
