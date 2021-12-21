import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Clients() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = () => {
    axios.post("https://travel-calculator-server.herokuapp.com/client/new", {"name": name, "address": address})
      .then((result) => {
        console.log(result);
        setName("");
        setAddress("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <input
          name="name"
          type="text"
          placeholder="Address"
          value={address}
          onChange={event => {
            setAddress(event.target.value);
          }}
        />
      </form>
      <button onClick={onSubmitHandler}>Add Client</button>
    </>
  );
}