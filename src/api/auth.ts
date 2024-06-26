import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { LoginData, AuthResponse, RegisterData } from "@/common/types";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post(
    "/auth/login",
    data,
  );
  return response.data;
};

export const signup = async (data: RegisterData): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post(
    "/auth/sign-up",
    data,
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
