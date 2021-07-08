import { useState, useEffect } from "react";
import reactDom from "react-dom";

import "./App.css";

function App() {
  let size = 6;
  let interval = null;
  let intervalTime = 5000;
  let isGameOver = false;

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
        arr[i].push({ isSelected: false });
      }
    }

    console.log("full array ", arr);
    return arr;
  };

  let gridArr = dynamicArray(size);

  const [numbers, setNumbers] = useState(gridArr);

  const [grid, setGrid] = useState(dynamic2DArray(size));

  const [target, setTarget] = useState(20);

  const [sum, setSum] = useState(0);

  console.log("---", numbers);
  // console.log("---", numStatus);

  const startInterval = () => {
    interval = setInterval(() => {
      randomNumberArr();
    }, intervalTime);
  };

  const endInterval = () => clearInterval(interval);

  const gridElements = () =>
    grid.map((item, index) => (
      <div id={`row-${index}`} key={index}>
        {item.map((jtem, jndex) => {
          // console.log(jtem.isSelected ? "selectedBox" : "", { jtem });
          return (
            <div
              key={jndex}
              onClick={() => handleClick(index, jndex)}
              className={jtem.isSelected ? "selectedBox" : ""}
            >
              {numbers && numbers[index] && numbers[index][jndex]}
            </div>
          );
        })}
      </div>
    ));

  const handleClick = (index, jndex) => {
    if (!numbers[index][jndex]) return;

    let gridCopy = [...grid];
    gridCopy[index][jndex].isSelected = !grid[index][jndex].isSelected;

    let clickNumber = sum;

    if (grid[index][jndex].isSelected) {
      clickNumber += numbers[index][jndex];
    } else {
      clickNumber -= numbers[index][jndex];
    }

    setSum(clickNumber);
    setGrid(gridCopy);

    winCheck(clickNumber);
    console.log("sum:", clickNumber);
    console.log("target:", target);
  };

  const winCheck = (clickNumber) => {
    if (clickNumber === target) {
      clickNumber = 0;
      setSum(clickNumber);
      console.log("WIN");
      deleteNumbers();
    } else if (clickNumber > target) {
      clickNumber = 0;
      setSum(clickNumber);
      console.log("Wrong");
      let resetGrid = dynamic2DArray(size);
      setGrid(resetGrid);
    }
  };

  const deleteNumbers = () => {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        if (grid[i][j].isSelected) {
          console.log("Splice", numbers[i].splice(j, 1));
          grid[i][j].isSelected = false;
        }
      }
    }
  };

  const randomNumberArr = () => {
    let copyNumbers = [...numbers];
    let gridCopy = [...grid];
    // let copyNumStatus = [...numStatus];

    for (let i = 0; i < size; i++) {
      if (copyNumbers[i].length >= size) {
        endInterval();
        isGameOver = true;
      } else {
        let randomNum = Math.ceil(Math.random() * 10);
        copyNumbers[i].unshift(randomNum);
        gridCopy[i].unshift({ isSelected: false });
        gridCopy[i].pop();
      }
    }
    setNumbers(copyNumbers);
    // console.log(copyNumbers);
  };

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
