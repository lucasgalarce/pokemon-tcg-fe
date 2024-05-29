import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { BattleType, BattleResponseType } from "@/common/types";

export const battle = async (data: BattleType): Promise<BattleResponseType> => {
  const response: AxiosResponse<BattleResponseType> = await api.post(
    `/battle`,
    data,
  );
  return response.data;
};
