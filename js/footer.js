// This script is loaded dynamically after footer.html is injected.
const fbLink = document.getElementById('fb-link');
const fbText = fbLink ? fbLink.querySelector('.fb-text') : null;
const catchPhrase = fbLink ? fbLink.querySelector('.catch-phrase') : null;

if (fbLink && fbText && catchPhrase) {
    let hoverCount = 0;
    const maxDodges = 2; // The button will dodge 2 times before allowing a click on the 3rd attempt.

    const dodge = (event) => {
        hoverCount++;
        
        if (hoverCount <= maxDodges) {
            // Prevent click on first attempts
            event.preventDefault();

            // Change text
            fbText.textContent = 'Світ ловив мене...';

            // Move the button
            const parentWidth = fbLink.parentElement.offsetWidth;
            const linkWidth = fbLink.offsetWidth;
            const currentPosition = fbLink.getBoundingClientRect().left - fbLink.parentElement.getBoundingClientRect().left;

            // Move left if it's on the right side, and right if it's on the left.
            let move;
            if (currentPosition > parentWidth / 2) {
                move = -100 - Math.random() * 50; // Move left
            } else {
                move = 100 + Math.random() * 50; // Move right
            }

            // Make sure it doesn't go too far off-screen
            const newPos = currentPosition + move;
            if (newPos < 0 || newPos > parentWidth - linkWidth) {
                move *= -1; // Reverse direction if it would go out of bounds
            }
            
            fbLink.style.transform = `translateX(${move}px)`;
        } else {
            // After enough attempts, stop dodging
            fbLink.style.transform = 'translateX(0)';
            fbText.textContent = 'Facebook';
            // The click listener below will now handle the final interaction
        }
    };

    const finalClick = (event) => {
        if (hoverCount <= maxDodges) {
            // This case happens if the user manages to click it while it's moving
            event.preventDefault();
            dodge(event); // Trigger another dodge
        } else {
            // This is the successful, final click
            event.preventDefault(); // Prevent immediate navigation
            
            fbText.style.display = 'none';
            catchPhrase.style.display = 'inline';
            catchPhrase.style.opacity = '1';

            // Get the URL and navigate after a delay
            const url = fbLink.href;
            setTimeout(() => {
                window.open(url, '_blank');

                // Reset for next time
                fbText.style.display = 'inline';
                catchPhrase.style.display = 'none';
                catchPhrase.style.opacity = '0';
                fbText.textContent = 'Facebook';
                hoverCount = 0;

            }, 1500); // 1.5-second delay to read the message
        }
    };

    fbLink.addEventListener('mouseover', dodge);
    fbLink.addEventListener('click', finalClick);
}
