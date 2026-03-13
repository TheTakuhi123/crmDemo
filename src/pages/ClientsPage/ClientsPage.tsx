import { FC } from "react";

import { Box } from "@mui/material";
import ClientsContainer from "../../containers/ClientsContainer";

const ClientsPage: FC = () => {

  return (
    <Box sx={{ padding: 3 }}>
      <ClientsContainer />
    </Box>
  );
};

export default ClientsPage;
