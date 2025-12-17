// 💡 Note for Beginners: This function is called from the HTML using 'onclick="flipCard(this)"'.
function flipCard(cardContainer) {
    // 'cardContainer' is the element that was clicked (the 'flashcard-container' div).
    
    // 💡 Note: 'classList.toggle()' is a very common and useful JS method.
    // It checks if the 'flip' class is present: 
    // - If it IS present, it REMOVES it.
    // - If it IS NOT present, it ADDS it.
    cardContainer.classList.toggle('flip');
}

// 💡 Bonus Note: You could also find the element by ID if you didn't pass 'this'
// document.getElementById('myCardId').classList.toggle('flip');