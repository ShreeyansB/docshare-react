// Icons
import {
  BsFileZipFill,
  BsFileWordFill,
  BsFilePptFill,
  BsFileSpreadsheetFill,
  BsFilePdfFill,
} from "react-icons/bs";

const fileTypes = {
  doc: {
    icon: BsFileWordFill,
    color: "blue.400",
    gradDark: 'linear(to-tr, #1d3f55, #112c38 90%)',
    gradLight: 'linear(to-tr, #bcd5ff, #F0F5FF 90%)'
  },
  ppt: {
    icon: BsFilePptFill,
    color: "yellow.500",
    gradDark: 'linear(to-tr, #3f3b1c, #26230b 90%)',
    gradLight: 'linear(to-tr, #ffebbf, #FFF9EE 90%)'
  },
  xls: {
    icon: BsFileSpreadsheetFill,
    color: "green.400",
    gradDark: 'linear(to-tr, #1c4f28, #0f2d16 90%)',
    gradLight: 'linear(to-tr, #a1e0b0, #E8FDE6 90%)'
  },
  pdf: {
    icon: BsFilePdfFill,
    color: "red.400",
    gradDark: 'linear(to-tr, #4f1d2a, #301013 90%)',
    gradLight: 'linear(to-tr, #ffbfbf, #ffefef 90%)'
  },
  zip: {
    icon: BsFileZipFill,
    color: "purple.500",
    gradDark: 'linear(to-tr, #391e4f, #1f1330 90%)',
    gradLight: 'linear(to-tr, #d8c9ff, #f5f2fc 90%)'
  },
};

export default fileTypes;
