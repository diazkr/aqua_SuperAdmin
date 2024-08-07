"use client";

import React, { useEffect, useState } from "react";
import { Button, CircularProgress, List, ListItem, TextField, Typography } from "@mui/material";
import { buscarHabitacionPorNumero, obtenerHabitaciones } from "@/callBack/habitaciones/HabitacionesFetch";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import { BsSearch } from "react-icons/bs";
import ErrorMessage from "../EditHabitacion/ErrorMessage";
import CardHabitacionEstado from "./CardHabitacionEstado";

const ListaHabitacionesEstado: React.FC = () => {
  const [rooms, setRooms] = useState<Habitacion[]>([]);
  const [search, setSearch] = useState("");
  const [roomByNumber, setRoomByNumber] = useState<Habitacion | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    setLoading(true);
    const roomsData = await obtenerHabitaciones();
    setRooms(roomsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    if (search) {
      const roomData = await buscarHabitacionPorNumero(parseInt(search));
      if (roomData) {
        setRoomByNumber(roomData);
      } else {
        setRoomByNumber(null);
      }
    } else {
      const roomsData = await obtenerHabitaciones();
      setRooms(roomsData);
      setRoomByNumber(null);
    }
    setLoading(false);
  };

  const handleStateChange = () => {
    fetchRooms();
  };

  return (
    <div className="flex flex-col justify-around h-full w-full">
      <div className="bg-light-white flex shadow-eco rounded-md p-6 w-[100%] gap-4">
        <TextField
          label="Buscar habitación por número"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          endIcon={<BsSearch />}
          className="px-12"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <div className="h-52 flex justify-center items-center">
        <CircularProgress color="primary" />
      </div>
      ) : roomByNumber ? (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%]  my-3 ">
          <ListItem>
            <CardHabitacionEstado habitacion={roomByNumber} onStateChange={handleStateChange} />
          </ListItem>
        </List>
      ) : rooms.length === 0 ? (
        <ErrorMessage />
      ) : (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-3 h-[70vh] overflow-y-auto">
          {rooms.map((room) => (
            <ListItem key={room.id}>
              <CardHabitacionEstado habitacion={room} onStateChange={handleStateChange} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListaHabitacionesEstado;
