import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

// import Sidebar from "../../components/Sidebar";

const AppLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     minHeight: "100vh",
    //     position: "relative",
    //   }}
    // >
    //   <Sidebar />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {children}
      </Box>
    // </Box>
  );
};

export default AppLayout;
