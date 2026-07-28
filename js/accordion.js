document.addEventListener('DOMContentLoaded', () => {
    // Select only the non-hidden items to attach listeners
    const accordionItems = document.querySelectorAll('.accordion-item:not(.accordion-item-hidden)');
    const hiddenItem = document.querySelector('.accordion-item-hidden');
    const openedItems = new Set();
    const totalItemsToOpen = 5;

    if (!accordionItems.length || !hiddenItem) {
        return; // Exit if the required elements aren't on the page
    }

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');

            // If there is an active item and it's not the one we just clicked, close it
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Toggle the active state of the clicked item
            item.classList.toggle('active');

            // Track opened items
            if (item.classList.contains('active')) {
                openedItems.add(index);
            }

            // Check if all have been opened
            if (openedItems.size === totalItemsToOpen) {
                hiddenItem.classList.add('revealed');
            }
        });
    });
});
