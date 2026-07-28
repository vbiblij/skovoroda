// This script is loaded dynamically after footer.html is injected.
const fbLink = document.getElementById('fb-link');
const fbText = fbLink ? fbLink.querySelector('.fb-text') : null;
const catchPhrase = fbLink ? fbLink.querySelector('.catch-phrase') : null;

if (fbLink && fbText && catchPhrase) {
    let attemptCount = 0;
    const maxDodges = 2; // The button will dodge this many times. The next attempt will succeed.

    const dodge = (event) => {
        // Prevent click events from firing immediately on touch devices
        event.preventDefault();

        // Increment attempt counter
        attemptCount++;

        // If we haven't reached the max number of dodges yet
        if (attemptCount <= maxDodges) {
            // On the first attempt, change the text
            if (attemptCount === 1) {
                fbText.textContent = 'Світ ловив мене...';
            }
            
            // Calculate a random upward and sideways jump
            const jumpUp = -150 - Math.random() * 50; // Jump up by 150px to 200px
            const jumpSide = (Math.random() - 0.5) * 200; // Jump sideways by -100px to 100px
            
            fbLink.style.transform = `translate(${jumpSide}px, ${jumpUp}px)`;

            // After a moment, reset the button's position so it can be "chased" again
            setTimeout(() => {
                fbLink.style.transform = 'translate(0, 0)';
            }, 600);

        } else {
            // If we have reached the max dodges, the button gives up. Reset text and position.
            fbLink.style.transform = 'translate(0, 0)';
            // fbText.textContent = 'Facebook';
            // Now the user can click it successfully.
        }
    };

    const finalClick = (event) => {
        // If the user clicks before the button has given up, prevent the click
        if (attemptCount <= maxDodges) {
            event.preventDefault();
            // Optionally, you could trigger another dodge here, but preventing the click is enough
            // to stop a "lucky" click while it's moving.
        } else {
            // This is the successful click after the chase
            event.preventDefault(); // Prevent immediate navigation
            
            // Show the final phrase
            fbText.style.display = 'none';
            catchPhrase.style.display = 'inline';
            catchPhrase.style.opacity = '1';

            // Get the URL and navigate after a delay
            const url = fbLink.href;
            setTimeout(() => {
                window.open(url, '_blank');

                // --- Reset everything for the next time the page is visited ---
                fbText.style.display = 'inline';
                catchPhrase.style.display = 'none';
                catchPhrase.style.opacity = '0';
                // fbText.textContent = 'Facebook';
                attemptCount = 0;

            }, 1500); // 1.5-second delay to read the message
        }
    };

    // Attach event listeners
    fbLink.addEventListener('mouseover', dodge);
    fbLink.addEventListener('touchstart', dodge, { passive: false }); // Use passive: false to allow preventDefault
    fbLink.addEventListener('click', finalClick);
}
