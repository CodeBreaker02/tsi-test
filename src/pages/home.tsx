import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import MatchList from "@/components/MatchList";
import axios from "axios";
import { useEffect, useState } from "react";
import { Match } from "@/utils/interface";
import { formatTime, getAfterTodayDate } from "@/utils/formatDate";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [afterTomorrowMatch, setAfterTomorrowMatch] = useState<Match>();
  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isError, setIsError] = useState(false);

  const formattedDate = afterTomorrowMatch
    ? new Date(afterTomorrowMatch.date.start).toLocaleDateString("en-US", {
        weekday: "short",
      })
    : "No upcoming match";

  const fetchAfterTomorrowMatch = async () => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/games",
      params: { date: getAfterTodayDate(3) },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      const afterTomorrowMatchData = response.data.response[0]; // Assuming the first match is the Sunday match
      setAfterTomorrowMatch(afterTomorrowMatchData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/games",
      params: { date: getAfterTodayDate(1) },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setMatches(response.data.response);
      setIsLoading(false);
      setDataFetched(true); // Set the flag to true after successful fetch
      console.log(response.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error(error);
    }
  };

  // Use useEffect to run the fetch data function only once
  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      fetchAfterTomorrowMatch();
    }
  }, [dataFetched]);

  return (
    <div className="w-full bg-white min-h-screen">
      <Navbar />
      <section className="px-6 md:px-36 py-10 md:py-26">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Top Left: Live NBA Match Or Main Event */}
          <div className="col-span-2 md:col-span-2 bg-white p-8 rounded-md shadow-md relative">
            <div className="flex justify-evenly mt-6">
              <p className="text-black mb-2 font-bold text-xl hidden sm:block">
                {afterTomorrowMatch?.teams.home.name}
              </p>
              <img
                src={afterTomorrowMatch?.teams.home.logo}
                alt={afterTomorrowMatch?.teams.home.name}
                className="h-12"
              />

              <div className="flex flex-col items-center mt-2">
                <p> {formattedDate} </p>
                <p className="text-black mb-2 text-center font-bold text-sm">
                  {formatTime(
                    afterTomorrowMatch?.date.start || new Date().toISOString()
                  )}
                </p>
                <p className="text-gray-600 mt-6 text-center text-lg">
                  {afterTomorrowMatch?.arena.name},{" "}
                  {afterTomorrowMatch?.arena.city}
                </p>
              </div>

              <img
                src={afterTomorrowMatch?.teams.visitors.logo}
                alt={afterTomorrowMatch?.teams.visitors.name}
                className="h-12"
              />
              <p className="text-black mb-2 font-bold text-xl text-right hidden sm:block">
                {afterTomorrowMatch?.teams.visitors.name}
              </p>
            </div>
            <span className="absolute top-2 right-2">
              <span className="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded border border-red-500">
                Season {afterTomorrowMatch?.season} -{" "}
                {1 + (afterTomorrowMatch?.season || 2023)}
              </span>
            </span>
          </div>

          {/* Top Right: Top News About NBA */}
          <div className="col-span-2 lg:col-span-1 p-4 rounded-md flex flex-col border">
            <h3 className="text-xl font-semibold mb-2">Top NBA News</h3>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center">
                {/* Grey box for image */}
                <img
                  className="bg-gray-300 h-10 w-10 mt-2 rounded-md flex-shrink-0"
                  alt=""
                />

                {/* Box for text */}
                <p className="ml-2 text-gray-600 text-sm ">
                  Lorem ipsum dolor sit amet. sed do eiusmod tempor incididunt
                </p>
              </div>
            ))}
          </div>

          <MatchList
            matches={matches}
            isLoading={isLoading}
            isError={isError}
          />

          <div className="col-span-1 bg-white p-6 rounded-md shadow-md h-1/2 overflow-hidden">
            <h3 className="text-xl font-semibold mb-2">Custom contents</h3>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex items-center">
                <img
                  className="bg-gray-300 h-10 w-10 mt-2 rounded-md flex-shrink-0"
                  alt=""
                />

                <p className="ml-2 text-gray-600 text-sm ">
                  Lorem ipsum dolor sit amet. sed do eiusmod tempor incididunt
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
