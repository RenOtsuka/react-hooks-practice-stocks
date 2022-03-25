import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  //keep track of original stock list
  const [stockList, setStockList] = useState([]);

  //for sorting & filtering stocks 
  const [sortAlpha, setSortAlpha] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [filterChoice, setFilterChoice] = useState("");

  //keep track of portfolio
  const [portfolio, setPortfolio] = useState([]);

  const [isInPortfolio, setIsInPortfolio] = useState(false);

  useEffect( () => {
    fetch(`http://localhost:3001/stocks`)
    .then(r => r.json())
    .then(data => setStockList(data))
  }, []);

  function handleSortAlpha(e){
    setSortAlpha(e.target.checked);
  }

  function handleSortPrice(e){
    setSortPrice(e.target.checked);
  }

  function handleChange(e){
    setFilterChoice(e.target.value);
  }

  //adds stock to portfolio
  function addStock(stock){
    setPortfolio([...portfolio, stock]);
    setIsInPortfolio(true);
  }

  //deletes stock from portfolio
  function deleteStock(deletedStock){
    const newList = portfolio.filter(stock => stock.id !== deletedStock.id);
    setPortfolio(newList);
    setIsInPortfolio(false);
  }


  if(sortAlpha){
    stockList.sort( (first, second) => first.ticker.localeCompare(second.ticker));
  }
  else if(sortPrice){
    stockList.sort( (first, second) => {
      if(first.price < second.price) return -1;
      if(first.price > second.price) return 1;
      return 0; 
    });
  }

  const stockFilter = stockList.filter(stock => {
    if(filterChoice !== "") return stock.type === filterChoice;
    else return true;
    }
  );

  return (
    <div>
      <SearchBar
      sortAlpha={sortAlpha}
      sortPrice={sortPrice}
      handleSortAlpha={handleSortAlpha}
      handleSortPrice={handleSortPrice}
      handleChange={handleChange}
       />
      <div className="row">
        <div className="col-8">
          <StockContainer 
          stockList={stockFilter}
          addStock={addStock}
          deleteStock={deleteStock}
          isInPortfolio={isInPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
          portfolio={portfolio}
          addStock={addStock}
          deleteStock={deleteStock}
          isInPortfolio={isInPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
