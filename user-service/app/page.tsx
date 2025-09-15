"use client";

// import { useEffect, useState } from 'react';

const UserPage = () => {
  const isAuthenticated = false;

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return console.log("no estas verificado");
  }
};

export default UserPage;