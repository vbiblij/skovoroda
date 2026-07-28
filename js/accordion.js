document.addEventListener('DOMContentLoaded', () => {
    const accordion = document.querySelector('.accordion');
    if (!accordion) {
        return; // Exit if the accordion container isn't on the page
    }

    const regularItems = accordion.querySelectorAll('.accordion-item:not(.accordion-item-hidden)');
    const hiddenItem = accordion.querySelector('.accordion-item-hidden');
    const openedItems = new Set();
    const totalItemsToOpen = 5;

    accordion.addEventListener('click', (event) => {
        const header = event.target.closest('.accordion-header');
        if (!header) {
            return; // Exit if the click was not on a header
        }

        const itemToToggle = header.parentElement;
        
        // Don't do anything if the hidden item is not yet revealed
        if (itemToToggle.classList.contains('accordion-item-hidden') && !itemToToggle.classList.contains('revealed')) {
            return;
        }

        const currentlyActive = accordion.querySelector('.accordion-item.active');

        // If there is an active item and it's not the one we just clicked, close it
        if (currentlyActive && currentlyActive !== itemToToggle) {
            currentlyActive.classList.remove('active');
        }
        
        // Toggle the active state of the clicked item
        itemToToggle.classList.toggle('active');

        // --- Easter Egg Logic ---
        // Find the index of the item among the regular items to track it
        const itemIndex = Array.from(regularItems).indexOf(itemToToggle);
        if (itemIndex > -1 && itemToToggle.classList.contains('active')) {
            openedItems.add(itemIndex);
        }

        // Check if all have been opened and reveal the hidden item
        if (hiddenItem && openedItems.size === totalItemsToOpen) {
            hiddenItem.classList.add('revealed');
        }
    });
});
