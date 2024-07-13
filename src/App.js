import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const results = response.data.results;

      const detailedPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );

      setPokemon(detailedPokemon);
    };

    fetchPokemon();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
};

export default App;
