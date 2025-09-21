import { useState, useEffect } from "react";
import { Grommet } from "grommet";
import { customLightTheme, customDarkTheme } from "./configs/theme";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleFormPage from "./pages/ArticleFormPage";
import ArticleView from "./components/ArticleView";
import FavoritesPage from "./pages/FavoritesPage";
import Toast from "./components/Toast";
import Layout from "./components/Layout";


function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);


  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Grommet
      theme={themeMode === "light" ? customLightTheme : customDarkTheme}
      full
    >
      <Toast />
      <Router>
        <Toast />
        <Layout themeMode={themeMode} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<ArticleFormPage />} />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Layout>
      </Router>
    </Grommet>
  );
}

export default App;