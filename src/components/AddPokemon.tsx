import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPokemonCard } from "../api/pokemon-cards";
import { PokemonType, PokemonExpansion, PokemonRarity } from "../common/enums";

interface AddPokemonProps {
  onClose: () => void;
}

const AddPokemon: React.FC<AddPokemonProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [hp, setHp] = useState<string>("");
  const [type, setType] = useState<PokemonType>(PokemonType.WATER);
  const [expansion, setExpansion] = useState<PokemonExpansion>(
    PokemonExpansion.BASE,
  );
  const [rarity, setRarity] = useState<PokemonRarity>(PokemonRarity.RARE);
  const [originalAttackDmg, setOriginalAttackDmg] = useState<string>("");
  const [weakness, setWeakness] = useState<PokemonType | null>(null);
  const [resistance, setResistance] = useState<PokemonType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async (createPokemonCardData: FormData) => {
      return createPokemonCard(createPokemonCardData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemon-cards"] });
      setIsSubmitting(false);
      onClose();
    },
    onError: (error: unknown) => {
      console.log(error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("hp", hp);
    formData.append("type", type);
    formData.append("expansion", expansion);
    formData.append("rarity", rarity);
    formData.append("originalAttackDmg", originalAttackDmg);
    formData.append("weakness", weakness ? weakness : "");
    if (resistance) {
      formData.append("resistance", resistance);
    }
    if (image) {
      formData.append("image", image);
    }

    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <h2 className="mb-4 text-lg font-bold sm:col-span-2">Add Pokemon</h2>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          HP
        </label>
        <input
          type="number"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as PokemonType)}
          className="w-full rounded-lg border px-3 py-2"
          required
        >
          {Object.values(PokemonType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Expansion
        </label>
        <select
          value={expansion}
          onChange={(e) => setExpansion(e.target.value as PokemonExpansion)}
          className="w-full rounded-lg border px-3 py-2"
          required
        >
          {Object.values(PokemonExpansion).map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Rarity
        </label>
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value as PokemonRarity)}
          className="w-full rounded-lg border px-3 py-2"
          required
        >
          {Object.values(PokemonRarity).map((rar) => (
            <option key={rar} value={rar}>
              {rar}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Original Attack Damage
        </label>
        <input
          type="number"
          value={originalAttackDmg}
          onChange={(e) => setOriginalAttackDmg(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Weakness
        </label>
        <select
          value={weakness || ""}
          onChange={(e) =>
            setWeakness(
              e.target.value === "" ? null : (e.target.value as PokemonType),
            )
          }
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="">None</option>
          {Object.values(PokemonType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Resistance
        </label>
        <select
          value={resistance || ""}
          onChange={(e) =>
            setResistance(
              e.target.value === "" ? null : (e.target.value as PokemonType),
            )
          }
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="">None</option>
          {Object.values(PokemonType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Image
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 sm:col-span-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Pokemon"}
      </button>
    </form>
  );
};

export default AddPokemon;
