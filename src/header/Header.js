import {
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";


const Header = (props) => {
  return (
    <Flex
      direction="row"
      py={5}
      px={5}
      align="center"
      justify="space-between"
      mx={{ base: "5", xl: "13vw" }}
      bg="white"
      userSelect="none"
    >
      {/* Header Logo */}

      <Text fontSize="3xl" fontWeight="bold" zIndex={3} position="sticky">
        📘 Docshare
      </Text>

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
          <Link href="mailto:sbahadkars@gmail.com" target="_blank">
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
          <Link href="/help">
            <Icon mt={2} w={6} h={6} as={FaQuestionCircle} />
          </Link>
        </motion.div>
      </HStack>
    </Flex>
  );
};

export default Header;
