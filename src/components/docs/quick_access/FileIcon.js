import { Icon } from "@chakra-ui/icons";
import React from "react";
import fileTypes from "../../../helpers/filetypes";

const FileIcon = ({ type, w, h, px, py, pb, pt }) => {
  return (
    <Icon
      as={fileTypes[type].icon}
      color={fileTypes[type].color}
      w={w}
      h={h}
      px={px}
      py={py}
      pb={pb}
      pt={pt}
    ></Icon>
  );
};

export default FileIcon;
