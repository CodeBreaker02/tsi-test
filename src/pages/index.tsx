import { MotionDiv } from "@/components/motion";
import useMouse from "@react-hook/mouse-position";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { formatTime, getAfterTodayDate } from "@/utils/formatDate";
import MatchList from "@/components/MatchList";
import { Match } from "@/utils/interface";
import axios from "axios";
function useConditionalMouse(ref: any) {
  return useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });
}

export default function Index() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const ref = React.useRef(null);

  let mouseXPosition: number | null = 0;
  let mouseYPosition: number | null = 0;

  if (typeof window !== "undefined") {
    // @ts-ignore
    const mouse = useConditionalMouse(ref); // Use the custom hook here

    if (mouse.x !== null) {
      mouseXPosition = mouse.clientX;
    }

    if (mouse.y !== null) {
      mouseYPosition = mouse.clientY;
    }
  }

  const variants = {
    default: {
      opacity: 1,
      height: 20,
      width: 20,
      fontSize: "16px",
      backgroundColor: "white",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    me: {
      opacity: 1,
      backgroundColor: "#fff",
      border: "0.01rem solid #000",
      color: "#000",
      height: 128,
      width: 128,
      fontSize: "32px",
      x: mouseXPosition !== null ? mouseXPosition - 48 : 0,
      y: mouseYPosition !== null ? mouseYPosition - 48 : 0,
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  function meEnter() {
    setCursorText("View");
    setCursorVariant("me");
  }

  function meLeave() {
    setCursorText("");
    setCursorVariant("default");
  }

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
    <div className="w-full h-screen p-3 relative" ref={ref}>
      <Header />
      <MotionDiv
        // @ts-ignore
        variants={variants}
        className="circle"
        animate={cursorVariant}
        transition={spring}
      >
        <span className="cursorText">{cursorText}</span>
      </MotionDiv>
      <div className="mt-40">
        <section className="flex flex-col lg:flex-row p-12 animate-fadeIn">
          <div className="lg:w-1/2 pr-8">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left text-orange-700">
              Elevate Your Finances with Basketball Investments
            </h2>
            <p className="text-white mb-4 text-center lg:text-left">
              Immerse yourself in the dynamic world of basketball investments.
              Seize the opportunity to score big in the financial game. Whether
              you're a rookie investor or a seasoned pro, the court of financial
              success awaits you.
            </p>
            <p className="text-white mb-4 text-center lg:text-left hidden lg:block">
              Dribble through diverse investment strategies, from slam-dunk
              stocks to three-pointer real estate deals. Explore the playbook of
              financial freedom and learn how basketball principles can guide
              your path to wealth creation.
            </p>
            <p className="text-indigo-500 font-bold text-center lg:text-left">
              Are you ready to slam dunk your way to financial freedom?
              <span className="underline cursor-pointer">Learn More</span>
            </p>
          </div>

          <div className="lg:w-1/2 floating">
            <img
              className="object-cover w-full h-full rounded-md shadow-md"
              src="https://www.basketusa.com/wp-content/uploads/2022/03/FM4yR1lXwAIRTCI.jpg"
              alt="Basketball Investment"
            />
          </div>
        </section>
        <div className="h-8 lg:h-20 w-screen bg-white text-lg lg:text-5xl  hidden lg:flex items-center justify-center font-bold slider text-black my-6">
          <p className="animation-slide-infinite">
            🏀 UPCOMING EVENTS - 12 DEC 2023 - EYA CENTER 🏀
          </p>
        </div>
        <section className="px-6 md:px-36 py-10 md:py-26">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Top Left: Live NBA Match Or Main Event */}
            <div className="col-span- md:col-span-2 bg-white p-8 rounded-md shadow-md relative">
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

            <MatchList
              matches={matches}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </section>

        <section className="px-6 md:px-36 py-10 md:py-26">
          <div className="flex flex-col mb-2 lg:mt-20 lg:mb-12 px-4 lg:px-16">
            <div className="flex items-center">
              <h2 className="text-white text-6xl pr-3">Latest</h2>
              <svg
                viewBox="0 0 61 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 lg:w-24 relative lg:top-14px"
              >
                <path
                  d="M48.8924 35.2016C48.6467 34.6422 48.1746 34.2781 47.7478 33.8749C47.6438 33.7543 47.585 33.5947 47.5262 33.435C47.4673 33.2754 47.3633 33.1548 47.1687 33.1123C46.8942 33.0686 46.665 32.9859 46.5368 32.7458C46.2699 32.345 45.8672 32.0612 45.5445 31.7787C45.3258 31.6167 45.1418 31.495 44.9231 31.333C44.4405 31.0481 44.1841 30.568 43.6668 30.2429C43.1842 29.958 42.7921 29.5951 42.3547 29.2711C42.1361 29.1092 41.9521 28.9874 41.7334 28.8255C41.5147 28.6635 41.1708 28.5394 40.9974 28.3384C40.3972 27.7342 39.5148 27.4436 38.803 27.076C38.3897 26.8715 37.987 26.5878 37.5285 26.4223C36.9901 26.2558 36.6086 25.8135 35.9796 25.725C35.3853 25.6767 34.9585 25.2736 34.3749 25.146C33.8364 24.9794 33.298 24.8129 32.7595 24.6463C31.4881 24.2706 30.2513 23.9351 28.924 23.6777C28.1005 23.5467 27.277 23.4157 26.4082 23.3237C25.734 23.2742 25.0493 23.304 24.4203 23.2155C23.4822 23.0432 22.4776 23.0683 21.4596 22.8948C20.9105 22.8075 20.3962 22.7603 19.8819 22.7132C19.2077 22.6637 18.5335 22.6143 17.8593 22.5648C17.4596 22.559 17.0599 22.5533 16.6149 22.5865C15.7597 22.6933 14.8804 22.6805 14.0357 22.708C12.5862 22.7664 11.1503 23.0236 9.6932 23.4392C9.02198 23.6677 8.3372 23.6975 7.67655 23.8467C7.31153 23.8811 6.94652 23.9156 6.57094 24.0292C5.57995 24.2531 4.61308 24.5964 3.6221 24.8203C3.12132 24.9718 2.70048 25.1245 2.30376 25.3967C2.168 25.5138 1.99755 25.5907 1.79241 25.6275C1.37158 25.7802 0.867823 25.6538 0.590338 25.3322C0.451596 25.1714 0.483302 24.9336 0.515007 24.6959C0.738299 24.2227 1.04153 23.7507 1.49408 23.3603C2.2634 22.6965 3.12621 22.2326 4.02371 21.8089C5.90921 20.8834 7.81124 20.4345 9.77207 20.1452C12.7933 19.7126 15.7616 19.6761 18.7435 19.8383C19.8973 19.8947 21.0964 19.9121 22.2503 19.9685C22.7299 19.9754 23.199 20.0616 23.7133 20.1087C24.3076 20.157 24.9365 20.2455 25.6108 20.295C26.6394 20.3893 27.6575 20.5628 28.6861 20.6571C29.7947 20.7525 30.8822 21.0064 31.9244 21.2994C32.3829 21.4648 32.8519 21.551 33.3104 21.7165C35.5442 22.384 37.6662 23.2881 39.6978 24.2702C40.6871 24.9594 41.8334 25.373 42.8227 26.0622C43.1907 26.3058 43.3325 26.7445 43.7457 26.949C44.1243 27.1133 44.4681 27.2373 44.7562 27.4797C45.6656 28.1677 46.5298 28.8948 47.3381 29.7402C47.8237 30.3031 48.3199 30.7866 48.896 31.2714C49.2987 31.5551 49.6003 31.9961 49.9019 32.4372C50.297 33.0781 50.772 33.7202 51.2576 34.283C52.2635 35.4489 52.8033 36.8065 53.3777 38.2043C53.5541 38.6832 53.6853 39.2012 53.8617 39.6801C53.8964 39.7204 54.011 39.7617 54.0457 39.8019C54.0457 39.8019 54.1709 39.764 54.1362 39.7238C54.8302 38.4238 55.7188 37.1662 56.3781 35.826C56.4098 35.5882 56.4098 35.5882 56.455 35.5492C56.5455 35.4711 56.6813 35.354 56.8065 35.3161C56.897 35.238 57.1157 35.3999 57.2197 35.5206C57.5108 36.0409 57.5167 36.5967 57.1924 37.2272C56.8122 37.976 56.432 38.7248 55.9372 39.4323C55.5887 39.9433 55.3548 40.4957 55.121 41.0482C54.9535 41.403 54.8207 41.7981 54.8825 42.2357C54.9096 42.6331 54.7768 43.0282 54.6787 43.4634C54.5912 43.8195 54.2156 43.9331 53.917 43.77C53.8476 43.6896 53.7676 43.6885 53.6983 43.6081C52.7994 42.8408 51.5868 42.6247 50.4088 42.4489C49.8598 42.3615 49.255 42.3925 48.7165 42.2259C48.4073 42.142 48.077 42.2167 47.7573 42.212C47.5174 42.2086 47.3229 42.166 47.1389 42.0443C46.8056 41.841 46.8449 41.246 47.1963 41.0129C47.3321 40.8958 47.5025 40.8188 47.673 40.7419C48.1391 40.5502 48.6745 40.4388 49.1542 40.4457C49.9641 40.3781 50.6836 40.3885 51.4724 40.4793C51.667 40.5218 51.9068 40.5253 52.1572 40.4495C52.2372 40.4506 52.3382 40.2933 52.3035 40.2531C51.9402 39.3745 51.5315 38.5348 50.9524 37.7722C50.8137 37.6114 50.675 37.4506 50.5362 37.2898C50.0024 36.488 49.6284 35.6886 48.8924 35.2016Z"
                  fill="#F05523"
                ></path>
              </svg>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              onMouseEnter={meEnter}
              onMouseLeave={meLeave}
            >
              <div
                className="col-span-4 md:col-span-2 row-span-2 lg:flex-shrink-0 lg:max-w-335px transform translate-x-10 opacity-0 h-[250px] lg:min-h-[375px] lg:h-auto"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                <div className="h-full transform transition duration-300 ease-in-out hover:scale-105">
                  <img
                    src="https://images.wsj.net/im-880822/?width=1278&size=1"
                    alt="Big Article Image"
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute inset-0 px-4 py-6 text-white flex flex-col justify-between lg:py-4 lg:px-8 z-10">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-bebas uppercase text-sm tracking-widest leading-6 whitespace-nowrap flex-shrink-0 sm:text-base md:text-lg lg:text-xl">
                        Article
                      </h4>
                      <div
                        className="h-px w-full bg-white relative"
                        style={{ top: "-1px" }}
                      ></div>
                    </div>
                    <h3 className="font-bebas uppercase text-xl tracking-wide leading-6 max-w-306px lg:max-w-none  sm:text-lg md:text-xl lg:text-2xl">
                      Big Article Title
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-span-4">
                <div className="h-full transform transition duration-300 ease-in-out hover:scale-105">
                  <img
                    src="https://cdn.nba.com/teams/legacy/www.nba.com/bulls/sites/bulls/files/ss_3pt_lavine_0.jpg"
                    alt="Small Article 1 Image"
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute inset-0 px-4 py-6 text-white flex flex-col justify-between lg:py-4 lg:px-8 z-10">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-bebas uppercase text-sm tracking-widest leading-6 whitespace-nowrap flex-shrink-0 sm:text-base md:text-lg lg:text-xl">
                        Article
                      </h4>
                      <div
                        className="h-px w-full bg-white relative"
                        style={{ top: "-1px" }}
                      ></div>
                    </div>
                    <h3 className="font-bebas uppercase text-xl tracking-wide leading-6 max-w-306px lg:max-w-none sm:text-lg md:text-xl lg:text-2xl">
                      Small Article 1 Title
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2">
                <div className="h-full transform transition duration-300 ease-in-out hover:scale-105">
                  <img
                    src="https://thetournament.com/wp-content/uploads/2023/08/Screenshot-2023-08-01-at-5.59.00-PM.png"
                    alt="Small Article 2 Image"
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute inset-0 px-4 py-6 text-white flex flex-col justify-between lg:py-4 lg:px-8 z-10">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-bebas uppercase text-sm tracking-widest leading-6 whitespace-nowrap flex-shrink-0 sm:text-base md:text-lg lg:text-xl">
                        Article
                      </h4>
                      <div
                        className="h-px w-full bg-white relative"
                        style={{ top: "-1px" }}
                      ></div>
                    </div>
                    <h3 className="font-bebas uppercase text-xl tracking-wide leading-6 max-w-306px lg:max-w-none  sm:text-lg md:text-xl lg:text-2xl">
                      Small Article 2 Title
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2">
                <div className="h-full transform transition duration-300 ease-in-out hover:scale-105">
                  <img
                    src="https://thetournament.com/wp-content/uploads/2023/08/DSC03768-scaled.jpg"
                    alt="Small Article 3 Image"
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute inset-0 px-4 py-6 text-white flex flex-col justify-between lg:py-4 lg:px-8 z-10">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-bebas uppercase text-sm tracking-widest leading-6 whitespace-nowrap flex-shrink-0 sm:text-base md:text-lg lg:text-xl">
                        Article
                      </h4>
                      <div
                        className="h-px w-full bg-white relative"
                        style={{ top: "-1px" }}
                      ></div>
                    </div>
                    <h3 className="font-bebas uppercase text-xl tracking-wide leading-6 max-w-306px lg:max-w-none lg:text-2xl sm:text-lg md:text-xl">
                      Small Article 3 Title
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
