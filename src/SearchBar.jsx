import React, { useState } from "react";

const SearchBar = ({ data }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [randomAddress, setRandomAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);
  const uniqueLocations = [...new Set(data.map((item) => item.location))];

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // Filter the data based on the query
    const filteredResults = data.filter((item) =>
      item.address.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredResults);

    // Show dropdown if there are filtered results and query is not empty
    setShowDropdown(filteredResults.length > 0 && inputValue !== "");
  };

  const handleSuggestionClick = (address) => {
    setQuery(address);
    setShowDropdown(false);
  };

  const handleBlitzClick = () => {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * data.length);
    // Get the random address
    const randomAddress = data[randomIndex].address;
    // Set the random address to display
    setRandomAddress(randomAddress);
    // Reset previous guesses
    setSelectedLocation("");
    setIsGuessCorrect(null);
    // Show the modal
    setShowModal(true);
  };

  const handleLocationGuess = (location) => {
    // Check if the guessed location matches the actual location
    const isCorrect =
      data.find((item) => item.address === randomAddress)?.location ===
      location;
    setIsGuessCorrect(isCorrect);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed top-10 left-0 right-0 flex justify-center">
      <div className="relative w-full max-w-lg flex">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(query !== "")}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          className="block w-full px-4 py-3 leading-tight text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
        />
        <button
          className="px-4 py-3 text-sm font-medium text-white bg-blue-500 rounded-md ml-2"
          onClick={handleBlitzClick}
        >
          Blitz
        </button>
      </div>
      {showDropdown && (
        <ul className="absolute z-10 w-full max-w-lg mt-10 bg-white rounded-md shadow-md">
          {results.map((item) => (
            <li
              key={item.address}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center shadow hover:shadow-lg"
              onClick={() => handleSuggestionClick(item.address)}
            >
              <span className="text-gray-700">{item.address}</span>
              <span className="text-amber-500 text-lg font-bold">
                {item.location}
              </span>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-md p-6">
            <div className="text-xl font-semibold mb-4">
              Guess the Location for:
            </div>
            <button
              onClick={handleBlitzClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Reset
            </button>
            <div className="text-gray-800 mb-4 font-bold text-lg">
              {randomAddress}
            </div>
            <div className="text-xl font-semibold mb-2">Options:</div>
            {uniqueLocations.map((location) => (
              <button
                key={location}
                className={`px-4 py-2 rounded-md border border-gray-300 mr-2 mb-2 ${
                  selectedLocation === location ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleLocationGuess(location)}
              >
                {location}
              </button>
            ))}
            {isGuessCorrect !== null && (
              <div
                className={
                  isGuessCorrect
                    ? "mt-4 text-lg font-semibold text-lime-400"
                    : "mt-4 text-lg font-semibold text-red-400"
                }
              >
                {isGuessCorrect ? "TACNO!" : "NETACNO!"}
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
