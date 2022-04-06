import { Icon } from "@chakra-ui/icons";
import React from "react";
import fileTypes from "../../../helpers/filetypes";

const FileIcon = ({ type, w, h, px, py }) => {
  return (
    <Icon
      as={fileTypes[type].icon}
      color={fileTypes[type].color}
      w={w}
      h={h}
      px={px}
      py={py}
    ></Icon>
  );
};

export default FileIcon;
