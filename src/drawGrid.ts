const drawGrid = (guesses: Array<Array<String>>) => {
  // draw game grid
  console.log(`┌───┬───┬───┬───┬───┐`);
  guesses.forEach((guess) => {
    console.log(
      `│ ${guess[0]} │ ${guess[1]} │ ${guess[2]} │ ${guess[3]} │ ${guess[4]} │`
    );
    if (guesses.indexOf(guess) !== guesses.length - 1) {
      console.log(`├───┼───┼───┼───┼───┤`);
    }
  });
  console.log(`└───┴───┴───┴───┴───┘`);
};

export default drawGrid;
