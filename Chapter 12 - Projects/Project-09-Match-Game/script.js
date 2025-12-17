// Global variables to manage game state
let hasFlippedCard = false; // Tracks if a first card has been flipped
let lockBoard = false; // Prevents flipping more cards while checking a match
let firstCard, secondCard; // Stores the two cards currently flipped
let matchesFound = 0; // Counts the number of pairs matched

// Select all cards on the board
const cards = document.querySelectorAll('.card');
const messageElement = document.getElementById('message');
const totalPairs = cards.length / 2; // For a 4-card game, this is 2

// --- Core Game Functions ---

// 1. Flip Card Function
function flipCard() {
    // Check if the board is locked (waiting for non-match flip-back)
    if (lockBoard) return;
    // Check if the same card was double-clicked
    if (this === firstCard) return;

    // Add the 'flip' class to visually rotate the card
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // FIRST card flipped
        hasFlippedCard = true;
        firstCard = this;
        messageElement.textContent = 'Second card?';
        return;
    }

    // SECOND card flipped
    secondCard = this;
    hasFlippedCard = false; // Reset for the next turn

    checkForMatch();
}

// 2. Check for Match Function
function checkForMatch() {
    // Check if the 'data-match' attributes are the same
    const isMatch = firstCard.dataset.match === secondCard.dataset.match;

    // isMatch is true -> pair is a match, call disableCards()
    // isMatch is false -> pair is NOT a match, call unflipCards()
    isMatch ? disableCards() : unflipCards();
}

// 3. Match Handler (Keep cards flipped)
function disableCards() {
    // Remove the event listener so they can't be clicked again
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    // Add a visual class for matched cards
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    matchesFound++;
    messageElement.textContent = `Match! ${matchesFound}/${totalPairs} pairs.`;
    
    // Check if the game is over
    if (matchesFound === totalPairs) {
        messageElement.textContent = 'You Won! Game Over!';
    }

    resetBoard();
}

// 4. Non-Match Handler (Flip cards back)
function unflipCards() {
    lockBoard = true; // Lock the board to prevent clicking while cards flip

    messageElement.textContent = 'No match! Try again.';

    // Wait 1.5 seconds (1500ms), then flip the cards back
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);
}

// 5. Reset Board State
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    // If not locked and not finished, show prompt
    if (matchesFound !== totalPairs) {
         messageElement.textContent = 'Click a card to start!';
    }
}

// 6. Shuffle Cards on Load
(function shuffle() {
    cards.forEach(card => {
        // Generates a random order number (0-3 for 4 cards)
        let randomPos = Math.floor(Math.random() * cards.length);
        // Apply the order property to CSS Grid/Flexbox to rearrange the cards
        card.style.order = randomPos;
    });
})();


// --- Event Listeners ---
// Attach the flipCard function to every card's click event
cards.forEach(card => card.addEventListener('click', flipCard));