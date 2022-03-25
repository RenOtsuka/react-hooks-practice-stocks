import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, addStock, deleteStock, isInPortfolio}) {

  const portfolioRender = portfolio.map( stock => (
    <Stock 
    key={stock.id} 
    stockProp={stock} 
    addStock={addStock} 
    deleteStock={deleteStock}
    isInPortfolio={isInPortfolio}
    />
  ));

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioRender
      }
    </div>
  );
}

export default PortfolioContainer;
