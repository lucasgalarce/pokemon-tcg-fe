import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCards } from "../api/pokemon-cards";
import { PokemonCardType } from "@/common/types";
import PokemonCardComponent from "../components/PokemonCardComponent";
import AddPokemon from "../components/AddPokemon";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showAddPokemon, setShowAddPokemon] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-cards", query],
    queryFn: () => fetchPokemonCards(query),
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Pokemon cards.</div>;

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokemon App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a Pokemon"
        className="mb-4 rounded border p-2"
      />
      <button
        className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        onClick={() => setShowAddPokemon(true)}
      >
        Add Pokemon
      </button>
      {showAddPokemon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded-lg bg-white">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowAddPokemon(false)}
            >
              &times;
            </button>
            <AddPokemon />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data.map((card: PokemonCardType) => (
          <PokemonCardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
