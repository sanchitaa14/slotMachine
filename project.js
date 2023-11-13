// 1. Initial money
// 2. COllect bet, determine no. of lines to bet
//3. spin
//4. check if they won
//5. give the user their money
//6. play again
// function deposit() {

// }

//taking input 
//global vars are preffered to be all caps
//good practice to have global variables at the top, and then the classes and then the main function
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { //an objext with keys mapped with different values
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
}

const SYMBOL_VALUES = {
  "A": 5,
  "B": 3,
  "C": 2,
  "D": 1
}

const deposit = () => {
 while(true){   //this while loop makes sure that the command runs till a valid number is entered and will exit when the correct number is entered using the else statement.
   const depositAmount = prompt("Enter a deposit amount: ");
   const numberDepositAmount = parseFloat(depositAmount); //parseFLoat changes the number to its float value and if the thing entered is not a number it shows not a number  
   if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
    console.log("Invalid deposit amount, try again");
   }else{
    return numberDepositAmount;
   }
}
};

const getNumberOfLines = () => {
  while(true){   //this while loop makes sure that the command runs till a valid number is entered and will exit when the correct number is entered using the else statement.
    const lines = prompt("Enter number of lines to be bet on(1-3): ");
    const numberOfLines = parseFloat(lines); //parseFLoat changes the number to its float value and if the thing entered is not a number it shows not a number  
    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ){
     console.log("Invalid number, try again");
    }else{
     return numberOfLines;
    }
 }
};

const getBet = (balance) => {
  while(true){   //this while loop makes sure that the command runs till a valid number is entered and will exit when the correct number is entered using the else statement.
    const bet = prompt("Enter the total bet: ");
    const numberBet = parseFloat(bet); //parseFLoat changes the number to its float value and if the thing entered is not a number it shows not a number  
    if(isNaN(bet) || bet <= 0 || bet > balance ){
     console.log("Invalid number, try again");
    }else{
     return numberBet;
    }
 }
};

const spin = () => {
  const symbols = []; //a reference data type, as in stuff can be added even with it being a const
  //for looping through the object 
  for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
    for(let i = 0; i<count; i++){
      symbols.push(symbol);
    }
  }
  const reels = [[],[],[]]; //2d array
  for(let i = 0; i<COLS; i++){
    const reelsSymbols = [...symbols];
    for(let j = 0; j<ROWS;j++){
      const randomIndex = Math.floor(Math.random()*reelsSymbols.length);
      const selectedSymbol = reelsSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      //we splice so that the same symbol is not repeated
      reelsSymbols.splice(randomIndex, 1); //1 means only one number is being removed, meanwhile randome index states its being removed at a random index
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for(let i = 0; i< ROWS; i++){
    rows.push([]);
    for(let j = 0; j<COLS; j++){
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of ₹" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines; //since the bet is per line not on the total lines
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, ₹" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? "); //prompt for taking input

    if (playAgain != "y") break;
  }
};

game();

 