import React from "react";

const InfoCard = ({ cardTitle, cardValue }) => {
  return (
    <div className="inventory-card">
      <div className="inventory-card-img"></div>
      <div className="inventory-card-info">
        <div className="small-text">{cardTitle}</div>
        <div className="large-text">{cardValue}</div>
      </div>
    </div>
  );
};

export default InfoCard;
