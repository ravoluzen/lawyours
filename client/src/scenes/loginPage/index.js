import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box 
        width="100%" 
        background={theme.palette.background.alt}
        pt={isNonMobileScreens ? "5rem": "3rem"}
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Lawyours
        </Typography>
        <Typography
          fontWeight="bold"
          fontSize={isNonMobileScreens ? "16px" : "12px"}
          color={theme.palette.neutral.medium}
        >
          Join as a client and seek help with your queries.
          <br />
          Or join as a lawyer and discover new clients.
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
        >
        Hey! Hop in!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage;