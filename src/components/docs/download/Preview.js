import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DocViewer from "react-doc-viewer";
import { supabase } from "./../../../supabaseClient";

const Preview = ({ file }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileURL, setFileURL] = useState("");

  const previewHandler = () => {
    onOpen();
  };

  useEffect(() => {
    const filePath = file.url.split("files/")[1];
    supabase.storage
      .from("files")
      .createSignedUrl(filePath, 120)
      .then(({ signedURL }) => setFileURL(signedURL));
  }, []);

  return (
    <Box>
      <Button colorScheme="purple" size="lg" onClick={previewHandler}>
        Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{file.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {fileURL === "" && (
              <Center>
                <Spinner />
              </Center>
            )}
            {fileURL !== "" && <DocViewer documents={[{ uri: fileURL }]} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Preview;
