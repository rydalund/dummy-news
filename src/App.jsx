import { useState, useEffect } from "react";
import { Grommet, Box, Button } from "grommet";
import { customLightTheme, customDarkTheme } from "./config/theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomePage from "./pages/HomePage";
import ArticleForm from "./components/ArticleForm";
import UserPanel from "./components/UserPanel";
import ArticleView from "./components/ArticleView";
import FavoritesPage from "./pages/FavoritesPage";
import Toast from "./components/Toast";


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
        <WelcomeScreen />
        <UserPanel themeMode={themeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<ArticleForm />} />
          <Route path="/article/:id" element={<ArticleView />} />
           <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </Grommet>
  );
}

export default App;