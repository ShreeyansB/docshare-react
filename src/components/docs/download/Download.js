import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDB } from "../../../contexts/Database";
import { supabase } from "../../../supabaseClient";

const Download = () => {
  const { userData, isLoading } = useDB();
  const params = useParams();
  const [file, setFile] = useState();

  useEffect(() => {
    const controller = new AbortController();

    supabase
      .from("userfiles")
      .select()
      .match({ id: params.id })
      .abortSignal(controller.signal)
      .then(({ data }) => setFile(data === null ? null : data[0]));
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <Spinner />;
  else if (file)
    return (
      <Flex
        direction="column"
        pt={{ base: "1rem", lg: "3.4rem" }}
        px="10vw"
        w="100%"
        align="center"
        justify="space-around"
      >
        <Button onClick={() => console.log(file)}>Test</Button>
      </Flex>
    );
  else return <Navigate to="/404" />;
};

export default Download;
