import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import {
  PokemonCardsResponse,
  PokemonCardType,
  CreatePokemonCardType,
  EditPokemonCardType,
} from "@/common/types";

export const fetchPokemonCards = async (
  name: string | null,
): Promise<PokemonCardsResponse> => {
  const response: AxiosResponse<PokemonCardsResponse> = await api.get(
    "/pokemon-cards",
    {
      params: { name },
    },
  );
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
