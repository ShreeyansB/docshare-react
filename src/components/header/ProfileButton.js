import { Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useAuth } from "../../contexts/Auth";

const ProfileButton = () => {
  const { user, signOut } = useAuth();
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Tooltip label={user.email} borderRadius='lg'>
        <motion.img
          initial={{
            cursor: "pointer",
            borderRadius: "1.04rem",
            backgroundColor: "teal",
            boxShadow: "0px 5px 30px 3px rgba(0,0,0,0.25)",
          }}
          whileHover={{ scale: 1.1, rotate: "-360deg" }}
          whileTap={{
            scale: 0.95,
            borderRadius: "10rem",
          }}
          src={
            "https://source.boringavatars.com/beam/240/" +
            user.email +
            "?square"
          }
          onClick={() => signOut()}
          height="50px"
          width="50px"
        />
      </Tooltip>
    </motion.div>
  );
};

export default ProfileButton;
