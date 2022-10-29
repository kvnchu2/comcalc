import React from 'react';
import { useState, useEffect } from 'react';
import "./clients.css"
import Navbar from "../../components/nav/navbar.js";
import axios from 'axios';
import ClientsTable from "../../components/clients/clientsTable";

export default function Clients() {
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchProvider, setSearchProvider] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [clients, setClients] = useState([]);

  const onSubmitHandler = () => {
    axios.post("https://travel-calculator-server-production.up.railway.app/client/new", {"name": searchName, "address": searchAddress, "provider": searchProvider, "end_date": searchEndDate, "start_date": searchStartDate})
      .then((result) => {
        console.log(result);
        setSearchName("");
        setSearchAddress("");
        setSearchProvider("");
        setSearchEndDate("");
        setSearchStartDate("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onDeleteHandler = (client) => {
    axios.post("https://travel-calculator-server-production.up.railway.app/client/delete", {"id": client.id})
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("delete-error", error);
      })
  }

  useEffect(() => {
    axios.get("https://travel-calculator-server-production.up.railway.app/client/all")
      .then((result) => {
        setClients(result.data);
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  });

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
          placeholder="Start Date -'YYYY-MM-DD'"
          value={searchStartDate}
          onChange={event => {
            setSearchStartDate(event.target.value);
          }}
          class="form-elements"
        />
        <input
          name="name"
          type="text"
          placeholder="End Date -'YYYY-MM-DD'"
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