import { Icon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useDB } from "../../../contexts/Database";

const UploadTile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Form States
  const [filePath, setFilePath] = useState("");
  const [passcode, setPasscode] = useState("");
  const [alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { insertUserFiles } = useDB();

  const filePathHandler = (e) => {
    let text = e.target.value.split("\\").slice(-1)[0];
    if (text.length > 40) {
      text = "..." + text.slice(text.length - 36);
    }
    setFilePath(text);
  };

  const passcodeHandler = (e) => {
    setPasscode(e);
  };

  const testHandler = async () => {};

  const uploadHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (filePath === "") {
      setAlert({ status: "error", message: "Please select a file." });
    } else if (passcode.length !== 0 && passcode.length < 6) {
      setAlert({
        status: "error",
        message: "Enter full passcode or keep it blank.",
      });
    } else if (e.target[1].files[0].size > 52428800) {
      setAlert({
        status: "error",
        message: "File Size exceeds 50MB",
      });
    } else {
      setAlert();
      const { error } = await insertUserFiles({
        filePath: filePath,
        file: e.target[1].files[0],
        passcode: passcode,
      });

      if (error) {
        toast({
          title: "Error",
          description:
            error.statusCode === "23505"
              ? "File with same name already exists."
              : error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
      }
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Box
      w="100%"
      h={{ base: "130px", sm: "160px", md: "200px" }}
      borderRadius="1.4rem"
      cursor="pointer"
      py={{ base: 3, md: 6 }}
      border="2px solid"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
      onClick={onOpen}
    >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="lg"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalBody>
            <form onSubmit={uploadHandler} id="upload-form">
              <FormControl>
                <FormLabel htmlFor="file">Select a file to upload</FormLabel>
                <HStack>
                  <Text
                    w="100%"
                    border="1px"
                    borderRadius="md"
                    borderColor={useColorModeValue(
                      "blackAlpha.200",
                      "whiteAlpha.300"
                    )}
                    p="0.45rem"
                    fontSize="sm"
                  >
                    {filePath === "" ? "Select File" : filePath}
                  </Text>
                  <Button p={0}>
                    <label htmlFor="file">
                      <Text cursor="pointer" px={7}>
                        Browse
                      </Text>
                    </label>
                  </Button>
                  <Input
                    placeholder="Select file"
                    type="file"
                    id="file"
                    display="none"
                    onChange={filePathHandler}
                  ></Input>
                </HStack>

                <Text mt={3} fontSize="sm" opacity="0.6">
                  <Text display="inline" as="span">
                    ❗
                  </Text>{" "}
                  Max File Size: 50MB
                </Text>
                <Text fontSize="sm" opacity="0.6">
                  <Text display="inline" as="span">
                    ❗
                  </Text>{" "}
                  Supported File Types: doc/docx, ppt, pdf, xls, zip
                </Text>

                <FormLabel htmlFor="passcode" mt={5}>
                  Enter Passcode
                </FormLabel>
                <HStack>
                  <PinInput
                    type="alphanumeric"
                    size="md"
                    onChange={passcodeHandler}
                    id="passcode"
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <Text fontSize="sm" opacity="0.6" mt={3}>
                  <Text display="inline" as="span">
                    ❗
                  </Text>{" "}
                  Leave empty to allow everyone to view file
                </Text>
              </FormControl>
            </form>
            {alert && (
              <Alert status={alert.status} mt={5} borderRadius="xl">
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              me={3}
              onClick={onClose}
              isLoading={isLoading}
            >
              Close
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              form="upload-form"
              isLoading={isLoading}
            >
              Upload
            </Button>
            {/* <Button colorScheme="purple" onClick={testHandler}>
              Test
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Tooltip label="Upload">
        <Flex w="100%" h="100%" align="center" justify="center">
          <Icon
            as={FaUpload}
            h="3rem"
            w="3rem"
            color={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
          />
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default UploadTile;
