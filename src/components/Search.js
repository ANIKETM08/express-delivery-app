import React from "react";
import {useSearch} from "../Context/SearchContext";
import Products from "./Products";

function Search() {
  const [search] = useSearch();
  return (
    <div className="container">
      <div className="row">
        <div className="text-center mt-5 row d-flex justify-content-center margin">
          <h1 className="mt-5">Search Results</h1>
          <h6>
            {search?.results.length < 1
              ? "No product found"
              : `Found ${search?.results.length}`}
          </h6>
          <div className="row justify-content-center mt-4" height="auto">
            {search?.results.map((item) => {
              return (
                <div className="col-md-3 p-3" key={item._id}>
                  <div>
                    <Products item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
