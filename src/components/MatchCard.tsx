import React from "react";
import { MatchCardProps } from "@/utils/interface";
import { formatTime } from "@/utils/formatDate";

const MatchCard: React.FC<MatchCardProps> = ({ matchDetails, onCardClick }) => {
  const formattedDate = new Date(matchDetails.date.start).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    }
  );
  const formattedTime = formatTime(matchDetails.date.start);

  return (
    <div
      className="p-3 bg-white border border-gray-200 rounded-lg shadow mt-6"
      onClick={onCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-between">
        <div className="relative flex">
          <div className="rounded-full w-10 h-10 border flex items-center justify-center">
            <img
              src={matchDetails.teams.home.logo}
              alt={matchDetails.teams.home.name}
              className="h-5"
            />
          </div>
          <div className="rounded-full w-10 h-10 border flex items-center justify-center absolute ml-8 bg-white">
            <img
              src={matchDetails.teams.visitors.logo}
              alt={matchDetails.teams.visitors.name}
              className="h-5"
            />
          </div>
        </div>
        <div>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-500">
            {formattedDate}
          </span>
          <p className="font-bold text-lg text-right">{formattedTime}</p>
        </div>
      </div>
      <div className="border my-2"></div>
      <div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="text-black mb-2 font-bold text-md">
              {matchDetails.teams.home.nickname}
            </p>
            <p className="text-black mb-2 font-light text-sm">(0-0, Home)</p>
          </div>
          <div className="flex justify-between">
            <p className="text-black mb-2 font-bold text-md">
              {matchDetails.teams.visitors.nickname}
            </p>
            <p className="text-black mb-2 font-light text-sm">(0-0, Away) </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
