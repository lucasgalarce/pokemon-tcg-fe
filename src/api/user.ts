import { instance as api } from "./index";
import { config } from "./config";

const apiHost = config.apiHost;
const base = apiHost + "/users";

export const fetchUsers = async (token: string | null) => {
  const url = base;

  const response = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchIsPremium = async (token: string | null) => {
  const url = `${base}/is-premium`;

  const response = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchPremiumInfo = async (token: string | null) => {
  const url = `${base}/premium-info`;

  const response = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
