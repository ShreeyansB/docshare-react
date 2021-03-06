import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Error = () => {
  const lightDropShadow = {
    filter: "drop-shadow(0px 36px 82px rgba(101,89,245,0.65))",
  };

  const darkDropShadow = {
    filter: "drop-shadow(0px 36px 75px rgba(0,0,0,0.8))",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        pt={{ base: "2.5rem", md: "6rem" }}
        px="5.7vw"
        w="100%"
        justify='center'
      >
        {/* Error Image */}

        <Tilt scale={1.07} transitionSpeed={1000}>
          <Box p={4} mb={0} onDragStart={(e) => e.preventDefault()}>
            <picture>
              <source
                srcSet={process.env.PUBLIC_URL + "/assets/404.webp"}
                type="image/webp"
              />
              <source
                srcSet={process.env.PUBLIC_URL + "/assets/404.png"}
                type="image/png"
              />
              <img
                src={process.env.PUBLIC_URL + "/assets/404.png"}
                alt="Home Art"
                width="400rem"
                style={useColorModeValue(lightDropShadow, darkDropShadow)}
              />
            </picture>
          </Box>
        </Tilt>

        {/* Error Text */}

        <VStack
          align={{ base: "center", md: "start" }}
          ms={{ base: "0rem", md: "7rem" }}
          mt={{ base: "3rem", md: "0rem" }}
          spacing={0}
        >
          <Text fontSize={{ base: "1rem", md: "1.3rem" }} fontWeight="light" >
            PAGE NOT FOUND
          </Text>
          <Text
            fontSize="1.4rem"
            transform="translate(0px, -14px)"
            fontWeight="semibold"
            color="teal.400"
          >
            _____
          </Text>
          <Heading
            fontSize={{ base: "2.3rem", md: "3rem" }}
            textAlign={{ base: "center", md: "start" }}
            lineHeight="3.5rem"
            opacity={0.23}
          >
            ooops, something
            <br /> went wrong.
          </Heading>
        </VStack>
      </Flex>
      <Box display={{ base: "block", md: "none" }}>
        <br />
        <br />
        <br />
        <br />
      </Box>
    </motion.div>
  );
};

export default Error;
