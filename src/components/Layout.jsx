import { Box } from "grommet";
import Header from "./Header";
import UserPanel from "./UserPanel";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ children, themeMode, toggleTheme }) => {
    const location = useLocation();

    // So Footer is not shown on HomePage before end of infinite scroll, as a way to fix problems with Footer showing before content is loaded
    const showFooter = location.pathname !== "/";

    return (
        <Box
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />
            <UserPanel themeMode={themeMode} toggleTheme={toggleTheme} />
            <Box as="main" flex="grow">
                {children}
            </Box>
            {showFooter && <Footer />}
        </Box>
    );
};


export default Layout;