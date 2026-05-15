import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { initTheme } from "./app/theme";


initTheme();
createRoot(document.getElementById("root")!).render(<App />);
