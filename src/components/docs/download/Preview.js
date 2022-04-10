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
  useToast,
} from "@chakra-ui/react";
import { SHA256 } from "crypto-js";
import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { supabase } from "./../../../supabaseClient";

const Preview = ({ file, passcode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [fileURL, setFileURL] = useState("");
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isButtonLocked, setIsButtonLocked] = useState(false);

  const previewHandler = () => {
    setIsPreviewLoading(true);
    if (isButtonLocked) {
      toast({
        title: "Error",
        description: "Please wait 5 seconds.",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
      setIsPreviewLoading(false);
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
        setIsPreviewLoading(false);
        return;
      }
    }
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
      <Button colorScheme="purple" onClick={previewHandler} size="md">
        Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {fileURL === "" && (
              <Center>
                <Spinner />
              </Center>
            )}
            {fileURL !== "" && (
              <Center>
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: fileURL }]}
                  style={{
                    height: "87vh",
                    width: "95vw",
                    borderRadius: "1rem",
                    color: "slateblue",
                  }}
                />
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Preview;
