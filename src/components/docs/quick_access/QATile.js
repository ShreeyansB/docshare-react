import {
  Box,
  HStack,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import FileIcon from "./FileIcon";
import fileTypes from "./../../../helpers/filetypes";

const QATile = ({ type, title, time }) => {
  return (
    <Box
      w="100%"
      h={{ base: "130px", sm: "160px", md: "200px" }}
      borderRadius="1.4rem"
      bgGradient={useColorModeValue(
        fileTypes[type].gradLight,
        fileTypes[type].gradDark
      )}
      cursor="pointer"
      py={{ base: 3, md: 6 }}
    >
      <Tooltip label={title}>
        <VStack align="start" justifyContent="space-between" h="100%">
          <HStack
            justify="space-between"
            w="100%"
            ps={{ base: 3, md: 6 }}
            pe={{ base: 1, md: 2 }}
          >
            <FileIcon
              type={type}
              w={{ base: "1.8rem", md: "2.3rem" }}
              h={{ base: "1.8rem", md: "2.3rem" }}
            />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisV />}
                variant="ghost"
                p={0}
              />
              <MenuList
                color={useColorModeValue("black", "white")}
                border="none"
                boxShadow={useColorModeValue(
                  "0px 5px 30px 9px rgba(62,165,181,0.2)",
                  "0px 5px 30px 0px rgba(0,0,0,0.33)"
                )}
                borderRadius="2xl"
                py="4"
              >
                <MenuItem>Change Passcode</MenuItem>
                <MenuItem>Delete File</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Box px={{ base: 3, md: 6 }}>
            <Text
              fontSize={{ base: "0.96rem", md: "1.12rem", lg: "1.22rem" }}
              fontWeight="semibold"
              mb={{ base: 0, md: 2 }}
              isTruncated
              maxW={{
                base: "30vw",
                sm: "180px",
                md: "220px",
                lg: "230px",
                xl: "200px",
              }}
            >
              {title}
            </Text>
            <Text
              fontSize={{ base: "0.8rem", md: "1rem" }}
              opacity={0.6}
              isTruncated
              maxW={{
                base: "30vw",
                sm: "180px",
                md: "220px",
                lg: "230px",
                xl: "200px",
              }}
            >
              {time}
            </Text>
          </Box>
        </VStack>
      </Tooltip>
    </Box>
  );
};

export default QATile;
