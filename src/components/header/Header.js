import { MoonIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaGithub, FaSun } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import LogoIcon from "./Logo/LogoIcon";
import LogoName from "./Logo/LogoName";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import ProfileButton from "./ProfileButton";
import { useCallback } from "react";
import { supabase } from "../../supabaseClient";
import { useLocation } from "react-router-dom";

let URLFragment;
const Header = () => {
  const { user } = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();

  // Password Reset State Variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resetPassword, setResetPassword] = useState("");
  const toast = useToast();
  const location = useLocation();

  const { update } = useAuth();
  const navigate = useNavigate();

  const checkIfPasswordReset = useCallback(() => {
    if (URLFragment.type === "recovery") {
      onOpen();
    }
  }, [onOpen]);

  // Hook runs on page load to get URL Params to check if password needs to be reset.

  useEffect(() => {
    console.log(location);
    URLFragment = Object.fromEntries(
      new URLSearchParams(location.hash.substr(1))
    );
    checkIfPasswordReset();
  }, [location, checkIfPasswordReset]);

  // Possword Reset Handler
  const handleResetPassword = async () => {
    let gError = { message: "Unhandled Exception Occured." };
    if (URLFragment.status === "loggedreset") {
      const { error } = await update({
        password: resetPassword,
      });
      gError = error;
    } else {
      const { error } = await supabase.auth.api.updateUser(
        URLFragment.access_token,
        {
          password: resetPassword,
        }
      );
      gError = error;
    }

    onClose();

    if (gError) {
      toast({
        title: "Error",
        description: gError.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Success",
        description: "Your password has been reset.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    }
    navigate(location.pathname, { replace: true });
  };

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
      {/* Password Reset Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalBody>
            <Text>Enter new password:</Text>
            <Input
              mt={5}
              placeholder="password"
              onChange={(e) => setResetPassword(e.target.value)}
              value={resetPassword}
              type="password"
              id="resetPassword"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
        spacing={{ base: 3, md: 6 }}
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
            <Icon
              mt={2}
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              as={FaGithub}
            />
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
            <Icon
              mt={2}
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              as={FaEnvelope}
            />
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
            <Icon
              mt={2}
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              as={FaQuestionCircle}
            />
          </Link>
        </motion.div>
        <Link _focus={{ outline: "none" }}>
          <Icon
            opacity={0.8}
            mt={{
              base: colorMode === "light" ? 2 : 0,
              md: colorMode === "light" ? 2 : 1,
            }}
            w={{ base: 5, md: 6 }}
            h={{ base: 5, md: 6 }}
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
