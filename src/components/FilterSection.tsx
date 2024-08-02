"use client";

import SearchBar from "@components/SearchBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FilterSection = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="mb-8">
      <div
        className="w-full text-primary flex items-center space-x-1 cursor-pointer"
        onClick={toggleFilterVisibility}
      >
        <h2>Filtrer les concours</h2>
        {isFilterVisible ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isFilterVisible ? <SearchBar /> : null}
    </div>
  );
};

export default FilterSection;
