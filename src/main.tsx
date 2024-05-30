import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { router } from "src/routes/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { twMerge } from "tailwind-merge";
import { AuthProvider } from "../src/context/authContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PrimeReactProvider
          value={{
            unstyled: true,
            pt: Tailwind,
            ptOptions: {
              mergeSections: true,
              mergeProps: true,
              classNameMergeFunction: twMerge,
            },
          }}
        >
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
