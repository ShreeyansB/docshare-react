import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QATile from "./QATile";
import UploadTile from "./UploadTile";

const QuickAccess = () => {
  const [data, setData] = useState([]);

  const fileData = [
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

  const getTiles = data.map((item, i) => (
    <QATile key={item.id} data={item} index={i} />
  ));

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("myCache")).reverse());
    const recheckCache = setTimeout(
      () => setData(JSON.parse(localStorage.getItem("myCache")) ?? []),
      10000
    );
    return () => {
      clearInterval(recheckCache);
    };
  }, []);

  return (
    <SimpleGrid minChildWidth={{ base: "160px", md: "220px" }} spacing={6}>
      <UploadTile />
      {data && getTiles}
    </SimpleGrid>
  );
};

export default QuickAccess;
