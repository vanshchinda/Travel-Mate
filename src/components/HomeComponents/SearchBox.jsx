import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomeComponents.css";

// import locationIcon from "../../resources/icons/locationIcon.svg";
// import currentLocationIcon from "../../img/currentLocationIcon.svg";
// import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
// import dateIcon from "../../resources/icons/dateIcon.svg";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchContext } from "../../context/searchContext";
import city from "../../resources/states.json";

import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Stack,
  Button,
  Typography,
  FormControl,
  TextField,
  createFilterOptions,
  Autocomplete,
} from "@mui/material";

import DatePicker from "@mui/lab/DatePicker";

export function SearchBox() {
  const [search, setSearch] = useContext(SearchContext);
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
        borderColor: "transparent",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "blue",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        backgroundColor: "#DFDFF0",
        borderRadius: "10px",
        width: "fit-content",
        height: "fit-content",
        padding: "1rem",
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: {
          xs: "80vw",
          sm: "70vw",
          md: "0px",
        },
      }}
    >
      <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
        <FormControl variant="outlined" sx={{ zIndex: "1" }}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
            alignItems={{
              xs: "flex-start",
              md: "flex-end",
            }}
            sx={{ flexWrap: "nowrap", width: "100%" }}
          >
            <Box className="location-container mr">
              <Typography class="subtitle1 location-subtitle">
                Traveling from
              </Typography>
              <Autocomplete
                classes={classes}
                value={search.currentCity}
                filterOptions={filterOptions}
                id="country-select-demo"
                sx={{
                  width: {
                    xs: "90%",
                    sm: "60%",
                    md: "160px",
                  },
                }}
                options={city}
                autoHighlight
                disableClearable
                freeSolo
                getOptionLabel={(option) => option.name || search.currentCity}
                onChange={(event, value) => {
                  // console.log(value);
                  let selectedCity = value.name.concat(", ", value.state);
                  setSearch((prev) => {
                    return {
                      ...prev,
                      currentCity: selectedCity,
                    };
                  });
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
                    size="small"
                    {...params}
                    // label="Enter Location"
                    placeholder="Enter Location"
                    //logic to update state when city is not in list
                    onChange={(event, value) => {
                      setSearch((prev) => {
                        return {
                          ...prev,
                          currentCity: event.target.value,
                        };
                      });
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
            </Box>

            <Box className="location-container mr">
              <Typography class="subtitle1 location-subtitle">
                Destination
              </Typography>
              <Autocomplete
                classes={classes}
                value={search.destinationCity}
                filterOptions={filterOptions}
                id="country-select-demo"
                sx={{
                  width: {
                    xs: "90%",
                    sm: "60%",
                    md: "160px",
                  },
                }}
                options={city}
                autoHighlight
                disableClearable
                freeSolo
                getOptionLabel={(option) =>
                  option.name || search.destinationCity
                }
                onChange={(event, value) => {
                  let selectedCity = value.name.concat(", ", value.state);
                  setSearch((prev) => {
                    return {
                      ...prev,
                      destinationCity: selectedCity,
                    };
                  });
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
                    size="small"
                    {...params}
                    placeholder="Enter Location"
                    // label="Enter Location"
                    //logic to update state when city is not in list
                    onChange={(event, value) => {
                      setSearch((prev) => {
                        return {
                          ...prev,
                          destinationCity: event.target.value,
                        };
                      });
                    }}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "off",
                      // startAdornment: (
                      //   <InputAdornment position="start">
                      //     <IconButton edge="start">
                      //       <img src={destinationLocationIcon} alt={"logo"} />
                      //     </IconButton>
                      //   </InputAdornment>
                      // ),
                    }}
                  />
                )}
              />
            </Box>

            <Box className="mr" sx={{ width: "100%" }}>
              <Typography class="subtitle1">Date of Travel</Typography>
              {/* <TextField
                size="small"
                placeholder="DD-MM-YYYY"
                sx={{
                  width: "160px",
                  backgroundColor: "white",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <img src={dateIcon} alt={"logo"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}


              <DatePicker
                openTo="day"
                views={["month", "day"]}
                value={search.startDate}
                minDate={new Date()}
                onChange={(newValue) => {
                  setSearch((prev) => {
                    return {
                      ...prev,
                      startDate: newValue
                    };
                  });
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    // placeholder="DD-MM-YYYY"
                    sx={{
                      width: {
                        xs: "90%",
                        sm: "60%",
                        md: "160px",
                      },
                      height: "40px",
                      backgroundColor: "white",
                    }}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton edge="start">
                  //         <img src={dateIcon} alt={"logo"} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  />
                )}
              />
            </Box>
            <Box className="pd-b">
              <Link to="/search">
                <Button
                  variant="contained"
                  startIcon={<SearchOutlinedIcon />}
                  sx={{
                    backgroundColor: "#001963",
                    "&:hover": {
                      backgroundColor: "#062580",
                    },
                    height: "40px",
                    width: "150px",
                  }}
                >
                  Search
                </Button>
              </Link>
            </Box>
          </Stack>
        </FormControl>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography class="redText" component={Link} to="/addRequest">
            Add request
          </Typography>
          <Typography
            class="redText"
            component={Link}
            to="/#"
            onClick={() =>
              (window.location = "mailto:vitrendstechnical@gmail.com")
            }
          >
            <u>Help?</u>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
