import chalk from 'chalk';
import inquirer from 'inquirer';

import words from './wordLibrary.js';

const word = words[Math.floor(Math.random() * words.length)];
const guesses = [
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
];

let won = false;

const gameLoop = index => {
	if (index === 5) {
		console.log('Out of guesses!');
		return;
	}

	inquirer
		.prompt([
			{
				type: 'input',
				name: 'guess',
				validate: input => {
					if (input.length !== 5) {
						console.log(chalk.red('Guess must be 5 letters!'));
						return false;
					}

					const isValid = words.includes(input);

					if (!isValid) {
						console.log(chalk.red('Not a valid word!'));
						return false;
					}

					return true;
				},
			},
		])
		.then(({ guess }) => {
			// guesses[0].push(word.split(''));

			const wordArr = word.split('');
			const guessArr = guess.split('');

			for (let i = 0; i < 5; i++) {
				if (wordArr[i] === guessArr[i]) {
					guesses[index][i] = chalk.green(guessArr[i]);
				} else if (wordArr.includes(guessArr[i])) {
					guesses[index][i] = chalk.yellow(guessArr[i]);
				} else {
					guesses[index][i] = chalk.blackBright(guessArr[i]);
				}
			}

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

			if (guess === word) {
				if (index === 0) {
					console.log('Wow! You won on the first guess!');
				} else {
					console.log(`You won in ${index + 1} guesses!`);
				}
				won = true;
			}
		})
		.finally(() => {
			if (won === false) {
				gameLoop(index + 1);
			}
		});
};

export default gameLoop;
