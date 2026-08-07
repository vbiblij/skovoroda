document.addEventListener('DOMContentLoaded', () => {
    const pairs = [
        { pairLabel: 'Ворон і Чиж', cards: [{ name: 'Ворон', icon: '🦅' }, { name: 'Чиж', icon: '🐦' }] },
        { pairLabel: 'Орел і Сорока', cards: [{ name: 'Орел', icon: '🦅' }, { name: 'Сорока', icon: '🐦' }] },
        { pairLabel: 'Мурашка і Свиня', cards: [{ name: 'Мурашка', icon: '🐜' }, { name: 'Свиня', icon: '🐖' }] },
        { pairLabel: 'Орел і Черепаха', cards: [{ name: 'Орел', icon: '🦅' }, { name: 'Черепаха', icon: '🐢' }] },
        { pairLabel: 'Сова і Дрізд', cards: [{ name: 'Сова', icon: '🦉' }, { name: 'Дрізд', icon: '🐦' }] },
        { pairLabel: 'Змія і Буфон', cards: [{ name: 'Змія', icon: '🐍' }, { name: 'Буфон', icon: '🐸' }] },
        { pairLabel: 'Собака та Кобила', cards: [{ name: 'Собака', icon: '🐕' }, { name: 'Кобила', icon: '🐎' }] },
        { pairLabel: 'Верблюд і Олень', cards: [{ name: 'Верблюд', icon: '🐫' }, { name: 'Олень', icon: '🦌' }] },
        { pairLabel: 'Зозуля та Дрізд', cards: [{ name: 'Зозуля', icon: '🐦' }, { name: 'Дрізд', icon: '🐦' }] },
        { pairLabel: 'Кріт і Лінкс', cards: [{ name: 'Кріт', icon: '🦡' }, { name: 'Лінкс', icon: '🐱' }] },
        { pairLabel: 'Щука і Рак', cards: [{ name: 'Щука', icon: '🐟' }, { name: 'Рак', icon: '🦀' }] },
        { pairLabel: 'Бджола та Шершень', cards: [{ name: 'Бджола', icon: '🐝' }, { name: 'Шершень', icon: '🐝' }] },
        { pairLabel: 'Олениця та Кабан', cards: [{ name: 'Олениця', icon: '🦌' }, { name: 'Кабан', icon: '🐗' }] },
        { pairLabel: 'Діамант та Смарагд', cards: [{ name: 'Діамант', icon: '💎' }, { name: 'Смарагд', icon: '💚' }] }
    ];

    const cards = pairs.flatMap((pair, pairId) =>
        pair.cards.map(item => ({
            pairId,
            pairLabel: pair.pairLabel,
            name: item.name,
            icon: item.icon
        }))
    );

    const shuffle = array => {
        const cloned = [...array];
        for (let i = cloned.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
        }
        return cloned;
    };

    const board = shuffle(cards);
    const gameGrid = document.getElementById('game-grid');
    const scoreValue = document.getElementById('score-value');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.getElementById('modal-close');

    let firstSelection = null;
    let score = 0;

    const updateStats = () => {
        scoreValue.textContent = score;
    };

    const showModal = text => {
        modalText.textContent = text;
        modalOverlay.classList.remove('hidden');
    };

    const hideModal = () => {
        modalOverlay.classList.add('hidden');
    };

    modalClose.addEventListener('click', hideModal);

    const resetSelection = () => {
        firstSelection = null;
    };

    const handleCardClick = (cardElement, cardData) => {
        if (cardElement.classList.contains('matched')) return;
        if (cardElement.classList.contains('selected')) {
            cardElement.classList.remove('selected');
            firstSelection = null;
            return;
        }

        cardElement.classList.add('selected');

        if (!firstSelection) {
            firstSelection = { element: cardElement, data: cardData };
            return;
        }

        const secondSelection = { element: cardElement, data: cardData };

        if (firstSelection.data.pairId === secondSelection.data.pairId && firstSelection.element !== secondSelection.element) {
            score += 1;
            firstSelection.element.classList.add('matched');
            secondSelection.element.classList.add('matched');
            firstSelection.element.classList.remove('selected');
            secondSelection.element.classList.remove('selected');
            updateStats();
            resetSelection();
            showModal(`Байка: ${cardData.pairLabel}.`);
            return;
        }

        score = Math.max(0, score - 1);
        updateStats();
        firstSelection.element.classList.remove('selected');
        secondSelection.element.classList.remove('selected');
        resetSelection();
        showModal('Нема такої байки.');
    };

    board.forEach((cardData, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card';
        card.dataset.index = String(index);

        const icon = document.createElement('span');
        icon.className = 'card-icon';
        icon.textContent = cardData.icon;

        const label = document.createElement('span');
        label.className = 'card-text';
        label.textContent = cardData.name;

        card.appendChild(icon);
        card.appendChild(label);
        card.addEventListener('click', () => handleCardClick(card, cardData));
        gameGrid.appendChild(card);
    });

    updateStats();
});