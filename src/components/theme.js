import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";

const baseTheme = {
  global: {
    font: {
      family: "Arial, sans-serif",
      size: "18px",
      height: "20px",
    },
    control: {
      font: {
        size: "18px",
        weight: 600,
      },
      padding: {
        vertical: "6px",
        horizontal: "20px",
      },
    },
    articleImage: {
      container: {
        height: "100%", // reserverad yta för bilden
        position: "relative",
      },
      loadingText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#666",
        fontSize: "14px",
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
      },
    },
  },
};

const lightColors = {
  global: {
    colors: {
      background: "#FFFFFF",
      brand: "#228BE6",
      text: "#333333",
      userPanelBackgroundLight: "#f0f0f0",
      cardBackground: "#dfdfdfcd",
    },
  },
};

const darkColors = {
  global: {
    colors: {
      background: "#1A1A1A",
      brand: "#228BE6",
      text: "#CCCCCC",
      userPanelBackgroundDark: "#3D3D3D",
      cardBackground: "#2A2A2A",
    },
    elevation: {
      dark: {
        small: "0px 1px 4px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  button: { //Styling for overriding Grommet button
    primary: {
      background: {
        color: "rgb(111, 255, 176)",
      },
      extend: {
        color: "black",
      },
    },
  },
};

export const customLightTheme = deepMerge(
  grommet,
  deepMerge(baseTheme, lightColors)
);
export const customDarkTheme = deepMerge(
  grommet,
  deepMerge(baseTheme, darkColors)
);
