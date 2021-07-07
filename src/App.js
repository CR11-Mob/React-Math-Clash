import { useState, useEffect } from "react";

import "./App.css";

function App() {
  let size = 6;
  let interval = null;
  let intervalTime = 3000;
  let isGameOver = false;

  const dynamicArray = (size) => {
    let arr = [];

    for (let i = 0; i < size; i++) {
      arr.push([]);
    }
    return arr;
  };
  const dynamic2DArray = (size) => {
    let arr = [];

    for (let i = 0; i < size; i++) {
      arr.push([]);
      for (let j = 0; j < size; j++) {
        arr[i].push([]);
      }
    }

    console.log("full array ", arr);
    return arr;
  };

  let gridArr = dynamicArray(size);

  const [numbers, setNumbers] = useState(gridArr);
  const [grid] = useState(dynamic2DArray(size));

  console.log(numbers);

  const gridElements = () =>
    grid.map((item, index) => (
      <div id={`row-${index}`} key={index}>
        {item.map((item, jndex) => (
          <div key={jndex}>
            {numbers && numbers[index] && numbers[index][jndex]}
          </div>
        ))}
      </div>
    ));

  const randomNumberArr = () => {
    let copyNumbers = [...numbers];
    for (let i = 0; i < size; i++) {
      if (copyNumbers[i].length >= size) {
        endInterval();
        isGameOver = true;
      } else {
        let randomNum = Math.ceil(Math.random() * 10);
        copyNumbers[i].unshift(randomNum);
      }
    }
    setNumbers(copyNumbers);
    console.log(copyNumbers);
  };

  const startInterval = () => {
    interval = setInterval(() => {
      randomNumberArr();
    }, intervalTime);
  };

  const endInterval = () => clearInterval(interval);

  useEffect(() => {
    randomNumberArr();
    startInterval();
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        {grid ? (
          <div className="gameGrid">{gridElements()}</div>
        ) : (
          "Grid Doesn't Exist"
        )}
      </div>
    </div>
  );
}

export default App;
