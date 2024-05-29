import HomePage from "src/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "src/pages/ErrorPage";
import Layout from "src/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);
