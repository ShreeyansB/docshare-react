import { motion } from "framer-motion";
import React from "react";
import { Box, forwardRef } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth";

const ProfileImg = forwardRef((props, ref) => {
  const { user } = useAuth();

  return (
    <Box {...props} ref={ref}>
      <motion.img
        initial={{
          filter: "saturate(160%) contrast(70%) brightness(120%)", // to make image more pastel
          cursor: "pointer",
          borderRadius: "1.04rem",
          backgroundColor: "teal",
          boxShadow: "0px 5px 30px 3px rgba(0,0,0,0.25)",
        }}
        whileHover={{ scale: 1.1, rotate: "-360deg"}}
        whileTap={{
          scale: 0.95,
          borderRadius: "10rem",
        }}
        transition={{
          duration: 0.2
        }}
        src={
          "https://source.boringavatars.com/beam/240/" + user.email + "?square"
        }
        height="50px"
        width="50px"
      />
    </Box>
  );
});

export default ProfileImg;
