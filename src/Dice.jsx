import "./Dice.css"

function Dice(props) {
  return(
    <button onClick={props.holdDice} 
    className={`max-sm:text-2xl max-sm:px-0 text-4xl p-2 m-2 rounded-xl outline-none shadow-2xl ring-2 cursor-pointer transition ${props.isHeld ? "bg-green-500" : ""}`} >
      {props.value}
      </button>
  );
}

export default Dice;