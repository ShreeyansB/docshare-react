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
import HomeForm from "./HomeForm";

const Home = () => {

  const [formType, setFormType] = useState(true);


  const switchFormHandler = () => {
    setFormType((prevState) => !prevState);
  };

  const formTitleStrings = {
    loginHeading: "Log into your account,",
    loginButton: "Create one now",
    signHeading: "Create a new account,",
    signButton: "Login",
  };

  // Drop Shadows for Image in dark and light mode

  const lightDropShadow = {
    filter: "drop-shadow(0px 36px 62px rgba(87, 41, 240,0.47))",
  };

  const darkDropShadow = {
    filter: "drop-shadow(0px 36px 75px rgba(0,0,0,0.99))",
  };

  return (
    <React.Fragment>
      <Flex
        direction={{ base: "column", lg: "row" }}
        pt={1}
        px="5.7vw"
        w="100%"
        align="center"
        justify="space-around"
      >

        {/* Home Art */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tilt scale={1.07} transitionSpeed={1000}>
            <Box p={2} mb={0} onDragStart={(e) => e.preventDefault()}>
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
                  width="490rem"
                  style={useColorModeValue(lightDropShadow, darkDropShadow)}
                />
              </picture>
            </Box>
          </Tilt>
          <Heading
            textAlign="center"
            px={2}
            maxW="36rem"
            fontSize={{ base: "1.2rem", lg: "1.5rem" }}
          >
            Stay connected,{" "}
            <Text
              display="inline"
              color={useColorModeValue("#319795", "#81E6D9")}
            >
              send{" "}
            </Text>
            and{" "}
            <Text
              display="inline"
              color={useColorModeValue("#805AD5", "#B794F4")}
            >
              share
            </Text>{" "}
            your documents with ease.
          </Heading>
        </motion.div>

        {/* Spacer */}
        <Box w="5vw" h="500px" display={{ base: "none", lg: "inherit" }} />

        {/* Login-SignUp Form */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box pe={{ base: 0, lg: "3.7vw" }} mt={{ base: "4rem", lg: 0 }}>
            <Heading
              fontSize={{ base: "2.5rem", lg: "3.1rem" }}
              mb={4}
              lineHeight="50px"
            >
              {formType
                ? formTitleStrings.loginHeading
                : formTitleStrings.signHeading}
            </Heading>
            <Text
              fontSize={{ base: "1.8rem", lg: "2.2rem" }}
              fontWeight="medium"
              display="inline"
              verticalAlign="-6px"
              me={5}
            >
              or
            </Text>
            <Button
              colorScheme="purple"
              variant="solid"
              borderRadius={14}
              p={{ base: 4, lg: 6 }}
              fontSize={{ base: "1.2rem", lg: "1.7rem" }}
              onClick={switchFormHandler}
            >
              {formType
                ? formTitleStrings.loginButton
                : formTitleStrings.signButton}
            </Button>

            <HomeForm isLogin={formType} />
          </Box>
        </motion.div>
      </Flex>

      {/* Bottom Spacing for smaller screens */}

      <Box display={{ base: "block", lg: "none" }}>
        <br />
        <br />
        <br />
        <br />
      </Box>
    </React.Fragment>
  );
};

export default Home;
