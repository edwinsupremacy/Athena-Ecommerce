import React from "react";
import Slideshow from "../Slideshow/Slideshow";
import './dashboard.css'
import DashboardBody from "../DashboardBody/DashboardBody";

const images = import.meta.glob("../../assets/slideshowimages/*.jpeg", {
  eager: true,
});
const slides = Object.values(images).map((mod, i) => ({
  id: i,
  image: mod.default,
}));
console.log(images);

const Dashboard = ({dashboardBodyRef}) => {
  return (
    <div className="dashboard">
      <div className="slideshow-container">
        <Slideshow slides={slides} />
      </div>
      <div ref={dashboardBodyRef}>
        <DashboardBody />
      </div>
    </div>
  );
};

export default Dashboard;
