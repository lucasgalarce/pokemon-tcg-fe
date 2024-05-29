export interface CreatePokemonCardType {
  name: string;
  hp: number;
  originalAttackDmg: number;
  type: string;
  expansion: string;
  rarity: string;
  weakness: string | null;
  resistance?: string | null;
  imageUrl?: string | null;
}

export interface EditPokemonCardType {
  name?: string;
}

export interface PokemonCardType {
  id: number;
  name: string;
  hp: number;
  originalAttackDmg: number;
  type: string;
  expansion: string;
  rarity: string;
  weakness: string | null;
  resistance: string | null;
  imageUrl?: string | null;
}

export interface PokemonCardsResponse {
  data: PokemonCardType[];
  total: number;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface BattleType {
  attackerId: string;
  defenderId: string;
}

export interface BattleResponseType {
  message: string;
}
