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
} from "@chakra-ui/react";
import React from "react";
import { useDB } from "../../../contexts/Database";
import { GoKebabVertical } from "react-icons/go";
import { Icon } from "@chakra-ui/icons";
import {
  HiOutlineDownload,
  HiOutlineKey,
  HiOutlineTrash,
} from "react-icons/hi";

const FilesTable = () => {
  const { userData } = useDB();
  const boxShadow = useColorModeValue(
    "0px 5px 30px 9px rgba(62,165,181,0.2)",
    "0px 5px 30px 0px rgba(0,0,0,0.33)"
  );
  const menuIconSize = {
    w: "5",
    h: "5",
    mt: 1,
    ms: 1,
  };

  const dataToRows = () =>
    userData.map((data, index) => {
      return (
        <Tr key={Object.keys(data)[index]}>
          <Td>{data.name}</Td>
          <Td>
            {new Date(data.created_at.substring(0, 23) + "Z").toLocaleString(
              "en-IN"
            )}
          </Td>
          <Td>
            {(parseFloat(data.size) / Math.pow(10, 6)).toFixed(2) + " MB"}
          </Td>
          <Td>{data.passcode ? "🔒" : ""}</Td>
          <Td isNumeric>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GoKebabVertical />}
                variant="ghost"
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
                  icon={<Icon as={HiOutlineDownload} {...menuIconSize} />}
                >
                  Download
                </MenuItem>
                <MenuItem icon={<Icon as={HiOutlineKey} {...menuIconSize} />}>
                  Change Passcode
                </MenuItem>
                <MenuItem icon={<Icon as={HiOutlineTrash} {...menuIconSize} />}>
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
      <Text mb={5}>Files</Text>
      <Table minWidth="800px">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date Uploaded</Th>
            <Th>Size</Th>
            <Th>Lock</Th>
            <Th isNumeric> </Th>
          </Tr>
        </Thead>
        <Tbody>{dataToRows()}</Tbody>
      </Table>
    </Box>
  );
};

export default FilesTable;
