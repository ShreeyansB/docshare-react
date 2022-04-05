import {
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import FileIcon from "../quick_access/FileIcon";
import colors from "./../../../helpers/colors";

const Download = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState();
  const primColor = useColorModeValue(colors.primartLight, colors.primaryDark);

  useEffect(() => {
    const controller = new AbortController();

    supabase
      .from("userfiles")
      .select(
        "id, user_id, name, passcode, created_at, size, url, users(email)"
      )
      .match({id: params.id})
      .abortSignal(controller.signal)
      .then(({ data }) => {
        setFile(data === null ? null : data[0]);
        setIsLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <Spinner />;
  else if (file)
    return (
      <Flex
        direction="column"
        pt={{ base: "16vw", lg: "12vw" }}
        px="10vw"
        w="100%"
        align="center"
        justify="space-around"
      >
        <HStack align="start">
          <FileIcon type={file.name.split(".").at(-1)} w="4.9rem" h="5rem" />
          <VStack align="start" spacing={1}>
            <Tooltip label={file.name}>
              <Text
                fontWeight="bold"
                fontSize="3xl"
                noOfLines="1"
                maxW={{ base: "80vw", lg: "50vw" }}
              >
                {file.name}
              </Text>
            </Tooltip>
            <Box>
              <Text
                fontSize="lg"
                fontWeight="light"
                display="inline"
                userSelect="none"
              >
                by &nbsp;
              </Text>
              <Text
                display="inline"
                fontSize="lg"
                fontWeight="medium"
                color={primColor}
              >
                {file.user_id}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <Button onClick={() => console.log(file)}>Test</Button>
      </Flex>
    );
  else return <Navigate to="/404" />;
};

export default Download;
