import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

const AppLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
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
  );
};

export default AppLayout;
