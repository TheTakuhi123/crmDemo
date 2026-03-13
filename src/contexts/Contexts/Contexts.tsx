import { StrictMode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { queryClient } from "../../config/query/react-query";
import AppLayout from "../../layouts/AppLayout";
import { raynetTheme } from "./CustomTheme";

function Contexts({ children }: { children?: React.ReactNode }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={raynetTheme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            />
            <ToastContainer />
              <AppLayout>{children}</AppLayout>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

export default Contexts;
