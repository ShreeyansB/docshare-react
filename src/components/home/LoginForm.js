import React from "react";
import {
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  console.log(supabase.auth.user())
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

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
      navigate("/404");
    }
    setIsLoading(false);
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
          >
            Forgot Password?
          </Button>
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
