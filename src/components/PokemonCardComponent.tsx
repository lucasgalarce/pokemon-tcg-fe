import React from "react";
import { useNavigate } from "react-router-dom";
import { PokemonCardType } from "@/common/types";

interface PokemonCardProps {
  card: PokemonCardType;
}

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${card.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-96 w-60 cursor-pointer flex-col items-center justify-between rounded-lg border p-4 shadow-md"
    >
      <div className="mb-2 flex w-full items-center justify-between">
        <h2 className="text-lg font-bold">{card.name}</h2>
        <span className="text-sm">{card.hp} HP</span>
      </div>
      {/* <div className="mb-2 flex h-40 w-full items-center justify-center bg-gray-200">
        <img src={card.imageUrl} alt={card.name} className="max-h-full" />
      </div> */}
      <div className="w-full">
        <div className="mb-2 flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full border"></div>
          <span>Type: {card.type}</span>
        </div>
        <div className="mb-2 flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full border"></div>
          <span>Expansion: {card.expansion}</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border"></div>
          <span>Rarity: {card.rarity}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardComponent;
