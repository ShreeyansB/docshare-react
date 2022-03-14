import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import QATile from "./QATile";
import UploadTile from "./UploadTile";

const QuickAccess = () => {
  const fileData = [
    { type: "doc", title: "Project SRS", time: "2022-03-14T22:34:56+0000" },
    {
      type: "ppt",
      title: "SE Chap 1 Slides",
      time: "2022-03-14T22:34:56+0000",
    },
    {
      type: "xls",
      title: "Sem 5 Attendance",
      time: "2022-03-14T22:34:56+0000",
    },
    {
      type: "pdf",
      title: "Competitive English",
      time: "2022-03-14T22:34:56+0000",
    },
    { type: "zip", title: "SE Lectures", time: "2022-03-14T22:34:56+0000" },
  ];

  const getTiles = fileData.map((data, i) => <QATile key={i} {...data} />);

  return (
    <SimpleGrid minChildWidth={{ base: "160px", md: "220px" }} spacing={6}>
      <UploadTile />
      {getTiles}
    </SimpleGrid>
  );
};

export default QuickAccess;
