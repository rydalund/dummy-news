import { useState, useEffect } from "react";
import { Grommet, Box, Button } from "grommet";
import { Sun, Moon } from "grommet-icons";
import { customLightTheme, customDarkTheme } from "./components/theme";
import WelcomeScreen from "./pages/WelcomeScreen";


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
   <Grommet theme={themeMode === "light" ? customLightTheme : customDarkTheme} full>
     <WelcomeScreen />
     <Box pad="medium" align="center" background="background">
        <Button
          label={themeMode === "light" ? "Dark mode" : "Light mode"}
          icon={themeMode === "light" ? <Moon /> : <Sun />}
          onClick={toggleTheme}
          primary
        />
      </Box>
    </Grommet>
  );
}

export default App;
