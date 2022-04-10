import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QATile from "./QATile";
import UploadTile from "./UploadTile";

const QuickAccess = () => {
  const [data, setData] = useState([]);

  const getTiles = data.map((item, i) => (
    <QATile key={item.id} data={item} index={i} />
  ));

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myCache") ?? "[]");
    setData(data.reverse());
    let recheckCache = setInterval(() => {
      const data = JSON.parse(localStorage.getItem("myCache"));
      if (data !== null) setData(data.reverse());
    }, 7000);
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
