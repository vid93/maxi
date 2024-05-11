import { useState } from "react";
import data from "./base.js";
import "./App.css";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="container mt-10">
      <SearchBar data={data} />
    </div>
  );
}

export default App;
