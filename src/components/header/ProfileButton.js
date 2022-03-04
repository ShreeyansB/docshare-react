import {
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useAuth } from "../../contexts/Auth";
import ProfileImg from "./ProfileImg";
import { HiOutlineLogout, HiOutlineKey } from "react-icons/hi";

import { useLocation, useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const path = useLocation();

  const signOutHandler = () => {
    signOut();
    navigate("/");
  };

  const changePasswordHandler = () => {
    navigate(path.pathname + "#type=recovery&status=loggedreset");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <Menu>
        <MenuButton as={ProfileImg}>Hello</MenuButton>
        <MenuList
          color={useColorModeValue("black", "white")}
          border="none"
          boxShadow={useColorModeValue(
            "0px 5px 30px 9px rgba(62,165,181,0.2)",
            "0px 5px 30px 0px rgba(0,0,0,0.33)"
          )}
          borderRadius="2xl"
          py="4"
        >
          <MenuGroup title={user.email}>
            <MenuItem
              icon={<Icon as={HiOutlineKey} w="5" h="5" mt={2} ms={2} />}
              onClick={changePasswordHandler}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<Icon as={HiOutlineLogout} w="5" h="5" mt={2} ms={2} />}
              onClick={signOutHandler}
            >
              Sign Out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </motion.div>
  );
};

export default ProfileButton;
