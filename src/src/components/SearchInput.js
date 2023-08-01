import React from "react";
import {useSearch} from "../Context/SearchContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.get(`/api/user/search/${search.keyword}`);
      setSearch({...search, results: data});
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control shadow-none border-0 rounded-0 me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => setSearch({...search, keyword: e.target.value})}
        />
        <button className="btn btn-outline-info  rounded-0" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchInput;
