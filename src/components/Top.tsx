import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  Box,
  Paper,
  Button,
  ButtonGroup,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import BackImage from "../assets/nav.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { Cities } from "../data/Cities";
import { ICity } from "../interfaces/City";

const NavStyles = {
  display: "flex",
  justifyContent: "space-between",
  backgroundImage: `url(${BackImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: 350,
  padding: 20,
  fontSize: 17,
  color: "#fff",
};

const IconStyles = {
  fontSize: 30,
  cursor: "pointer",
};

const SearchStyles = {
  top: 90,
  color: "#fff",
  fontSize: 30,
  margin: 15,
  width: "95%",
};

const SearchPaperStyles = {
  padding: 10,
};

const SearchVuelo = {
  padding: 7,
};

const InfoInputs = {
  display: "flex",
  justifyContent: "space-evenly",
  padding: 15,
};

const DoubleSelect = {
  display: "flex",
  gap: 8,
};

export const Top = () => {
  const [fechaIda, setFechaIda] = useState<Dayjs | null>(null);
  const [fechaVuelta, setFechaVuelta] = useState<Dayjs | null>(null);
  const [origen, setOrigen] = useState<String>('');
  const [destino, setDestino] = useState<String>('');
  const handleOrigenChange = (event: SelectChangeEvent) => {
    setOrigen(event.target.value as string);
  };
  const handleDestinoChange = (event: SelectChangeEvent) => {
    setDestino(event.target.value as string);
  };
  const [ciudades, setCiudades] = useState<ICity[]>();
  useEffect(() => {
    setCiudades(Cities);
  });
  return (
    <Box sx={{ position: "relative" }}>
      <Box style={NavStyles}>
        <h1>AVIATUR</h1>
        <Box>
          <SearchSharpIcon style={IconStyles} />
          <PersonOutlineOutlinedIcon style={IconStyles} />
        </Box>
      </Box>
      <Box sx={{ position: "absolute" }} style={SearchStyles}>
        <h2>
          Descubra nuevos <br /> destinos
        </h2>
        <Paper sx={{ position: "relative", mt: 6 }}>
          <ButtonGroup
            sx={{ position: "absolute", bottom: 138 }}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button startIcon={<FlightTakeoffIcon />}>Vuelos</Button>
            <Button startIcon={<ApartmentIcon />}>Hotel</Button>
            <Button startIcon={<DirectionsCarIcon />}>Autos</Button>
          </ButtonGroup>
          <Box style={SearchVuelo}>
            <FormControlLabel control={<Checkbox />} label="Ida y vuelta" />
            <FormControlLabel control={<Checkbox />} label="Solo ida" />
            <FormControlLabel control={<Checkbox />} label="Multidestino" />
          </Box>
          <Box style={InfoInputs}>
            <Box style={DoubleSelect}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="origin">Origen</InputLabel>
                <Select labelId="origin" id="origin" label="origin" onChange={handleOrigenChange}>
                  {ciudades?.map((ciudad: ICity) => {
                    return (
                      <MenuItem value={`${ciudad.code_city}`}>
                        {`${ciudad.name_city}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="destiny">Destino</InputLabel>
                <Select labelId="destiny" id="destiny" label="Destino" onChange={handleDestinoChange}>
                {ciudades?.map((ciudad: ICity) => {
                    return (
                      <MenuItem value={`${ciudad.code_city}`}>
                        {`${ciudad.name_city}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box style={DoubleSelect}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Ida"
                  value={fechaIda}
                  onChange={(newValue) => {
                    setFechaIda(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Vuelta"
                  value={fechaVuelta}
                  onChange={(newValue) => {
                    setFechaVuelta(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Button variant="contained">Buscar</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
