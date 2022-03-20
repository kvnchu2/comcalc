import React from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet, Navigate } from "react-router";
import Signin from "../../views/authentication/signin"

export default function ProtectedRoutes({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  console.log("nihao");

  return isAuthenticated === "true" ? <Outlet /> : <Signin />
}