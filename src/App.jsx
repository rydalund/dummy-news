import { useState, useEffect } from "react";
import { Grommet, Box, Button } from "grommet";
import { Sun, Moon } from "grommet-icons";
import { customLightTheme, customDarkTheme } from "./components/theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomePage from "./pages/HomePage";
import ArticleForm from "./components/ArticleForm";



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

        <Box pad="medium" align="center" background="background">
          <Button
            label={themeMode === "light" ? "Dark mode" : "Light mode"}
            icon={themeMode === "light" ? <Moon /> : <Sun />}
            onClick={toggleTheme}
            primary
          />
        </Box>

        <Box align="center" margin={{ bottom: "medium" }}>
          <Link to="/new">
            <Button label="Add New Article" />
          </Link>
        </Box>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<ArticleForm />} />
        </Routes>
      </Router>
    </Grommet>
  );
}

export default App;