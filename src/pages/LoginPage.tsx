import { useState, FormEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated, login: authLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (data) => {
      setIsLoading(false);
      authLogin(data.token);
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
      setIsError(true);
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    mutation.mutate({ username, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-700">
          Pokemon App Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="mt-4 text-sm text-red-500">
              Login failed. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
