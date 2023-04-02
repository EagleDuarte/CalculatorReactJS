import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const ops = ["+", "-", "*", "/", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (/\d/.test(key)) {
      updateCalc(key);
    } else if (ops.includes(key)) {
      updateCalc(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === "Backspace") {
      deleteLast();
    }
  };

  const handleTouchStart = () => {
    setIsTouch(true);
  };

  const handleTouchEnd = () => {
    setIsTouch(false);
  };

  useEffect(() => {
    if (isTouch) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    }
  }, [isTouch]);

  return (
    <>
      <header>
        <h1>Always solving, always saving.</h1>
      </header>
      <div className="App" onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="calculator">
          <div className="display">
            {result ? <span>({result})</span> : ""}&nbsp;
            {calc || "0"}
          </div>
          <div className="operators">
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={deleteLast}>DEL</button>
          </div>

          <div className="digits">
            {createDigits()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>

            <button onClick={calculate}>=</button>
          </div>
        </div>
      </div>
      <footer>
        <b>Leonardo Duarte © 2022</b>
      </footer>
    </>
  );
}

export default App;