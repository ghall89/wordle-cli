import chalk from "chalk";
import inquirer from "inquirer";

// import stuff
import drawGrid from "./drawGrid";

let words: Array<String>;

const getWords = async () => {
  const wordsTxt = Bun.file("./src/dictionary.txt");
  const contents = await wordsTxt.text();

  words = contents.split(",");
};

// set word from game dictionary
let word: String;

// this defines the game grid
const guesses = [
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
];

// flag for win state
let won = false;

// initialize game
const initGame = () => {
  Promise.all([getWords()]).then(() => {
    // get random word
    if (words.length === 0) {
      throw new Error("Dictionary is empty!");
    }

    word = words[Math.floor(Math.random() * words.length)];

    gameLoop(0);
  });
};

// primary game loop
const gameLoop = (index: number) => {
  drawGrid(guesses);

  // lose state
  if (index === 6) {
    console.log(`Out of guesses! The word was ${chalk.underline(word)}.`);
    return;
  }

  // get user input
  inquirer
    .prompt([
      {
        type: "input",
        name: "guess",
        validate: (input) => {
          // ensure user input is 5 characters
          // and is a valid word in game dictionary
          const inputLc = input.toLowerCase();

          if (input.length !== 5) {
            console.log(chalk.red("\nGuess must be 5 letters!"));
            return false;
          }

          const isValid = words.includes(inputLc);

          if (!isValid) {
            console.log(chalk.red("\nNot a valid word!"));
            return false;
          }

          return true;
        },
      },
    ])
    .then(({ guess }) => {
      // convert user input to lowercase
      const guessLc = guess.toLowerCase();

      // create arrays to check user input against answer
      const wordArr = word.split("");
      const lettersRemaining = word.split("");
      const guessArr = guessLc.split("");

      // determine user feedback
      for (let i = 0; i < 5; i++) {
        if (wordArr[i] === guessArr[i]) {
          // if character exists at same index
          guesses[index][i] = chalk.green(guessArr[i].toUpperCase());
        } else if (lettersRemaining.includes(guessArr[i])) {
          // if character exists somewhere in the answer
          guesses[index][i] = chalk.yellow(guessArr[i].toUpperCase());
        } else {
          // if character is not in answer
          guesses[index][i] = chalk.blackBright(guessArr[i].toUpperCase());
        }

        // remove guessed character from lettersRemaining
        const removeIndex = lettersRemaining.findIndex(
          (item) => item === guessArr[i]
        );

        if (removeIndex >= 0) {
          lettersRemaining.splice(removeIndex, 1);
        }
      }

      // win state
      if (guess.toLowerCase() === word) {
        console.clear();
        drawGrid(guesses);
        if (index === 0) {
          console.log("Wow! You won on the first guess!");
        } else {
          console.log(`You won in ${index + 1} guesses!`);
        }
        won = true;
      }
    })
    .finally(() => {
      // if game is still going, run loop again
      if (won === false) {
        console.clear();
        gameLoop(index + 1);
      }
    });
};

export default initGame;
