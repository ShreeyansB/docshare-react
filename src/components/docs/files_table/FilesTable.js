import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Alert,
  AlertIcon,
  Button,
  useToast,
  Fade,
  Spinner,
  Flex,
  TableContainer,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDB } from "../../../contexts/Database";
import { GoKebabVertical } from "react-icons/go";
import { Icon } from "@chakra-ui/icons";
import {
  HiOutlineDownload,
  HiOutlineKey,
  HiOutlineShare,
  HiOutlineTrash,
} from "react-icons/hi";

const FilesTable = () => {
  const { userData, deleteFile, changePasscode, isLoading } = useDB();
  const boxShadow = useColorModeValue(
    "0px 5px 30px 9px rgba(62,165,181,0.2)",
    "0px 5px 30px 0px rgba(0,0,0,0.33)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [alert, setAlert] = useState();
  const [isPasscodeLoading, setIsPasscodeLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const menuIconSize = {
    w: "5",
    h: "5",
    mt: 1,
    ms: 1,
  };

  const fileDeleteHandler = async (id, url) => {
    setIsDeleteLoading(true);
    const response = await deleteFile({ id: id, url: url });
    if (response.error) alert(response.error);
    await new Promise((r) => setTimeout(r, 1000));
    setIsDeleteLoading(false);
  };

  const changePasscodeHandler = async (e) => {
    e.preventDefault();
    setIsPasscodeLoading(true);
    if (passcode.length !== 0 && passcode.length < 6) {
      setAlert({
        status: "error",
        message: "Enter full passcode or keep it blank.",
      });
    } else {
      const { error } = await changePasscode(selectedDocument.id, passcode);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
    }
    setIsPasscodeLoading(false);
    onClose();
  };

  const passcodeHandler = (e) => {
    setPasscode(e);
  };

  const downloadClickHandler = (id) => {
    // navigate("/download/" + id, );
    window.open("/download/" + id, "_blank");
  };

  const shareHandler = (id) => {
    let temp = document.createElement("textarea");
    temp.value = process.env.REACT_APP_BASE_URL + `/download/${id}`;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    toast({
      title: "Copied",
      description: "Download URL copied to clipboard.",
      status: "info",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  const getData = () => {
    let data = [];
    userData.forEach((item, index) => {
      data.push({
        name: item.name,
        created_at: new Date(item.created_at.substring(0, 23) + "Z"),
        size: (parseFloat(item.size) / Math.pow(10, 6)).toFixed(2) + " MB",
        locked: item.passcode ? "🔒" : "",
      });
    });
    return data;
  };

  const dataToRows = () =>
    userData.map((data, index) => {
      return (
        <Tr key={data.id} fontWeight="medium">
          <Td opacity={0.5} fontWeight="bold">
            {index + 1 + "."}
          </Td>
          <Td>{data.name}</Td>
          <Td>
            {new Date(data.created_at.substring(0, 23) + "Z").toLocaleString(
              "en-IN"
            )}
          </Td>
          <Td>
            {(parseFloat(data.size) / Math.pow(10, 6)).toFixed(2) + " MB"}
          </Td>
          <Td textAlign="center">{data.passcode ? "🔒" : ""}</Td>
          <Td isNumeric>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GoKebabVertical />}
                variant="ghost"
                isLoading={isDeleteLoading}
              >
                Options
              </MenuButton>
              <MenuList
                border="none"
                boxShadow={boxShadow}
                borderRadius="2xl"
                py="4"
              >
                <MenuItem
                  onClick={() => downloadClickHandler(data.id)}
                  icon={<Icon as={HiOutlineDownload} {...menuIconSize} />}
                >
                  Download
                </MenuItem>
                <MenuItem
                  onClick={() => shareHandler(data.id)}
                  icon={<Icon as={HiOutlineShare} {...menuIconSize} />}
                >
                  Share
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelectedDocument(data);
                    onOpen();
                  }}
                  icon={<Icon as={HiOutlineKey} {...menuIconSize} />}
                >
                  Change Passcode
                </MenuItem>
                <MenuItem
                  icon={<Icon as={HiOutlineTrash} {...menuIconSize} />}
                  onClick={() => fileDeleteHandler(data.id, data.url)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
      );
    });

  return (
    <Box mt={10} mb="10rem">
      {/* Modal */}
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
          <ModalHeader>Change Passcode</ModalHeader>
          <ModalBody>
            <form onSubmit={changePasscodeHandler} id="passcode-form">
              <FormControl>
                <FormLabel htmlFor="passcode">Enter Passcode</FormLabel>
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
                  Leave empty to remove passcode
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
              onClick={() => {
                setPasscode("");
                onClose();
              }}
              isLoading={isPasscodeLoading}
            >
              Close
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              form="passcode-form"
              isLoading={isPasscodeLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal End */}
      <Text fontSize="1.05rem" fontWeight="semibold" mb={5}>
        Files
      </Text>
      {isLoading && (
        <Flex w="100%" justify="center">
          <Spinner size="lg" mt={5} opacity="0.4" />
        </Flex>
      )}
      {!isLoading && (
        <Fade in={true}>
          {userData.length === 0 && (
            <Tag variant="subtle" colorScheme="purple" size="md">
              No Files Uploaded
            </Tag>
          )}
          {userData.length !== 0 && (
            <TableContainer>
              <Table minWidth="800px" size="sm">
                <Thead>
                  <Tr>
                    <Th isNumeric></Th>
                    <Th>Name</Th>
                    <Th>Date Uploaded</Th>
                    <Th>Size</Th>
                    <Th textAlign="center">Locked</Th>
                    <Th isNumeric> </Th>
                  </Tr>
                </Thead>
                <Tbody>{dataToRows()}</Tbody>
              </Table>
            </TableContainer>
          )}
        </Fade>
      )}
    </Box>
  );
};

export default FilesTable;
