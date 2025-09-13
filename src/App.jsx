import { useState, useEffect } from "react";
import { Grommet, Box, Button } from "grommet";
import { Sun, Moon } from "grommet-icons";
import { customLightTheme, customDarkTheme } from "./components/theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomePage from "./pages/HomePage";
import ArticleForm from "./components/ArticleForm";
import UserPanel from "./components/UserPanel";

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
      <Router>
        <WelcomeScreen />
        <UserPanel themeMode={themeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<ArticleForm />} />
        {/*<Route path="/article/:id" element={<ArticleView />} />*/}
        </Routes>
      </Router>
    </Grommet>
  );
}

export default App;
