import {
  useColorModeValue,
  useToast,
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleLogin = async (email) => {
    try {
      setLoginLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      toast({
        title: "Account Created",
        position: "top",
        description: "Check your email for login link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        position: "top",
        description: error.error_description || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to supabase</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              via magic link with your email below ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                  }}
                  isLoading={loginLoading}
                  loadingText="Signing in ..."
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {loginLoading || "Send magic link"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
