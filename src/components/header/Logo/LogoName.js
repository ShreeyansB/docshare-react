import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import colors from './../../../helpers/colors';

const LogoName = () => {
  return (
    <Box display={{base: 'none', md: 'block'}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="33"
        version="1.2"
        viewBox="0 0 700 132"
        
      >
        <style></style>
        <path
          id="DocShare"
          fill={useColorModeValue(colors.bgDark, colors.bgLight)}
          d="M26.34 109.74h20.08q5.9 0 8.29-2.4 2.58-2.58 2.58-8.47V42.68q0-5.89-2.58-8.29-2.39-2.57-8.29-2.57H26.34q-2.02 0-2.02 2.02v73.87q0 2.03 2.02 2.03zM.92 126.13V15.42q0-3.87 3.87-3.87h45.5q14.37 0 22.29 7.92 8.1 7.74 8.1 22.11v58.39q0 14.37-8.1 22.29Q64.66 130 50.29 130H4.79q-3.87 0-3.87-3.87zM145.89 130H129.5q-14.55 0-22.47-7.74-7.92-7.73-7.92-22.29V66.08q0-14.55 7.92-22.29 7.92-7.74 22.47-7.74h16.39q14.37 0 22.29 7.92 8.11 7.74 8.11 22.11v33.89q0 14.37-8.11 22.29-7.92 7.74-22.29 7.74zM133 109.92h9.39q5.9 0 8.29-2.39 2.58-2.4 2.58-8.29V66.82q0-5.9-2.58-8.29-2.39-2.4-8.29-2.4H133q-5.89 0-8.29 2.4-2.39 2.39-2.39 8.29v32.42q0 5.89 2.39 8.29 2.4 2.39 8.29 2.39zm121.58 3.69v12.71q0 2.02-.92 2.94-.74.74-2.95.74h-27.45q-14.55 0-22.47-7.74-7.92-7.73-7.92-22.29V66.08q0-14.55 7.92-22.29 7.92-7.74 22.47-7.74h27.45q3.87 0 3.87 3.87v12.71q0 2.03-.92 2.95-.74.74-2.95.74h-23.76q-5.71 0-8.29 2.57-2.4 2.4-2.4 8.29v31.69q0 5.89 2.4 8.47 2.58 2.4 8.29 2.4h23.76q3.87 0 3.87 3.87zm14.74-13.82v-3.68q0-3.87 3.86-3.87h15.66q3.87 0 3.87 3.87v1.47q0 7 2.76 9.58 2.77 2.58 10.14 2.58h8.65q7.19 0 9.95-2.77 2.95-2.76 2.95-10.31v-2.21q0-5.34-4.42-8.11-4.24-2.95-10.69-3.5-6.44-.55-14-2.02-7.37-1.66-13.81-4.06-6.45-2.58-10.87-9.76-4.24-7.37-4.24-18.79v-6.45q0-14.37 8.11-22.29 8.1-7.92 22.47-7.92h18.42q14.55 0 22.66 7.92 8.1 7.92 8.1 22.29v3.5q0 3.87-3.86 3.87h-15.66q-3.87 0-3.87-3.87v-1.1q0-7.19-2.76-9.77-2.77-2.57-10.13-2.57h-7.19q-7.55 0-10.31 2.94-2.58 2.77-2.58 11.06v3.5q0 8.65 15.1 9.94 15.66 1.29 27.82 6.27 6.44 2.76 10.68 9.94 4.42 7 4.42 18.06v6.26q0 14.37-8.1 22.29-8.11 7.92-22.48 7.92h-20.08q-14.36 0-22.47-7.92-8.1-7.92-8.1-22.29zM389.24 130h-15.66q-3.87 0-3.87-3.87V4.37q0-3.87 3.87-3.87h15.66q3.87 0 3.87 3.87V46h.73q4.05-9.95 18.05-9.95h5.9q28.92 0 28.92 30.03v60.05q0 3.87-4.05 3.87h-15.48q-3.86 0-3.86-3.87V67.18q0-5.89-2.58-8.29-2.4-2.57-8.29-2.57h-6.63q-12.71 0-12.71 14v55.81q0 3.87-3.87 3.87zm109.79 0h-4.42q-14.56 0-22.48-7.74-7.92-7.73-7.92-22.29V66.08q0-14.55 7.92-22.29 7.92-7.74 22.48-7.74h42.55q4.05 0 4.05 3.87v86.21q0 3.87-4.05 3.87h-15.48q-3.86 0-3.86-3.87v-6.08h-.74q-2.03 4.98-7.19 7.56-5.15 2.39-10.86 2.39zm18.79-34.26v-37.4q0-2.02-2.21-2.02h-17.32q-5.9 0-8.29 2.57-2.39 2.4-2.39 8.29v31.69q0 5.89 2.39 8.47 2.39 2.4 8.29 2.4h6.82q12.71 0 12.71-14zM581 130h-15.66q-3.87 0-3.87-3.87V39.92q0-3.87 3.87-3.87H581q3.87 0 3.87 3.87v6.26h.74q2.02-4.97 7.18-7.55t10.87-2.58h6.63q3.68 0 3.68 3.87v12.71q0 2.21-.92 3.13-.73.74-2.76.56h-12.71q-12.71 0-12.71 14.36v55.45q0 3.87-3.87 3.87zm114.03 0h-40.71q-14.56 0-22.48-7.74-7.92-7.73-7.92-22.29V66.08q0-14.55 7.92-22.29 7.92-7.74 22.48-7.74h14.55q14.55 0 22.47 7.74 7.92 7.74 7.92 22.29v23.39q0 3.87-3.87 3.87h-46.23q-2.21 0-2.21 2.03v4.05q0 5.71 2.39 8.29 2.58 2.4 8.48 2.4h37.21q3.86 0 3.86 4.05v12.16q0 2.02-.92 2.94-.73.74-2.94.74zm-45.87-52.32h25.05q2.03 0 2.03-2.02v-8.84q0-5.9-2.4-8.29-2.39-2.4-8.29-2.4h-7.73q-5.9 0-8.29 2.4-2.4 2.39-2.4 8.29v8.84q0 2.02 2.03 2.02z"
        ></path>
      </svg>
    </Box>
  );
};

export default LogoName;
