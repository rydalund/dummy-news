import { Box, Text } from "grommet";

const Footer = () => (
  <Box
    tag="footer"
    background="brand"
    pad="medium"
    align="center"
    justify="center"
  >
    <Text size="medium" color="white">
      © {new Date().getFullYear()} Dummy News – All rights reserved
    </Text>
  </Box>
);

export default Footer;