import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { PokemonCardType, CreatePokemonCardType } from "@/common/types";

export const fetchPokemonCards = async (
  name?: string,
  expansion?: string,
  type?: string,
  page: number = 0,
  pageSize: number = 8,
) => {
  const response = await api.get("/pokemon-cards", {
    params: {
      name,
      expansion,
      type,
      page,
      pageSize,
    },
  });
  return response.data;
};

export const fetchPokemonCardById = async (
  id: number | string,
): Promise<PokemonCardType> => {
  const response: AxiosResponse<PokemonCardType> = await api.get(
    `/pokemon-cards/${id}`,
  );
  return response.data;
};

export const createPokemonCard = async (
  data: FormData,
): Promise<AxiosResponse<CreatePokemonCardType>> => {
  const response = await api.post("/pokemon-cards", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePokemonCard = async (
  data: PokemonCardType,
  id: number,
): Promise<PokemonCardType> => {
  const response = await api.put(`/pokemon-cards/${id}`, data);
  return response.data;
};

export const deletePokemonCard = async (id: number): Promise<void> => {
  await api.delete(`/pokemon-cards/${id}`);
};
