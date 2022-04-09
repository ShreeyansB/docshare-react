import {
  Box,
  Flex,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import FileIcon from "./FileIcon";
import fileTypes from "./../../../helpers/filetypes";
import classes from "./QATile.module.css";
import ReactTimeAgo from "react-time-ago";

const QATile = ({ data, index }) => {
  const type = data.name.split(".").at(-1);

  return (
    <Box
      w="100%"
      h={{ base: "160px", sm: "170px", md: "200px" }}
      borderRadius="1.4rem"
      bgGradient={useColorModeValue(
        fileTypes[type].gradLight,
        fileTypes[type].gradDark
      )}
      cursor="pointer"
      py={{ base: 3, md: 6 }}
      title={data.name}
      className={useColorModeValue(classes.dibba, classes.box)}
      display={{
        base: index < 5 ? "block" : "none",
        md: index < 7 ? "block" : "none",
        xl: index < 12 ? "block" : "none",
      }}
    >
      <VStack align="start" justifyContent="space-between" h="100%">
        <Flex
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
          <Menu size="xl">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaEllipsisV />}
              variant="ghost"
              p={0}
              me={1}
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
        </Flex>
        <Box px={{ base: 3, md: 6 }}>
          <Text
            fontSize={{ base: "0.96rem", md: "1.12rem", lg: "1.22rem" }}
            fontWeight="semibold"
            mb={0}
            isTruncated
            maxW={{
              base: "30vw",
              sm: "180px",
              md: "220px",
              lg: "230px",
              xl: "200px",
            }}
          >
            {data.name}
          </Text>
          <Text
            fontSize={{ base: "0.82rem", md: "0.86rem", lg: "0.9rem" }}
            fontWeight="medium"
            mb={{ base: 0, md: 2 }}
            isTruncated
            opacity={0.4}
            maxW={{
              base: "30vw",
              sm: "180px",
              md: "220px",
              lg: "230px",
              xl: "200px",
            }}
          >
            {"by " + data.users.email}
          </Text>
          <ReactTimeAgo
            date={new Date(data.seen_at)}
            style={{
              fontSize: "0.82rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              opacity: 0.4,
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default QATile;
