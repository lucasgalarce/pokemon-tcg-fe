import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCards } from "../api/pokemon-cards";
import { PokemonCardType } from "@/common/types";
import PokemonCardComponent from "../components/PokemonCardComponent";
import AddPokemon from "../components/AddPokemon";
import useDebounce from "../hooks/useDebounce";
import { PokemonType, PokemonExpansion } from "../common/enums";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [expansionQuery, setExpansionQuery] = useState<string>("");
  const [typeQuery, setTypeQuery] = useState<string>("");
  const [showAddPokemon, setShowAddPokemon] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce<string>(query, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-cards", debouncedQuery, expansionQuery, typeQuery],
    queryFn: () => fetchPokemonCards(debouncedQuery, expansionQuery, typeQuery),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Pokemon cards.</div>;

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokemon App</h1>
      <div className="mb-4 flex space-x-4">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Name"
          className="rounded border p-2"
        />
        <select
          value={expansionQuery}
          onChange={(e) => setExpansionQuery(e.target.value)}
          className="rounded border p-2"
        >
          <option value="">Select Expansion</option>
          {Object.values(PokemonExpansion).map((expansion) => (
            <option key={expansion} value={expansion}>
              {expansion}
            </option>
          ))}
        </select>
        <select
          value={typeQuery}
          onChange={(e) => setTypeQuery(e.target.value)}
          className="rounded border p-2"
        >
          <option value="">Type</option>
          {Object.values(PokemonType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        onClick={() => setShowAddPokemon(true)}
      >
        Add Pokemon
      </button>
      {showAddPokemon && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${showAddPokemon ? "show" : ""}`}
        >
          <div className="relative transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-300">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowAddPokemon(false)}
            >
              &times;
            </button>
            <AddPokemon onClose={() => setShowAddPokemon(false)} />
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
