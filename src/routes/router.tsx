import { createBrowserRouter } from "react-router-dom";
import HomePage from "src/pages/HomePage";
import LoginPage from "src/pages/LoginPage";
import ErrorPage from "src/pages/ErrorPage";
import Layout from "src/components/Layout";
import PokemonDetailsPage from "src/pages/PokemonDetailsPage";
import SignUpPage from "src/pages/SignUpPage";

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
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pokemon/:id",
    element: (
      <Layout>
        <PokemonDetailsPage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);
