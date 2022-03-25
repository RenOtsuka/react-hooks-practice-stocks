import React from "react";

function Stock({stockProp, addStock, deleteStock, isInPortfolio}) {

  const {id, ticker, name, type, price} = stockProp;

  function handleStockChange(){

    if(!isInPortfolio) {
      addStock(stockProp);
    }
    else{
      deleteStock(stockProp);
    }

  }

  return (
    <div>
      <div className="card">
        <div className="card-body" onClick={handleStockChange}>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{`${ticker}: ${price}`}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
