import { Routes } from "react-router-dom";
import { GenerateRoutes } from "../modules/Generate/Generate.router";
import { PlaygroundRoutes } from "../modules/Playground/Playground.router";

const AppRouter = () => {
  return (
    <Routes>
      {GenerateRoutes}
      {PlaygroundRoutes}
    </Routes>
  );
};

export default AppRouter;
