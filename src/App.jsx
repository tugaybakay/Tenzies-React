import React from "react";
import { nanoid } from "nanoid";
import Dice from "./Dice";
import "./App.css";
import ReactConfetti from "react-confetti";

function App() {
  const [tenzies,setTenzies] = React.useState(false);
  const [dices,setDices] = React.useState(allNewDices());
  
  React.useEffect(() => {
    const allIsHeld = dices.every(dice => dice.isHeld === true);
    const isSameValue = dices.every(dice => dices[0].value === dice.value);
    if(allIsHeld && isSameValue) {
      setTenzies(true);
    }else {
      setTenzies(false);
    }
  },[dices]);
  

  function allNewDices() {
    let newArray = [];
    for(let i = 0; i < 10; i++) {
      newArray.push({id: nanoid(), value: (Math.floor(Math.random() * 6) + 1) , isHeld: false});
    }
    return newArray;
  }

  function holdDice(id) {
    setDices(dices.map(dice => {
      return dice.id === id ?  {...dice, isHeld: !dice.isHeld} : dice;
    }))
  }

  function rollDices() {
    if(tenzies) {
      setDices(allNewDices());
    }else {
      setDices(dices.map(dice => {
        return dice.isHeld ? dice : {...dice, value: (Math.floor(Math.random() * 6) + 1)};
      }));
    }
    
  }

  let diceElements = dices.map( dice => {
    return <Dice key={dice.id} value={dice.value} holdDice={() => holdDice(dice.id)} isHeld={dice.isHeld}/>;
  });
  
  
  return(
    <>
      {tenzies && <ReactConfetti/>}
      <div className="bg-white w-8/12 px-14 py-8 min-w-min mx-auto flex flex-col justify-center mt-20 rounded-xl max-sm:mt-8 max-sm:p-8 max-sm:pb-1">
        <div className="flex flex-col justify-center content-center">
          <h1 className="font-bold text-6xl text-center max-sm:text-4xl">Tenzies</h1>
          <p className="text-center mt-3 max-sm:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ipsa aut dolorem, fugiat eos ut!</p>
        </div>
        <main className="grid grid-cols-5 grid-rows-2 mt-8 gap-y-4 gap-x-2 max-sm:grid-cols-2 max-sm:grid-rows-5">
        {diceElements}
        </main>
        <button className="max-sm:px-6 mx-auto rounded-xl bg-purple-500 px-10 py-2 m-10 outline-none text-white text-xl cursor-pointer" onClick={rollDices}>{!tenzies ? 'Roll' : 'New Game'}</button>
      </div>
    </>
  );
}

export default App;