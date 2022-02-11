import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Home = () => {
  const lightDropShadow = {
    filter: "drop-shadow(0px 36px 90px rgba(67,47,174,0.62))",
  };

  const darkDropShadow = {
    filter: "drop-shadow(0px 36px 90px rgba(0,0,0,0.9))",
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} pt={16} px="7vw">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Tilt glareEnable={true} scale={1.07} transitionSpeed={1000}>
          <Box p={4}>
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
      <Button colorScheme="red">Test But</Button>
    </Flex>
  );
};

export default Home;
