import chalk from 'chalk';
import inquirer from 'inquirer';

import words from './dictionary.js';

// const word = words[Math.floor(Math.random() * words.length)];

const word = 'apple';

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
					const inputLc = input.toLowerCase();

					if (input.length !== 5) {
						console.log(chalk.red('Guess must be 5 letters!'));
						return false;
					}

					const isValid = words.includes(inputLc);

					if (!isValid) {
						console.log(chalk.red('Not a valid word!'));
						return false;
					}

					return true;
				},
			},
		])
		.then(({ guess }) => {
			const guessLc = guess.toLowerCase();

			const wordArr = word.split('');
			const lettersRemaining = word.split('');
			const guessArr = guessLc.split('');

			for (let i = 0; i < 5; i++) {
				if (wordArr[i] === guessArr[i]) {
					guesses[index][i] = chalk.green(guessArr[i].toUpperCase());
				} else if (lettersRemaining.includes(guessArr[i])) {
					guesses[index][i] = chalk.yellow(guessArr[i].toUpperCase());
				} else {
					guesses[index][i] = chalk.blackBright(guessArr[i].toUpperCase());
				}

				const removeIndex = lettersRemaining.findIndex(
					item => item === guessArr[i],
				);

				if (removeIndex >= 0) {
					lettersRemaining.splice(removeIndex, 1);
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

			if (guess.toLowerCase() === word) {
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
