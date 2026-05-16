import { Routes, Route, Navigate } from "react-router-dom";
import { GenerateRoutes } from "../modules/Generate/Generate.router";
import { PlaygroundRoutes } from "../modules/Playground/Playground.router";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/generate" replace />} /> */}
      {GenerateRoutes}
      {PlaygroundRoutes}
    </Routes>
  );
};

export default AppRouter;
