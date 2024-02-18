const drawGrid = (guesses: Array<Array<String>>) => {
  // draw game grid
  console.log(`┌───┬───┬───┬───┬───┐`);
  console.log(
    `│ ${guesses[0][0]} │ ${guesses[0][1]} │ ${guesses[0][2]} │ ${guesses[0][3]} │ ${guesses[0][4]} │`,
  );
  console.log(`├───┼───┼───┼───┼───┤`);
  console.log(
    `│ ${guesses[1][0]} │ ${guesses[1][1]} │ ${guesses[1][2]} │ ${guesses[1][3]} │ ${guesses[1][4]} │`,
  );
  console.log(`├───┼───┼───┼───┼───┤`);
  console.log(
    `│ ${guesses[2][0]} │ ${guesses[2][1]} │ ${guesses[2][2]} │ ${guesses[2][3]} │ ${guesses[2][4]} │`,
  );
  console.log(`├───┼───┼───┼───┼───┤`);
  console.log(
    `│ ${guesses[3][0]} │ ${guesses[3][1]} │ ${guesses[3][2]} │ ${guesses[3][3]} │ ${guesses[3][4]} │`,
  );
  console.log(`├───┼───┼───┼───┼───┤`);
  console.log(
    `│ ${guesses[4][0]} │ ${guesses[4][1]} │ ${guesses[4][2]} │ ${guesses[4][3]} │ ${guesses[4][4]} │`,
  );
  console.log(`├───┼───┼───┼───┼───┤`);
  console.log(
    `│ ${guesses[5][0]} │ ${guesses[5][1]} │ ${guesses[5][2]} │ ${guesses[5][3]} │ ${guesses[5][4]} │`,
  );
  console.log(`└───┴───┴───┴───┴───┘`);
};

export default drawGrid;
