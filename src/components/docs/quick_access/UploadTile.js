import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaUpload } from "react-icons/fa";

const UploadTile = () => {
  return (
    <Box
      w="100%"
      h={{ base: "130px", sm: "160px", md: "200px" }}
      borderRadius="1.4rem"
      cursor="pointer"
      py={{ base: 3, md: 6 }}
      border="2px solid"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
    >
      <Tooltip label="Upload">
        <Flex w="100%" h="100%" align="center" justify="center">
          <Icon
            as={FaUpload}
            h="3rem"
            w="3rem"
            color={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
          />
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default UploadTile;
