import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCardById, fetchPokemonCards } from "../api/pokemon-cards";
import { PokemonCardType } from "../common/types";

const PokemonDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");

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
    queryFn: () => fetchPokemonCards(null),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading Pokemon card.</div>;

  const handleBattle = () => {
    console.log(`Battling ${data.name} with ${selectedPokemon}`);
  };

  return (
    <div className="mx-auto flex items-center justify-center p-4">
      <div className="flex h-96 w-60 flex-col items-center rounded-lg border p-4 shadow-md">
        <h1 className="mb-2 text-xl font-bold">{data.name}</h1>
        <div className="mb-4">
          <img src={data.imageUrl} alt={data.name} className="mb-2 max-h-40" />
        </div>
        <div className="w-full">
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-lg font-bold">HP:</span>
            <span>{data.hp}</span>
          </div>
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
          <span className="mr-2 text-lg font-bold">VS</span>
          <select
            className="rounded-lg border p-2"
            value={selectedPokemon}
            onChange={(e) => setSelectedPokemon(e.target.value)}
          >
            <option value="">Select a Pokemon</option>
            {pokemonList?.data.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
          onClick={handleBattle}
        >
          BATTLE!
        </button>
      </div>
    </div>
  );
};

export default PokemonDetailsPage;