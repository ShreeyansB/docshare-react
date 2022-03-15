import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useDB } from "../../../contexts/Database";

const FilesTable = () => {
  const { userData } = useDB();

  const dataToRows = () =>
    userData.map((data, index) => {
      return (
        <Tr key={Object.keys(data)[index]}>
          <Td>{data.name}</Td>
          <Td>
            {new Date(data.created_at.substring(0, 23) + "Z").toLocaleString(
              "en-GB"
            )}
          </Td>
          <Td>{data.passcode ? "🔒" : ""}</Td>
          <Td><Button>E</Button></Td>
        </Tr>
      );
    });

  return (
    <Box mt={10} mb='10rem'>
      <Text mb={5}>Files</Text>
      <Table minWidth='800px' >
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date Uploaded</Th>
            <Th>Lock</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{dataToRows()}</Tbody>
      </Table>
    </Box>
  );
};

export default FilesTable;
