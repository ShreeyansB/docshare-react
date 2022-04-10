import { Badge, Box, HStack, Progress, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { useDB } from "../../contexts/Database";
import FilesTable from "./files_table/FilesTable";
import QuickAccess from "./quick_access/QuickAccess";

const Docs = () => {
  const { user } = useAuth();
  const { fileCapacity, reload } = useDB();

  const getProgressColorScheme = (value) => {
    if (value === 0) return "gray";
    if (value < 20) return "green";
    else if (value < 40) return "teal";
    else if (value < 60) return "yellow";
    else if (value < 80) return "orange";
    else return "red";
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Box pt={{ base: "1rem", lg: "2rem" }} px="10vw" w="100%" minH="100%">
        <Box fontSize={{ base: "2xl", md: "3xl" }} mb="2rem">
          <Text
            display="inline"
            fontWeight="light"
            onClick={() => {
              console.log(fileCapacity);
            }}
          >
            Hi
          </Text>
          <Text display="inline" fontWeight="semibold">
            {" " + user.email + ","}
          </Text>
          <HStack align="center" mt={1}>
            <Progress
              value={(fileCapacity / 50) * 100}
              size="xs"
              colorScheme={getProgressColorScheme((fileCapacity / 50) * 100)}
              w="220px"
              mt="0.3rem"
            />
            <Badge
              colorScheme={getProgressColorScheme((fileCapacity / 50) * 100)}
              variant="subtle"
            >
              {`${fileCapacity} / 50MB`}
            </Badge>
          </HStack>
        </Box>

        <Text fontSize="1.05rem" fontWeight="semibold" mb="1.5rem">
          Quick Access
        </Text>

        <QuickAccess />
        <FilesTable />
      </Box>
    </motion.div>
  );
};

export default Docs;
