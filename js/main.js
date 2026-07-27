document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "Пізнай свій край, себе, свій рід, свій народ, свою землю — і ти побачиш шлях у життя.",
        "Що може бути солодше за те, коли я пізнаю себе?",
        "Найголовніше в житті — це пізнати самого себе.",
        "Більше думай і тоді вирішуй.",
        "З видимого пізнавай невидиме.",
        "Світло бачиться тоді, коли світло в очах є.",
        "Не той дурний, хто не знає... але той, хто знати не хоче.",
        "Щасливий, хто мав змогу знайти щасливе життя. Але щасливіший той, хто вміє ним користуватися."
    ];

    // --- Navigation Loader ---
    const loadNav = async () => {
        const header = document.getElementById('main-header');
        if (!header) return;

        try {
            const response = await fetch('nav.html');
            if (!response.ok) throw new Error('Navigation not found');
            const navHtml = await response.text();
            header.innerHTML = navHtml;

            // Set active link
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = header.querySelectorAll('nav a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            console.error('Failed to load navigation:', error);
            header.innerHTML = '<p style="text-align:center; color: var(--clay);">Could not load navigation.</p>';
        }
    };

    loadNav();

    // --- Mirror Page Interaction ---
    const mirror = document.getElementById('mirror');
    const quoteContainer = document.getElementById('quote-container');
    let interactionComplete = false;

    const revealQuote = () => {
        if (interactionComplete || !mirror || !quoteContainer) return;
        interactionComplete = true;

        // Fade out the initial question
        mirror.classList.add('fade-out');

        // Prepare the new quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const quoteElement = document.createElement('p');
        quoteElement.className = 'quote-text';
        quoteElement.textContent = `“${randomQuote}”`;
        
        // Add to DOM
        quoteContainer.appendChild(quoteElement);

        // Trigger the fade-in animation
        setTimeout(() => {
            quoteElement.classList.add('visible');
        }, 100); // A small delay ensures the transition triggers correctly
    };
    
    // Listen for the first interaction
    document.body.addEventListener('click', revealQuote, { once: true });
    document.body.addEventListener('mousemove', revealQuote, { once: true });

});
