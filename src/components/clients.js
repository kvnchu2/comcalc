import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Clients() {
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [clients, setClients] = useState([]);

  const onSubmitHandler = () => {
    axios.post("https://travel-calculator-server.herokuapp.com/client/new", {"name": searchName, "address": searchAddress})
      .then((result) => {
        console.log(result);
        setSearchName("");
        setSearchAddress("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    axios.get("https://travel-calculator-server.herokuapp.com/client/all")
      .then((result) => {
        setClients(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
  },[searchName]);

  const allClients = clients.map((client) => {
    return (
      <>
        <p>{client.name}</p>
        <p>{client.address}</p>
      </>
    )
  })

  return (
    <>
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={searchName}
          onChange={event => {
            setSearchName(event.target.value);
          }}
        />
        <input
          name="name"
          type="text"
          placeholder="Address"
          value={searchAddress}
          onChange={event => {
            setSearchAddress(event.target.value);
          }}
        />
      </form>
      <button onClick={onSubmitHandler}>Add Client</button>
      {allClients}
    </>
  );
}