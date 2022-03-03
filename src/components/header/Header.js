import { MoonIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaSun } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import LogoIcon from "./Logo/LogoIcon";
import LogoName from "./Logo/LogoName";
import { Link as RouteLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import ProfileButton from "./ProfileButton";

const Header = (props) => {
  const { user } = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      direction="row"
      py={6}
      px={{ base: 10, md: "10vw" }}
      align="center"
      justify="space-between"
      userSelect="none"
      borderBottom="2px"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.100")}
    >
      {/* Header Brand */}
      <Link
        as={RouteLink}
        to="/"
        onDragStart={(e) => e.preventDefault()} // to prevent dragging the logo
        _focus={{ boxShadow: "none" }} // to remove to outline on Link focus
      >
        <HStack spacing={4}>
          <LogoIcon />
          <LogoName />
        </HStack>
      </Link>

      {/* Header Nav Links */}

      <HStack
        spacing={6}
        color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
      >
        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <Link
            href="https://github.com/ShreeyansB/document-sharing-react"
            target="_blank"
            _focus={{ outline: "none" }}
          >
            <Icon mt={2} w={6} h={6} as={FaGithub} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <Link
            href="mailto:sbahadkars@gmail.com"
            target="_blank"
            _focus={{ outline: "none" }}
          >
            <Icon mt={2} w={6} h={6} as={FaEnvelope} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <Link as={RouteLink} to="/about" _focus={{ outline: "none" }}>
            <Icon mt={2} w={6} h={6} as={FaQuestionCircle} />
          </Link>
        </motion.div>
        <Link _focus={{ outline: "none" }}>
          <Icon
            opacity={0.8}
            mt={colorMode === "light" ? 2 : 1}
            w={6}
            h={6}
            as={colorMode === "light" ? FaSun : MoonIcon}
            onClick={toggleColorMode}
            cursor="pointer"
          />
        </Link>
        {user && <ProfileButton />}
      </HStack>
    </Flex>
  );
};

export default Header;
