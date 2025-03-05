
import React from "react";
import AutoComplete from "./Components/AutoComplete"

function App() {
  
  const fetchSuggestions = async (query: string) => {
    const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
};
  return (
    <div>
      <h1>Search Recipes</h1>
      <AutoComplete
        placeholder="Enter Recipe"
        dataKey="name"
        fetchSuggestions={fetchSuggestions}
        loadingText="Loading Recipes.."
        noDataText="No recipes found "
        caching={true}
      />
    </div>
  )
}

export default App
