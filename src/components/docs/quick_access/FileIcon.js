import { Icon } from "@chakra-ui/icons";
import React from "react";
import fileTypes from "../../../helpers/filetypes";


const FileIcon = ({ type, w, h }) => {
  return (
      <Icon
        as={fileTypes[type].icon}
        color={fileTypes[type].color}
        w={w}
        h={h}
        shadow='2xl'
      ></Icon>
  );
};

export default FileIcon;
