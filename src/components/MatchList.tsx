import React, { useState } from "react";
import MatchCard from "./MatchCard";
import MatchModal from "@/components/MatchModal";
import { Match } from "@/utils/interface";
import { CircleSpinner } from "@/components/CircleSpinner";

interface MatchListProps {
  matches: Array<any>;
  isLoading: boolean;
  isError: boolean;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  isLoading,
  isError,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match>();
  const selectedMatchHomeTeamId = selectedMatch?.teams?.home?.id;
  const selectedMatchVisitorTeamId = selectedMatch?.teams?.visitors?.id;
  const handleCardClick = (match: any) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(undefined);
  };

  return (
    <div className="col-span-2 bg-white rounded-md">
      <h3 className="text-xl font-semibold mb-4">Upcoming Matches</h3>
      {isError && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Danger alert!</span> Wait to make
            another request.
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircleSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              matchDetails={match}
              onCardClick={() => handleCardClick(match)}
            />
          ))}

          {/* Render MatchModal when a match is selected */}
          {selectedMatch && (
            <MatchModal
              onClose={handleCloseModal}
              homeTeamId={selectedMatchHomeTeamId || 0}
              visitorTeamId={selectedMatchVisitorTeamId || 0}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MatchList;
