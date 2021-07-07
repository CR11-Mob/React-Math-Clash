import { useState, useEffect } from "react";

import "./App.css";

function App() {
  let size = 6;
  let interval = null;
  let intervalTime = 3000;
  let isGameOver = false;
  let clickNumber = 0;

  const minimumNumber = 20;
  const maximumNumber = 100;
  const randomMutiplier = maximumNumber - minimumNumber;

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

  const [target, setTarget] = useState(0);

  const [sum, setSum] = useState(0);

  // console.log(numbers);

  const gridElements = () =>
    grid.map((item, index) => (
      <div id={`row-${index}`} key={index}>
        {item.map((item, jndex) => (
          <div key={jndex} onClick={handleClick}>
            {numbers && numbers[index] && numbers[index][jndex]}
          </div>
        ))}
      </div>
    ));

  const handleClick = (e) => {
    console.log(e);
    clickNumber = +e.target.innerText;
    setSum(clickNumber);
  };

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
    // console.log(copyNumbers);
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
    let randomTargetNum =
      minimumNumber + Math.ceil(Math.random() * randomMutiplier);

    setTarget(randomTargetNum);
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        <div className="head">
          <div className="sum">{sum}</div>
          <div className="target">{target}</div>
        </div>
        {grid ? (
          <div className="gameGrid">{gridElements()}</div>
        ) : (
          "Grid Doesn't Exist"
        )}
        <div className="restart-game"></div>
      </div>
    </div>
  );
}

export default App;
