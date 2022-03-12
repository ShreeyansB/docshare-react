import React from "react";
import {
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Text,
  Code,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const LoginForm = () => {
  // Auth Context
  const { signIn } = useAuth();

  // Login-SignUp Form State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset Form State Variables
  const [resetEmail, setResetEmail] = useState("");

  const toast = useToast(); // Hook for ChakraUI Toast
  const navigate = useNavigate(); // Hook for navigation to other page
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for ChakraUI Modal

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn({
      email,
      password,
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      // setIsLoading(false); commented because func is async, was giving errors when using before navigate. State gets reset when comp is remounted, so its fine to ignore.
      navigate("/docs")
    }
  };

  const handleForgotPassword = async () => {
    const { error } = supabase.auth.api.resetPasswordForEmail(resetEmail);

    onClose();

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Reset Request Sent",
        description: "Check your email for resetting your password.",
        status: "info",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <Box
        bg={useColorModeValue("white", "whiteAlpha.50")}
        borderRadius="3xl"
        p={7}
        mt={10}
        boxShadow={useColorModeValue(
          "0px 32px 96px 22px rgba(62,165,181,0.28)",
          "0px 32px 96px 22px rgba(0,0,0,0.23)"
        )}
      >
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              isRequired
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <Button
            variant="link"
            size="sm"
            mt={6}
            float="right"
            opacity={0.5}
            p={1}
            tabIndex={-1}
            onClick={onOpen}
          >
            Forgot Password?
          </Button>

          {/* Modal for resetting password */}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Forgot your password?</ModalHeader>
              <ModalBody>
                <Text>
                  Seems like you forgot your password.
                  <br />
                  <br /> Enter you Email below and click{" "}
                  <Code>Reset Password</Code> to send a reset request to your
                  registered email.
                </Text>
                <Input
                  mt={5}
                  placeholder="name@company.com"
                  onChange={(e) => setResetEmail(e.target.value)}
                  value={resetEmail}
                  type="email"
                  id="resetEmail"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button colorScheme="teal" onClick={handleForgotPassword}>
                  Reset Password
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button
            type="submit"
            variant="solid"
            colorScheme="teal"
            size="md"
            mt="4.8rem"
            borderRadius="0.76rem"
            px={10}
            isLoading={isLoading}
          >
            LOGIN
          </Button>
        </form>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
