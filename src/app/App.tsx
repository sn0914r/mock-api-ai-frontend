import { Toaster } from "sonner";
import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { Providers } from "./Providers";
import { Navbar } from "../shared/components/Navbar";
import { initTheme } from "./theme";

const App = () => {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <Providers>
      <Toaster position="bottom-right" theme="system" />
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <AppRouter />
      </main>
    </Providers>
  );
};

export default App;
