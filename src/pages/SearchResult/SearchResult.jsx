import React, { useEffect, useState, useContext } from "react";
import "./SearchResult.css";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import currentLocationIcon from "../../img/currentLocationIcon.svg";
// import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import { Nav } from "../../components/Nav/Nav";
import { SearchContext } from "../../context/searchContext";

import { ResponseContext } from "../../context/responseContext";

import city from "../../resources/states.json";

import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Stack,
  Container,
  Autocomplete,
  TextField,
  createFilterOptions,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterResultsNav from "../../components/FilterResultsNav/FilterResultsNav";
import noResultsIllus1 from "../../resources/images/noResultsIllus1.svg";

import { LoginContext } from "../../context/loginContext";
import { UserContext } from "../../context/userContext";
import { Redirect } from "react-router-dom";
/*
<div>
          < Redirect to="/" />
          {setLoginDialogOpen(true)}
        </div>
*/
function SearchResult() {
  const [user] = useContext(UserContext);
  const { loginDialog } = useContext(LoginContext);
  // eslint-disable-next-line
  const [loginDialogOpen, setLoginDialogOpen] = loginDialog;

  // eslint-disable-next-line
  const [search, setSearch] = useContext(SearchContext);
  const {
    responseContext,
    //scrollContext, scrollResponseContext
  } = useContext(ResponseContext);
  const [response] = responseContext;
  // const [scroll, setScroll] = scrollContext;
  // const [scrollResponse, setScrollResponse] = scrollResponseContext;
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [time, setTime] = useState("Any");
  const [mode, setMode] = useState("Any");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 6))
  );

  //+++
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [skeletonCount, setSkeletonCount] = useState(6);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [showFilterNav, setShowFilterNav] = useState(false);

  const handleFilterClick = () => {
    // console.log("clicked");
    setShowFilterNav(true);
  };

  // useEffect(() => {
  //   console.log("startDate", startDate, startDate.getTime())
  //   console.log("endDate", endDate, endDate.getTime())
  // }, [startDate, endDate]);

  //loading
  useEffect(() => {
    if (response) {
      setFilteredResponse(response);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    let x = [];
    let y = [];
    let z = [];
    let g = [];
    let h = [];

    x = response.filter(
      (response) =>
        new Date(response.props.date) >= new Date(startDate) &&
        new Date(response.props.date) <= new Date(endDate)
    );

    // x = response.filter((eachResponse) => {
    //   console.log("prop:", new Date(eachResponse.props.date), new Date(eachResponse.props.date).getDate())
    //   console.log("start:", new Date(startDate), new Date(startDate).getDate())
    //   console.log("end:", new Date(endDate), new Date(startDate).getDate())

    //   let dayCheck =
    //     (new Date(eachResponse.props.date).getDate() >=
    //       new Date(startDate).getDate() && new Date(eachResponse.props.date).getDate() <=
    //       new Date(endDate).getDate());
    //   let monthCheck =
    //     (new Date(eachResponse.props.date).getMonth() >=
    //       new Date(startDate).getMonth() && new Date(eachResponse.props.date).getMonth() <=
    //       new Date(endDate).getMonth());
    //   let yearCheck =
    //     (new Date(eachResponse.props.date).getYear() >=
    //       new Date(startDate).getYear() && new Date(eachResponse.props.date).getYear() <=
    //       new Date(endDate).getYear());

    //   return dayCheck && monthCheck && yearCheck;
    // });

    if (currentCity !== "" && x.length) {
      if (z.length === 0)
        y = x.filter((response) =>
          response.props.currentCity.includes(currentCity)
        );
      else
        y = z.filter((response) =>
          response.props.currentCity.includes(currentCity)
        );
    } else {
      y = [];
    }

    if (destinationCity !== "" && y.length) {
      if (y.length === 0) {
        z = x.filter((response) =>
          response.props.destinationCity.includes(destinationCity)
        );
      } else {
        z = y.filter((response) =>
          response.props.destinationCity.includes(destinationCity)
        );
      }
    } else {
      z = [];
    }

    if (time && time !== "Any") {
      if (z.length) {
        g = z.filter((response) => response.props.time === time);
      } else if (y.length) {
        g = y.filter((response) => response.props.time === time);
      } else if (x.length) {
        g = x.filter((response) => response.props.time === time);
      }
    } else {
      g = [];
    }

    if (mode && mode !== "Any") {
      if (g.length) {
        h = g.filter((response) => response.props.mode === mode);
      } else if (z.length) {
        h = z.filter((response) => response.props.mode === mode);
      } else if (y.length) {
        h = y.filter((response) => response.props.mode === mode);
      } else if (x.length) {
        h = x.filter((response) => response.props.mode === mode);
      }
    } else {
      h = [];
    }

    h.length
      ? setFilteredResponse(h)
      : g.length
        ? setFilteredResponse(g)
        : z.length
          ? setFilteredResponse(z)
          : y.length
            ? setFilteredResponse(y)
            : x.length
              ? setFilteredResponse(x)
              : setFilteredResponse([]);
  }, [startDate, endDate, currentCity, destinationCity, time, mode, response]);

  useEffect(() => {
    setCurrentCity(search.currentCity);
    setDestinationCity(search.destinationCity);
    setStartDate(search.startDate);
    setEndDate(search.endDate);
    // eslint-disable-next-line
  }, []);

  const OPTIONS_LIMIT = 3;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        transform: "translate(34px, 20px) scale(1);",
      },
    },
    inputRoot: {
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
        // Default left padding is 6px
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      '&[class*="MuiOutlinedInput-root"]': {
        // Default left padding is 6px

        backgroundColor: "white",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Box>
      <Container maxwidth="lg">
        <Nav />
        <div className="search__results">
          <h2 className="title">
            Search Results
            <span className="filter-icon-container">
              <FilterAltIcon
                sx={{ fontSize: 20 }}
                className="filter-icon"
                onClick={() => handleFilterClick()}
              />
              <span className="filter-text">Filter</span>
            </span>
          </h2>
          {!user.authorized ? (
            <div>
              <Redirect to="/" />
              {setLoginDialogOpen(true)}
            </div>
          ) : (
            <div className="container">
              {showFilterNav ? (
                <FilterResultsNav
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  currentCity={currentCity}
                  setCurrentCity={setCurrentCity}
                  destinationCity={destinationCity}
                  setDestinationCity={setDestinationCity}
                  time={time}
                  setTime={setTime}
                  mode={mode}
                  setMode={setMode}
                  showFilterNav={showFilterNav}
                  setShowFilterNav={setShowFilterNav}
                />
              ) : null}

              <div className="filter__results">
                <p className="secondary__title">Filter Results</p>
                <div>
                  <h1 className="tertiary__title">Date</h1>
                  <div className="row">
                    From
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                      minDate={new Date()}
                      dateFormat="dd-MMM-yyyy"
                      className="input"
                    />
                  </div>

                  <div className="row">
                    To
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={new Date()}
                      dateFormat="dd-MMM-yyyy"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="tertiary__title">Location</h1>
                  <div className="row">
                    <span className="pd-r">From</span>
                    <Autocomplete
                      classes={classes}
                      value={currentCity}
                      filterOptions={filterOptions}
                      id="country-select-demo"
                      sx={{ width: "140px" }}
                      options={city}
                      autoHighlight
                      disableClearable
                      freeSolo
                      getOptionLabel={(option) => option.name || currentCity}
                      onChange={(event, value) => {
                        // console.log(value);
                        let selectedCity = value.name.concat(", ", value.state);
                        setCurrentCity(selectedCity);
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}, {option.state}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Location"
                          // label="Enter Location"
                          //logic to update state when city is not in list
                          onChange={(event, value) => {
                            setCurrentCity(event.target.value);
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",

                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     <IconButton edge="start">
                            //       <img src={currentLocationIcon} alt={"logo"} />
                            //     </IconButton>
                            //   </InputAdornment>
                            // ),
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="row">
                    <span className="pd-r">To</span>
                    <Autocomplete
                      classes={classes}
                      filterOptions={filterOptions}
                      value={destinationCity}
                      id="country-select-demo"
                      sx={{ width: "140px" }}
                      options={city}
                      autoHighlight
                      disableClearable
                      freeSolo
                      getOptionLabel={(option) =>
                        option.name || destinationCity
                      }
                      onChange={(event, value) => {
                        // console.log(value);
                        let selectedCity = value.name.concat(", ", value.state);
                        setDestinationCity(selectedCity);
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}, {option.state}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Location"
                          //logic to update state when city is not in list
                          onChange={(event, value) => {
                            setDestinationCity(event.target.value);
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",
                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     <IconButton edge="start">
                            //       <img src={currentLocationIcon} alt={"logo"} />
                            //     </IconButton>
                            //   </InputAdornment>
                            // ),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="bottom-con">
                  <h1 className="tertiary__title pd-b ">Time</h1>
                  <div className="row">
                    <select
                      name="time"
                      required
                      defaultValue={time}
                      onChange={(time) => setTime(time.target.value)}
                      className="input"
                    >
                      <option value="Any">Any</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                </div>

                <div className="bottom-con">
                  <h1 className="tertiary__title pd-b ">Mode</h1>
                  <div className="row">
                    <select
                      name="mode"
                      required
                      defaultValue={mode}
                      onChange={(mode) => setMode(mode.target.value)}
                      className="input"
                    >
                      <option value="Any">Any</option>
                      <option value="Personal Car">Personal Car</option>
                      <option value="Cab">Cab</option>
                      <option value="Train">Train</option>
                      <option value="Bus">Bus</option>
                      <option value="Flight">Flight</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="results">
                {loading ? (
                  <SkeletonLoader skeletonCount={skeletonCount} />
                ) : filteredResponse.length === 0 ? (
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack direction="column" alignItems="center" width="80%">
                      <Box sx={{ height: "240px", opacity: "0.7" }}>
                        <img src={noResultsIllus1} alt="No Results!" />
                      </Box>
                      <Typography>No Result Found</Typography>
                    </Stack>
                  </Box>
                ) : (
                  filteredResponse
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Box>
  );
}

export default SearchResult;
