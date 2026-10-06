import { useState } from 'react'
import './App.css'

function CalcDisplay({ dispValue }) {
  return (
    <div className="CalcDisplay">
      {dispValue}
    </div>
  )
}

function CalcButton({ label, buttonClassName = "CalcButton", onClick }) {
  return (
    <div className={buttonClassName} onClick={onClick}>
      {label}
    </div>
  )
}

function App() {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [newNumber, setNewNumber] = useState(true)

  const onClickHandler = (e) => {
    const value = e.target.innerHTML


    if (value === 'CLR') {
      setDisplay('0')
      setFirstNumber(null)
      setOperator(null)
      setNewNumber(true)
      return
    }


    if (!isNaN(value)) {
      if (newNumber || display === '0') {
        setDisplay(value)
        setNewNumber(false)
      } else {
        setDisplay(display + value)
      }
      return
    }

    if (['+', '-', 'X', '÷'].includes(value)) {
      setFirstNumber(Number(display))
      setOperator(value)
      setNewNumber(true)
      return
    }

    if (value === '=') {
      if (firstNumber === null || operator === null) {
        return
      }

      const secondNumber = Number(display)
      let result

      if (operator === '+') {
        result = firstNumber + secondNumber
      } else if (operator === '-') {
        result = firstNumber - secondNumber
      } else if (operator === 'X') {
        result = firstNumber * secondNumber
      } else if (operator === '÷') {
        if (secondNumber === 0) {
          setDisplay('Error')
          return
        }
        result = firstNumber / secondNumber
      }

      setDisplay(String(result))
      setFirstNumber(null)
      setOperator(null)
      setNewNumber(true)
    }
  }

  return (
    <div className="App">

      <div className="Header">
        Calculator of Markevin Serrano - DA3A
      </div>

      <div className="Calculator">

        <CalcDisplay dispValue={display} />

        <div className="CalcButtons">

          <CalcButton label="7" onClick={onClickHandler} />
          <CalcButton label="8" onClick={onClickHandler} />
          <CalcButton label="9" onClick={onClickHandler} />
          <CalcButton label="÷" onClick={onClickHandler} />

          <CalcButton label="4" onClick={onClickHandler} />
          <CalcButton label="5" onClick={onClickHandler} />
          <CalcButton label="6" onClick={onClickHandler} />
          <CalcButton label="X" onClick={onClickHandler} />

          <CalcButton label="1" onClick={onClickHandler} />
          <CalcButton label="2" onClick={onClickHandler} />
          <CalcButton label="3" onClick={onClickHandler} />
          <CalcButton label="-" onClick={onClickHandler} />

          <CalcButton
            label="CLR"
            buttonClassName="ClearButton"
            onClick={onClickHandler}
          />

          <CalcButton label="0" onClick={onClickHandler} />
          <CalcButton label="=" onClick={onClickHandler} />
          <CalcButton label="+" onClick={onClickHandler} />

        </div>
      </div>

    </div>
  )
}

export default App