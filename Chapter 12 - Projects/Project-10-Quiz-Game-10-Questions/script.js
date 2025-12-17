// Note for Beginners: Wait for the entire HTML document to load before running the script.
document.addEventListener('DOMContentLoaded', () => {
    // Note for Beginners: Get a reference to the form element and the results display area.
    const quizForm = document.getElementById('quizForm');
    const resultsDiv = document.getElementById('results');

    // Note for Beginners: Define the correct answers in an object where the key is the question name (e.g., 'q1') and the value is the correct choice (e.g., 'b').
    const correctAnswers = {
        q1: 'b', // let (also const is modern, but let is the flexible choice for variables
        q2: 'b', // Equality of values and types
        q3: 'a', // push()
        q4: 'b', // "object" (this is a long‑standing JavaScript quirk)
        q5: 'b', // function
        q6: 'b', // Not a Number
        q7: 'b', // window
        q8: 'a', // for loop (though for...of and array methods like .forEach() are also common)
        q9: 'b', // Converts a JavaScript object into a JSON string
        q10: 'b' // try...catch
    };

    // Note for Beginners: Add an event listener to the form to handle submission.
    quizForm.addEventListener('submit', function(event) {
        // Stop the default form submission (which would reload the page).
        event.preventDefault();

        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        const formData = new FormData(quizForm); // Get all form data easily

        // Clear previous results and feedback
        resultsDiv.style.display = 'none';
        resultsDiv.innerHTML = '';
        document.querySelectorAll('.correct, .incorrect').forEach(el => {
            el.classList.remove('correct', 'incorrect');
        });

        // Note for Beginners: Loop through the correct answers to check the user's choices.
        for (let i = 1; i <= totalQuestions; i++) {
            const questionName = `q${i}`;
            // Note for Beginners: formData.get(name) retrieves the value of the selected radio button.
            const userAnswer = formData.get(questionName);
            const correctAnswer = correctAnswers[questionName];

            // Get the fieldset for visual feedback
            const questionFieldset = document.querySelector(`[name="${questionName}"]`).closest('.question');

            // Note for Beginners: Check if the user's answer matches the correct answer.
            if (userAnswer === correctAnswer) {
                score++;
                // Note for Beginners: Add a CSS class to visually indicate a correct answer.
                questionFieldset.classList.add('correct');
            } else {
                // Note for Beginners: Add a CSS class to visually indicate an incorrect answer.
                if (userAnswer) { // Only mark incorrect if an answer was selected
                    questionFieldset.classList.add('incorrect');
                }
                // Optional: Highlight the correct answer for review
                const correctLabel = document.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`).closest('label');
                if (correctLabel) {
                    // Temporarily highlight the correct one as well (optional)
                    // correctLabel.style.fontWeight = 'bold';
                    // correctLabel.style.border = '1px solid green';
                }
            }
        }

        // Note for Beginners: Calculate the final score percentage.
        const percentage = ((score / totalQuestions) * 100).toFixed(0);

        // Note for Beginners: Display the results to the user.
        resultsDiv.innerHTML = `You scored ${score} out of ${totalQuestions} (${percentage}%)!`;
        resultsDiv.style.display = 'block';

        // Scroll to the results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
});