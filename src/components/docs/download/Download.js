import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import FileIcon from "../quick_access/FileIcon";
import colors from "./../../../helpers/colors";
import { SHA256 } from "crypto-js";
import Preview from "./Preview";

const Download = () => {
  const params = useParams();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [file, setFile] = useState();
  const [passcode, setPasscode] = useState("");
  const [isButtonLocked, setIsButtonLocked] = useState(false);

  const primColor = useColorModeValue(colors.primartLight, colors.primaryDark);
  const secColor = useColorModeValue("#805AD5", "#B794F4");

  const passcodeHandler = (e) => {
    setPasscode(e);
    console.log(passcode);
  };

  const downloadFile = async () => {
    setIsDownloadLoading(true);
    if (isButtonLocked) {
      toast({
        title: "Error",
        description: "Please wait 5 seconds.",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
      setIsDownloadLoading(false);
      return;
    }
    if (file.passcode !== null) {
      const encPasscode = SHA256(passcode).toString();
      if (encPasscode !== file.passcode) {
        setIsButtonLocked(true);
        setTimeout(() => {
          setIsButtonLocked(false);
        }, 5000);
        toast({
          title: "Error",
          description: "Wrong Passcode",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
        setIsDownloadLoading(false);
        return;
      }
    }
    const { data, error } = await supabase.storage
      .from("files")
      .download(file.url.split("files/")[1]);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    else {
      console.log(data);
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
    setIsDownloadLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    supabase
      .from("userfiles")
      .select(
        "id, user_id, name, passcode, created_at, size, url, users(email)"
      )
      .match({ id: params.id })
      .abortSignal(controller.signal)
      .then(({ data }) => {
        setFile(data === null ? null : data[0]);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading)
    return (
      <Center mt="7rem">
        <Spinner />
      </Center>
    );
  else if (file)
    return (
      <Flex
        direction="column"
        pt={{ base: "4rem", lg: "8rem" }}
        px="8vw"
        w="100%"
        align="center"
        justify="space-around"
      >
        <VStack align="start" spacing="10">
          <HStack style={{ transform: "translate(-16px)" }}>
            <FileIcon
              type={file.name.split(".").at(-1)}
              w="6rem"
              h="6rem"
              py="1"
            />
            <VStack align="start" spacing={1}>
              <Tooltip label={file.name}>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "2xl", lg: "3xl" }}
                  noOfLines="1"
                  maxW={{ base: "70vw", lg: "50vw" }}
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
                  {file.users.email}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="lg"
                  fontWeight="light"
                  display="inline"
                  userSelect="none"
                  maxW={{ base: "80vw", lg: "50vw" }}
                  pe="0.87rem"
                >
                  at
                </Text>
                <Text
                  display="inline"
                  fontWeight="bold"
                  fontSize="md"
                  maxW={{ base: "80vw", lg: "50vw" }}
                  fontFamily="monospace"
                  color={secColor}
                >
                  {new Date(
                    file.created_at.substring(0, 23) + "Z"
                  ).toLocaleString("en-IN")}
                </Text>
              </Box>
            </VStack>
          </HStack>
          {file.passcode !== null && (
            <Box>
              <Text fontWeight="medium" mb={3}>
                Enter Passcode
              </Text>
              <HStack>
                <PinInput
                  type="alphanumeric"
                  size="md"
                  onChange={passcodeHandler}
                  id="passcode"
                  mask
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Box>
          )}
          <HStack spacing="3rem">
            <Preview file={file} />
            <Button
              colorScheme="teal"
              size="lg"
              onClick={downloadFile}
              isLoading={isDownloadLoading}
            >
              {`Download [${
                (parseFloat(file.size) / Math.pow(10, 6)).toFixed(2) + " MB"
              }]`}
            </Button>
          </HStack>
          <Button
            onClick={async () => {
              console.log(file);
              const filePath = file.url.split("files/")[1];
              console.log(filePath);
              const { data } = await supabase.storage
                .from("files")
                .createSignedUrl(filePath, 120);
              console.log(data);
            }}
          >
            Test
          </Button>
        </VStack>
      </Flex>
    );
  else return <Navigate to="/404" />;
};

export default Download;
