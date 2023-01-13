import "./App.css";
import SimilarPage from "./SimilarPage";
import getPage from "./api/content";
import React, { useState, useEffect } from "react";

function App() {
  const [products, setProductsData] = useState([]);
  useEffect(() => {
    getPage().then((res) => setProductsData(res.blocks[0].products));
  }, []);

  return (
    <div className="App">
      <SimilarPage products={products} />
    </div>
  );
}

export default App;
