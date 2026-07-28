const fbLink = document.getElementById('fb-link');
const fbText = fbLink ? fbLink.querySelector('.fb-text') : null;
const catchPhrase = fbLink ? fbLink.querySelector('.catch-phrase') : null;

if (fbLink && fbText && catchPhrase) {
    let attemptCount = 0;
    const maxDodges = 2; // The button will dodge this many times.

    const dodge = (event) => {
        event.preventDefault();
        attemptCount++;

        if (attemptCount <= maxDodges) {
            if (attemptCount === 1) {
                fbText.textContent = 'Світ ловив мене...';
            }
            
            const jumpUp = -150 - Math.random() * 50;
            const jumpSide = (Math.random() - 0.5) * 200;
            fbLink.style.transform = `translate(${jumpSide}px, ${jumpUp}px)`;

            setTimeout(() => {
                fbLink.style.transform = 'translate(0, 0)';
            }, 600);

        } else {
            // The button gives up. Remove the chase listeners.
            fbText.textContent = 'Facebook';
            fbLink.style.transform = 'translate(0, 0)';
            removeChaseListeners();
        }
    };

    const finalClick = (event) => {
        if (attemptCount <= maxDodges) {
            event.preventDefault();
        } else {
            event.preventDefault();
            
            fbText.style.display = 'none';
            catchPhrase.style.display = 'inline';
            catchPhrase.style.opacity = '1';

            const url = fbLink.href;
            setTimeout(() => {
                window.open(url, '_blank');
                resetState();
            }, 1500);
        }
    };

    const addChaseListeners = () => {
        fbLink.addEventListener('mouseover', dodge);
        fbLink.addEventListener('touchstart', dodge, { passive: false });
    };

    const removeChaseListeners = () => {
        fbLink.removeEventListener('mouseover', dodge);
        fbLink.removeEventListener('touchstart', dodge);
    };

    const resetState = () => {
        fbText.style.display = 'inline';
        catchPhrase.style.display = 'none';
        catchPhrase.style.opacity = '0';
        fbText.textContent = 'Facebook';
        attemptCount = 0;
        addChaseListeners(); // Re-add listeners for the next round
    };

    // Initial setup
    addChaseListeners();
    fbLink.addEventListener('click', finalClick);
}
