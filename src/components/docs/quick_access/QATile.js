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
  Icon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import FileIcon from "./FileIcon";
import fileTypes from "./../../../helpers/filetypes";
import classes from "./QATile.module.css";
import ReactTimeAgo from "react-time-ago";
import { GoKebabVertical } from "react-icons/go";
import { HiOutlineDownload, HiOutlineShare } from "react-icons/hi";

const QATile = ({ data, index }) => {
  const type = data.name.split(".").at(-1);
  const menuIconSize = {
    w: "5",
    h: "5",
    mt: 1,
    ms: 1,
  };

  const toast = useToast();

  const downloadClickHandler = (id) => {
    window.open("/download/" + id, "_blank");
  };

  const shareHandler = (id) => {
    let temp = document.createElement("textarea");
    temp.value = process.env.REACT_APP_BASE_URL + `/download/${id}`;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    toast({
      title: "Copied",
      description: "Download URL copied to clipboard.",
      status: "info",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

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
      onClick={() => downloadClickHandler(data.id)}
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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GoKebabVertical />}
              variant="ghost"
            >
              Options
            </MenuButton>
            <MenuList border="none" shadow="xl" borderRadius="2xl" py="4">
              <MenuItem
                onClick={() => downloadClickHandler(data.id)}
                icon={<Icon as={HiOutlineDownload} {...menuIconSize} />}
              >
                Download
              </MenuItem>
              <MenuItem
                onClick={() => shareHandler(data.id)}
                icon={<Icon as={HiOutlineShare} {...menuIconSize} />}
              >
                Share
              </MenuItem>
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
