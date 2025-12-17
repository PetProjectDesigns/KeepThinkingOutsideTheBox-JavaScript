// 1. Get references to the HTML elements we need to interact with
const diceDisplay = document.getElementById('dice-display');
const rollButton = document.getElementById('roll-button');
const resultMessage = document.getElementById('result-message');

// Note for Beginners: document.getElementById() is how JavaScript "finds" elements in the HTML to modify them.

// 2. Define the main function that runs when the button is clicked
function rollDice() {
    // A. Randomness: Generate a random number between 1 and 6 (inclusive)
    // Math.random() generates a decimal between 0 (inclusive) and 1 (exclusive).
    // Multiplying by 6 gives 0.0 to 5.999...
    // Math.floor() rounds down, giving integers 0, 1, 2, 3, 4, 5.
    // Adding 1 shifts the range to 1, 2, 3, 4, 5, 6.
    const roll = Math.floor(Math.random() * 6) + 1;

    // B. Update the HTML to show the roll result
    diceDisplay.textContent = roll;

    // C. Add a quick 'roll' animation effect (a subtle visual change)
    diceDisplay.style.transform = 'rotateZ(10deg) scale(0.9)';
    setTimeout(() => {
        diceDisplay.style.transform = 'rotateZ(0deg) scale(1)';
    }, 100);

    // D. Conditionals: Check the result and display a message
    // Note for Beginners: 'if...else if...else' is a conditional structure. It checks conditions one by one.
    resultMessage.classList.remove('win', 'lose'); // Clear previous styles

    if (roll >= 5) {
        // High roll!
        resultMessage.textContent = `You rolled a ${roll}! A great result! 🎉`;
        resultMessage.classList.add('win');
    } else if (roll <= 2) {
        // Low roll!
        resultMessage.textContent = `You rolled a ${roll}. A bit low, try again! 🙁`;
        resultMessage.classList.add('lose');
    } else {
        // Middle roll
        resultMessage.textContent = `You rolled a ${roll}. That's an average roll.`;
    }
}

// 3. Set up the Event Listener
// This tells the browser: "When the 'roll-button' is clicked, run the 'rollDice' function."
rollButton.addEventListener('click', rollDice);

// 4. Initial call to set the stage
// This makes sure the display updates immediately when the page loads, instead of showing the static HTML '1'.
rollDice();