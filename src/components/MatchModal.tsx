import React, { useEffect, useState } from "react";
import axios from "axios";
import { Match } from "@/utils/interface";
import { CircleSpinner } from "@/components/CircleSpinner";

interface MatchModalProps {
  homeTeamId: number;
  visitorTeamId: number;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({
  onClose,
  visitorTeamId,
  homeTeamId,
}) => {
  const [teamsDetails, setTeamsDetails] = useState<Match>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const formattedDate = teamsDetails
    ? new Date(teamsDetails.date.start).toLocaleDateString("en-US", {
        weekday: "short",
        hour: "numeric",
        month: "short",
      })
    : "No Date";
  const fetchData = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/games",
      params: { h2h: `${homeTeamId}-${visitorTeamId}` },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.request(options);

      const responseArray = response.data.response;

      // Find the last element with status.long === ''finished
      const lastFinishedMatch = responseArray.reduceRight(
        (acc: any, current: { status: { long: string } }) => {
          if (current.status.long === "Finished" && !acc) {
            return current;
          }
          return acc;
        },
        null
      );

      setTeamsDetails(lastFinishedMatch);
      setIsLoading(false);
      console.log(lastFinishedMatch);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-2xl">
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
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 ">
                <span className="font-medium">Last match detail: </span>
                {formattedDate}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex justify-evenly">
                <p className="text-base leading-relaxed text-gray-500">
                  <strong>League:</strong> {teamsDetails?.league}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  <strong>Season:</strong> {teamsDetails?.season}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  <strong>Stage:</strong> {teamsDetails?.stage}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={teamsDetails?.teams.visitors.logo}
                    alt={`${teamsDetails?.teams.visitors.name} Logo`}
                    className="w-8 h-8 mr-2 bounce"
                  />
                  <h4 className="font-semibold text-gray-900">
                    {teamsDetails?.teams.visitors.nickname}
                  </h4>
                </div>
                <div className="flex items-center">
                  <img
                    src={teamsDetails?.teams.home.logo}
                    alt={`${teamsDetails?.teams.home.name} Logo`}
                    className="w-8 h-8 mr-2 "
                  />
                  <h4 className="font-semibold text-gray-900">
                    {teamsDetails?.teams.home.nickname}
                  </h4>
                </div>
              </div>
              {/* Scores */}
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>Scores:</strong>{" "}
                    {teamsDetails?.scores.visitors.points}
                  </p>
                  <div></div>
                </div>
                <div>
                  <p>
                    <strong>Scores:</strong> {teamsDetails?.scores.home.points}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="grid grid-cols-4 gap-4">
                  {teamsDetails?.scores.visitors.linescore.map(
                    (quarter, index) => (
                      <div key={index} className="text-center">
                        <p className="text-sm">{`Q${index + 1}`}</p>
                        <p className="text-base font-semibold">{quarter}</p>
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {teamsDetails?.scores.home.linescore.map((quarter, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm">{`Q${index + 1}`}</p>
                      <p className="text-base font-semibold">{quarter}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="text-base leading-relaxed text-gray-500">
                  {teamsDetails?.nugget || "No nugget"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchModal;
