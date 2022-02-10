import React from "react";
import { useColorModeValue } from '@chakra-ui/react';
import colors from './../../../helpers/colors';

const LogoIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        
        height="45"
        viewBox="0 0 387.36 500"
      >
        <g data-name="Layer 2">
          <path
            fill={useColorModeValue(colors.primartLight, colors.primaryDark)}
            d="M134.26 0L56.32 77.94V500h387.36V0zm261.3 402.81H103.74v-43.9h291.82zm.35-99.58H104.09v-43.89h291.82z"
            transform="translate(-56.32)"
          ></path>
          <path
            fill={useColorModeValue("#317369", "#40a395")}
            d="M193.33 40.5L193.33 197.33 36.5 197.33 36.5 197.32 77.94 155.88 0 77.94 77.94 0 155.88 77.94 193.32 40.5 193.33 40.5z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default LogoIcon;
