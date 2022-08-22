import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import currentLocationIcon from "../../img/currentLocationIcon.svg";
// import destinationLocationIcon from "../../img/destinationLocationIcon.svg";

import CloseIcon from "@mui/icons-material/Close";
import "./FilterResultsNav.css";

import city from "../../resources/states.json";

import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";

const FilterResultsNav = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  currentCity,
  setCurrentCity,
  destinationCity,
  setDestinationCity,
  showFilterNav,
  time,
  setTime,
  mode,
  setMode,
  setShowFilterNav,
}) => {
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
    <div className="overlay">
      <div className="filter__results_nav ">
        <p className="secondary__title">
          Filter Results
          <span>
            <CloseIcon
              className="close-icon"
              onClick={() => {
                setShowFilterNav(false);
              }}
            />
          </span>
        </p>
        <div>
          <h1 className="tertiary__title">Date</h1>
          <div className="row">
            From
            <DatePicker
              selected={startDate} //
              onChange={(date) => {
                setStartDate(date);
              }} //
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
              getOptionLabel={(option) => option.name || destinationCity}
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

        <div className="row-flex">
          <h1 className="tertiary__title">Time</h1>
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

        <div className="row-flex">
          <h1 className="tertiary__title">Mode</h1>
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
        {/* <Button onClick={() => setShowFilterNav(false)}>Show Results</Button> */}
      </div>
    </div>
  );
};

export default FilterResultsNav;
