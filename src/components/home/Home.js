import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [formType, setFormType] = useState(false);

  const switchFormHandler = () => {
    setFormType((prevState) => !prevState);
  };

  const formTitleStrings = {
    loginHeading: "Log into your account,",
    loginButton: "Create one now",
    signHeading: "Create a new account,",
    signButton: "Login",
  }

  const lightDropShadow = {
    filter: "drop-shadow(0px 36px 90px rgba(67,47,174,0.62))",
  };

  const darkDropShadow = {
    filter: "drop-shadow(0px 36px 90px rgba(0,0,0,0.9))",
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      pt={16}
      px="7vw"
      align="center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Home Art */}

        <Tilt scale={1.07} transitionSpeed={1000}>
          <Box p={4} mb={10}>
            <picture>
              <source
                srcSet={process.env.PUBLIC_URL + "/assets/homeart.webp"}
                type="image/webp"
              />
              <source
                srcSet={process.env.PUBLIC_URL + "/assets/homeart.png"}
                type="image/png"
              />
              <img
                src={process.env.PUBLIC_URL + "/assets/homeart.png"}
                alt="Home Art"
                width="600rem"
                style={useColorModeValue(lightDropShadow, darkDropShadow)}
              />
            </picture>
          </Box>
        </Tilt>
      </motion.div>

      {/* Login Form */}

      <Box>
        <Heading fontSize="3.4rem" mb={4}>
          {formType ? formTitleStrings.loginHeading : formTitleStrings.signHeading}
        </Heading>
        <Text
          fontSize="2.2rem"
          fontWeight="medium"
          display="inline"
          verticalAlign="-6px"
        >
          or
        </Text>
        <Button
          ms={5}
          colorScheme="teal"
          borderRadius={14}
          p={6}
          fontSize="1.9rem"
          onClick={switchFormHandler}
        >
          {formType ? formTitleStrings.loginButton : formTitleStrings.loginHeading}
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;
