import React, { useState, createContext, useEffect } from "react";

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [search, setSearch] = useState({
    currentCity: "",
    destinationCity: "",
    startDate: new Date(new Date().setHours(0, 0, 0)),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
  });

  useEffect(() => {
    setSearch((prev) => {
      return {
        ...prev,
        endDate: new Date(
          new Date(search.startDate).setMonth(new Date().getMonth() + 6)
        ),
      };
    });
  }, [search.startDate]);

  useEffect(() => {
    // console.log(search);
    // console.log("startDate", search.startDate, search.startDate.getTime())
    // console.log("endDate", search.endDate, search.endDate.getTime())
  }, [search]);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
