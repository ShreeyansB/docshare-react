import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/Auth";
import FilesTable from "./files_table/FilesTable";
import QuickAccess from "./quick_access/QuickAccess";

const Docs = () => {
  const { user } = useAuth();

  return (
    <Box pt={{ base: "1.5rem", lg: "3.4rem" }} px="10vw" w="100%" minH="100%">
      <Box fontSize={{ base: "2xl", md: "3xl" }} mb="2rem">
        <Text display="inline" fontWeight="light">
          Hi
        </Text>
        <Text display="inline" fontWeight="semibold">
          {" " + user.email + ","}
        </Text>
      </Box>

      <Text fontSize="1.05rem" fontWeight="semibold" mb="1.5rem">
        Quick Access
      </Text>

      <QuickAccess />
      <FilesTable />
    </Box>
  );
};

export default Docs;
