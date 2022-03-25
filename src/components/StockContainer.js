import React from "react";
import Stock from "./Stock";

function StockContainer({stockList, addStock, deleteStock, isInPortfolio}) {

  const stockRender = stockList.map( stock => (
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
      <h2>Stocks</h2>
      {stockRender}
    </div>
  );
}

export default StockContainer;
