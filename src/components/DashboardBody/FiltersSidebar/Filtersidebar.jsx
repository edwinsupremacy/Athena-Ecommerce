import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import './filtersidebar.css'
import Category from "./Category/Category";
import Price from "./Price/Price";
import Color from "./Color/Color";

const Filtersidebar = () => {

  return (
    <div className="filtersidebar">
      <Category/>
      <Price/>
      <Color/>
    </div>
  );
};

export default Filtersidebar;
