import React, { useState, useEffect } from 'react';

// Function to fetch token prices from CoinGecko with rate limit handling
const fetchTokenPrice = async (tokenId) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);
    const data = await response.json();

    // Check if CoinGecko has returned a valid response or if we've been throttled
    if (response.status === 429) {
      console.warn('Rate limit exceeded, throttling requests.');
      return 'Rate Limited, Try Later';
    }

    return data[tokenId]?.usd || 'Price not available';
  } catch (error) {
    console.error('Error fetching token price:', error);
    return 'Error';
  }
};

// Function to fetch token suggestions from CoinGecko
const fetchTokenSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const data = await response.json();
    // Filter suggestions based on the query and limit to 5 results
    const filteredSuggestions = data.coins.filter(coin =>
      coin.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    return filteredSuggestions;
  } catch (error) {
    console.error('Error fetching token suggestions:', error);
    return [];
  }
};

const Watchlist = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Function to handle adding token to the watchlist
  const handleAddToken = async (token) => {
    const price = await fetchTokenPrice(token.id);
    setWatchlist([...watchlist, { name: token.name, price, id: token.id, symbol: token.symbol, market_cap: token.market_cap, volume: token.volume }]);
    setTokenInput(''); // Clear input after adding
    setSuggestions([]); // Clear suggestions after adding
  };

  // Function to handle token input change and fetch suggestions
  const handleTokenInputChange = async (e) => {
    const value = e.target.value;
    setTokenInput(value);

    if (value) {
      const tokenSuggestions = await fetchTokenSuggestions(value);
      // Only include tokens whose names contain the query string
      const filteredSuggestions = tokenSuggestions.filter(token => 
        token.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Function to remove a token from the watchlist
  const handleRemoveToken = (tokenId) => {
    const updatedWatchlist = watchlist.filter((token) => token.id !== tokenId);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-12 px-4 w-full">
        {/* Left section with text */}
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 mb-6">
            Watchlist
          </h1>

          {/* Token input and suggestions */}
          <div className="relative flex flex-col w-full max-w-lg mb-6">
            <input
              type="text"
              value={tokenInput}
              onChange={handleTokenInputChange}
              className="w-full px-3 py-3 rounded-md bg-gray-800 text-white border border-gray-700"
              placeholder="Enter token name (e.g., bitcoin)"
            />

            {/* Display suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full bg-gray-800 text-white rounded-md shadow-md mt-2 w-full max-w-lg z-10">
                {suggestions.map((token) => (
                  <li
                    key={token.id}
                    className="cursor-pointer hover:bg-gray-700 p-2"
                    onClick={() => handleAddToken(token)}
                  >
                    {token.name} ({token.symbol.toUpperCase()})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display the watchlist */}
          <ul className="w-full bg-gray-800 p-4 rounded-md shadow-md">
            {watchlist.map((token, index) => (
              <li key={index} className="flex flex-col bg-gray-700 p-4 rounded-md mb-4">
                <div className="flex justify-between text-white mb-2">
                  <span>
                    {token.name ? token.name.toUpperCase() : 'Unknown'} ({token.symbol ? token.symbol.toUpperCase() : 'N/A'}): ${token.price}
                  </span>
                  <button
                    onClick={() => handleRemoveToken(token.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-gray-400">
                  <p>Market Cap: ${token.market_cap || 'N/A'}</p>
                  <p>Volume (24h): ${token.volume || 'N/A'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
