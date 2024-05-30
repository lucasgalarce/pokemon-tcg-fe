import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCardById, fetchPokemonCards } from "../api/pokemon-cards";
import { BattleType, PokemonCardType } from "../common/types";
import { battle } from "../api/battle";

const PokemonDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [battleResult, setBattleResult] = useState<string>("");

  const { data, isLoading, isError } = useQuery<PokemonCardType>({
    queryKey: ["pokemon-card", id],
    queryFn: () => {
      if (id) {
        return fetchPokemonCardById(id);
      }
      return Promise.reject(new Error("No ID provided"));
    },
  });

  const { data: pokemonList } = useQuery({
    queryKey: ["pokemon-cards"],
    queryFn: () => fetchPokemonCards(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading Pokemon card.</div>;

  const handleBattle = async () => {
    if (!selectedPokemon) {
      console.log("Please select a Pokemon to battle with.");
      return;
    }

    try {
      const battleData: BattleType = {
        attackerId: id!,
        defenderId: selectedPokemon,
      };
      const response = await battle(battleData);
      setBattleResult(`${response.message}`);
    } catch (error) {
      console.error("Error initiating battle:", error);
      setBattleResult("Error initiating battle.");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center p-4">
      <div className="flex h-96 w-60 flex-col items-center rounded-lg border p-4 shadow-md">
        <div className="mb-2 flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">{data.name}</h1>
          <span className="text-sm">{data.hp} HP</span>
        </div>
        <div className="mb-2 flex h-40 w-full items-center justify-center bg-gray-200">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.name}
              className="h-full object-contain"
            />
          ) : (
            <span>No Image Available</span>
          )}
        </div>
        <div className="w-full">
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-lg font-bold">Type:</span>
            <span>{data.type}</span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-lg font-bold">Expansion:</span>
            <span>{data.expansion}</span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-lg font-bold">Rarity:</span>
            <span>{data.rarity}</span>
          </div>
        </div>
      </div>
      <div className="ml-4 flex flex-col items-center p-4">
        <h2 className="mb-4 text-xl font-bold">Battle with:</h2>
        <div className="mb-4 flex items-center">
          <span className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
            VS
          </span>
          <select
            className="rounded-lg border p-2"
            value={selectedPokemon}
            onChange={(e) => setSelectedPokemon(e.target.value)}
          >
            <option value="">Select a Pokemon</option>
            {pokemonList?.data.map(
              (pokemon: PokemonCardType) =>
                pokemon.id.toString() !== id && (
                  <option key={pokemon.id} value={pokemon.id}>
                    {pokemon.name}
                  </option>
                ),
            )}
          </select>
        </div>
        <button
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
          onClick={handleBattle}
        >
          BATTLE!
        </button>
        {battleResult && (
          <div className="mt-4 rounded-lg border bg-gray-100 p-2 text-center">
            {battleResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
