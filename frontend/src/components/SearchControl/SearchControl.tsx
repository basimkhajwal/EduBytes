import React from "react";

const TOPICS = [
  "Quantum Theory",
  "Information Theory",
  "Algorithms",
  "Hypercube",
  "Machine Learning",
  "Euler's Theorem",
  "Complex Numbers",
  "Fractals",
];

interface SearchProps {
  onSearch: (query: string) => void;
  existingQuery?: string;
}

const SearchControl = (props: SearchProps) => {
  const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const searchPlaceholderMessage = "How about " + randomTopic + "?";

  const [searchInput, setSearchInput] = React.useState("");

  function doSearch() {
    props.onSearch(searchInput !== "" ? searchInput : randomTopic);
  }

  return (
    <div className="field is-grouped search-box">
      <p className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder={searchPlaceholderMessage}
          defaultValue={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              doSearch();
            }
          }}
        />
      </p>
      <p className="control">
        <button
          type="submit"
          className="button is-info"
          onClick={() => doSearch()}
        >
          Search
        </button>
      </p>
    </div>
  );
};

export default SearchControl;
