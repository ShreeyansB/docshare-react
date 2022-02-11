import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const SignUpForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0 }}
    >
      <Box
        bg={useColorModeValue("white", "whiteAlpha.50")}
        borderRadius="3xl"
        p={7}
        mt={10}
        boxShadow={useColorModeValue(
          "0px 32px 96px 22px rgba(62,165,181,0.35)",
          "0px 32px 96px 22px rgba(0,0,0,0.33)"
        )}
      >
        <form>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              isRequired
            />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" placeholder="password" />
          </FormControl>
          <Button
            display="block"
            variant="solid"
            colorScheme="teal"
            size="md"
            mt={7}
            px={10}
            borderRadius='0.76rem'
          >
            SIGN UP
          </Button>
        </form>
      </Box>
    </motion.div>
  );
};

export default SignUpForm;
