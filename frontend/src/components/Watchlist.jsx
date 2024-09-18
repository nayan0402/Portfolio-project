import React, { useState } from 'react';

// Function to fetch token details without graph data
const fetchTokenDetails = async (tokenId) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenId}`);
    const data = await response.json();

    // Check if CoinGecko has returned a valid response
    if (response.status === 429) {
      console.warn('Rate limit exceeded, throttling requests.');
      return 'Rate Limited, Try Later';
    }

    const tokenData = data[0] || {};

    return {
      price: tokenData.current_price || 'Price not available',
      change1d: tokenData.price_change_percentage_24h || '--',
      change7d: tokenData.price_change_percentage_7d || '--',
      volume: tokenData.total_volume || '--',
      image: tokenData.image, // Image URL of the token
    };
  } catch (error) {
    console.error('Error fetching token details:', error);
    return 'Error';
  }
};

// Function to fetch token suggestions from CoinGecko
const fetchTokenSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const data = await response.json();
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
    const details = await fetchTokenDetails(token.id);
    setWatchlist([...watchlist, { ...details, name: token.name, id: token.id, symbol: token.symbol }]);
    setTokenInput(''); // Clear input after adding
    setSuggestions([]); // Clear suggestions after adding
  };

  // Function to handle token input change and fetch suggestions
  const handleTokenInputChange = async (e) => {
    const value = e.target.value;
    setTokenInput(value);

    if (value) {
      const tokenSuggestions = await fetchTokenSuggestions(value);
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
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
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

          {/* Display the watchlist or message when empty */}
          <div className="w-full">
            {watchlist.length === 0 ? (
              <div className="flex justify-center items-center h-20">
                <h2 className="text-2xl sm:text-3xl text-white text-gradient py-1 mb-6">
                  Watchlist is empty! Please add tokens
                </h2>
              </div>
            ) : (
              <table className="min-w-full bg-gray-800 text-white rounded-md shadow-md">
                <thead>
                  <tr className="text-left">
                    <th className="p-4">Token</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">1d %</th>
                    <th className="p-4">7d %</th>
                    <th className="p-4">Volume (24h)</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((token, index) => (
                    <tr key={index} className="bg-gray-700 hover:bg-gray-600">
                      <td className="p-4 flex items-center">
                        <img src={token.image} alt={token.symbol} className="w-6 h-6 mr-2" />
                        <span>{token.name} ({token.symbol.toUpperCase()})</span>
                      </td>
                      <td className="p-4">${token.price}</td>
                      <td className="p-4">{token.change1d}%</td>
                      <td className="p-4">{token.change7d}%</td>
                      <td className="p-4">${token.volume}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveToken(token.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
