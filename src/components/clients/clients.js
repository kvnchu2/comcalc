import React from 'react';
import { useState, useEffect } from 'react';
import "./clients.css"
import Navbar from "../nav/navbar.js";
import axios from 'axios';
import ClientsTable from "./clientsTable";

export default function Clients() {
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchProvider, setSearchProvider] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [clients, setClients] = useState([]);

  const onSubmitHandler = () => {
    axios.post("https://travel-calculator-server.herokuapp.com/client/new", {"name": searchName, "address": searchAddress, "provider": searchProvider, "end_date": searchEndDate})
      .then((result) => {
        console.log(result);
        setSearchName("");
        setSearchAddress("");
        setSearchProvider("");
        setSearchEndDate("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onDeleteHandler = (client) => {
    axios.post("https://travel-calculator-server.herokuapp.com/client/delete", {"id": client.id})
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("delete-error", error);
      })
  }

  useEffect(() => {
    axios.get("https://travel-calculator-server.herokuapp.com/client/all")
      .then((result) => {
        setClients(result.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const allClients = clients.map((client) => {
    return (
      <>
        <p>{client.name}</p>
        <p>{client.address}</p>
        <p>{client.provider}</p>
        <p>{client.end_date}</p>
        <button onClick={() => onDeleteHandler(client)}>Delete</button>
      </>
    )
  })

  return (
    <>
      <Navbar></Navbar>
      <div id="clients-container">
      <form id="client-search-form" autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={searchName}
          onChange={event => {
            setSearchName(event.target.value);
          }}
          class="form-elements"
        />
        <input
          name="name"
          type="text"
          placeholder="Address"
          value={searchAddress}
          onChange={event => {
            setSearchAddress(event.target.value);
          }}
          class="form-elements"
        />
        <input
          name="name"
          type="text"
          placeholder="Provider"
          value={searchProvider}
          onChange={event => {
            setSearchProvider(event.target.value);
          }}
          class="form-elements"
        />
        <input
          name="name"
          type="text"
          placeholder="End Date"
          value={searchEndDate}
          onChange={event => {
            setSearchEndDate(event.target.value);
          }}
          class="form-elements"
        />
        <button onClick={onSubmitHandler} class="form-elements">Add Client</button>
      </form>
      <ClientsTable clients={clients} onDeleteHandler={onDeleteHandler}></ClientsTable>
      </div>
    </>
  );
}