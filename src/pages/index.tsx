export default function Home() {
  // Replace these placeholders with actual data for the live NBA match and top news
  const liveNBAMatch = {
    id: 12830,
    homeTeam: {
      name: "Brooklyn Nets",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png",
    },
    visitorTeam: {
      name: "Orlando Magic",
      logo: "https://upload.wikimedia.org/wikipedia/fr/b/bd/Orlando_Magic_logo_2010.png",
    },
    date: "2023-12-03",
    time: "00:00",
    status: "Finished",
    arena: {
      name: "Barclays Center",
      city: "Brooklyn",
      state: "NY",
    },
    scores: {
      visitors: {
        points: 101,
      },
      home: {
        points: 129,
      },
    },
  };

  return (
    <div>
      <header className="bg-red-700 py-4 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
          <div>
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </div>
          <nav className="flex items-center space-x-4 ">
            <button className="text-white hover:text-red-300 font-semibold">
              NBA
            </button>
            <button className="text-white hover:text-red-300 font-semibold">
              Premier League
            </button>
          </nav>
        </div>
      </header>

      <section className="px-6 md:px-36 py-10 md:py-26 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-red-700">
          {/* Top Left: Live NBA Match Or Main Event */}
          <div className="col-span-2 md:col-span-2 bg-white p-8 rounded-md shadow-md relative">
            <div className="flex justify-evenly mt-6">
              <p className="text-black mb-2 font-bold text-xl hidden sm:block">
                {liveNBAMatch.homeTeam.name}
              </p>
              <img
                src={liveNBAMatch.homeTeam.logo}
                alt={liveNBAMatch.homeTeam.name}
                className="h-12"
              />

              <div className="flex flex-col items-center mt-2">
                <p> Sun </p>
                <p className="text-black mb-2 text-center font-bold text-sm">
                  {liveNBAMatch.time}
                </p>
                <p className="text-gray-600 mt-6 text-center text-lg">
                  {liveNBAMatch.arena.name}, {liveNBAMatch.arena.city}
                </p>
              </div>

              <img
                src={liveNBAMatch.visitorTeam.logo}
                alt={liveNBAMatch.visitorTeam.name}
                className="h-12"
              />
              <p className="text-black mb-2 font-bold text-xl text-right hidden sm:block">
                {liveNBAMatch.visitorTeam.name}
              </p>
            </div>
            <span className="absolute top-2 right-2">
              <span className="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded border border-red-500">
                Season {new Date(liveNBAMatch.date).getFullYear()} -{" "}
                {new Date(liveNBAMatch.date).getFullYear() - 1999}
              </span>
            </span>
          </div>

          {/* Top Right: Top News About NBA */}
          <div className="col-span-2 lg:col-span-1 p-4 rounded-md shadow-md bg-pink-50 flex flex-col">
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

          {/* Bottom Left: Container of Cards for Other Matches */}
          <div className="col-span-2 bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Upcoming Matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex justify-between">
                  <div className="relative flex">
                    <div className="rounded-full w-10 h-10 border flex items-center justify-center">
                      <img
                        src={liveNBAMatch.visitorTeam.logo}
                        alt={liveNBAMatch.visitorTeam.name}
                        className="h-5"
                      />
                    </div>
                    <div className="rounded-full w-10 h-10 border flex items-center justify-center absolute ml-8 bg-white">
                      <img
                        src={liveNBAMatch.visitorTeam.logo}
                        alt={liveNBAMatch.visitorTeam.name}
                        className="h-5"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded border border-red-500">
                      Friday, 10 Dec
                    </span>
                    <p className="font-bold text-lg text-right">09:00</p>
                  </div>
                </div>
                <div className="border my-2"></div>
                <div>
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <p className="text-black mb-2 font-bold text-md">
                        {liveNBAMatch.homeTeam.name}
                      </p>
                      <p className="text-black mb-2 font-light text-sm">
                        (15-4, 6-4, Away)
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-black mb-2 font-bold text-md">
                        {liveNBAMatch.homeTeam.name}
                      </p>
                      <p className="text-black mb-2 font-light text-sm">
                        (15-4, 6-4, Away)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Custom Content</h3>
            <p className="text-gray-600">Add your content here.</p>
          </div>
        </div>
      </section>

      <footer className="bg-red-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <img src="/logo.svg" alt="Logo" className="h-8 mr-2" />
            <p className="text-xl font-semibold">Tailoring Sport Investment</p>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              About Us
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </div>

          <div className="mt-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Tailoring Sport Investment. All
              rights reserved.
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
