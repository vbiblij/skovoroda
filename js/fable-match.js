document.addEventListener('DOMContentLoaded', () => {
    const fables = [
        { label: 'Ворон і Чиж', icon: '🦅' },
        { label: 'Чиж і Щиглик', icon: '🐦' },
        { label: 'Орел і Сорока', icon: '🦅' },
        { label: 'Мурашка і Свиня', icon: '🐜' },
        { label: 'Орел і Черепаха', icon: '🐢' },
        { label: 'Сова і Дрізд', icon: '🦉' },
        { label: 'Змія і Буфон', icon: '🐍' },
        { label: 'Собака та Кобила', icon: '🐕' },
        { label: 'Верблюд і Олень', icon: '🐪' },
        { label: 'Зозуля та Дрізд', icon: '🐦' },
        { label: 'Собака і Вовк', icon: '🐺' },
        { label: 'Кріт і Лінкс', icon: '🐾' },
        { label: 'Щука і Рак', icon: '🐟' },
        { label: 'Бджола та Шершень', icon: '🐝' },
        { label: 'Олениця та Кабан', icon: '🐗' },
        { label: 'Діамант та Смарагд', icon: '💎' }
    ];

    const pairs = [];
    fables.forEach((item, index) => {
        pairs.push({ id: index, label: item.label, icon: item.icon });
        pairs.push({ id: index, label: item.label, icon: item.icon });
    });

    const shuffle = array => {
        const cloned = [...array];
        for (let i = cloned.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
        }
        return cloned;
    };

    const board = shuffle(pairs);
    const gameGrid = document.getElementById('game-grid');
    const message = document.getElementById('game-message');
    const scoreValue = document.getElementById('score-value');
    const attemptsValue = document.getElementById('attempts-value');
    const matchedValue = document.getElementById('matched-value');

    let firstSelection = null;
    let locked = false;
    let score = 0;
    let attempts = 0;
    let matchedCount = 0;

    const updateStats = () => {
        scoreValue.textContent = score;
        attemptsValue.textContent = attempts;
        matchedValue.textContent = `${matchedCount} / ${fables.length}`;
    };

    const setMessage = text => {
        message.textContent = text;
    };

    const resetSelection = () => {
        firstSelection = null;
        locked = false;
    };

    const handleCardClick = (cardElement, cardData) => {
        if (locked || cardElement.classList.contains('matched')) return;
        if (cardElement.classList.contains('selected')) {
            cardElement.classList.remove('selected');
            firstSelection = null;
            setMessage('Вибір знято. Обери іншу картку.');
            return;
        }

        cardElement.classList.add('selected');

        if (!firstSelection) {
            firstSelection = { element: cardElement, data: cardData };
            setMessage('Обери другу картку, щоб знайти пару.');
            return;
        }

        attempts += 1;
        const secondSelection = { element: cardElement, data: cardData };

        if (firstSelection.data.id === secondSelection.data.id && firstSelection.element !== secondSelection.element) {
            score += 10;
            matchedCount += 1;
            firstSelection.element.classList.add('matched');
            secondSelection.element.classList.add('matched');
            firstSelection.element.classList.remove('selected');
            secondSelection.element.classList.remove('selected');
            setMessage(`Правильно! Це пара: “${cardData.label}”.`);
            updateStats();
            resetSelection();

            if (matchedCount === fables.length) {
                setMessage('Вітаємо! Ти підібрав усі пари байок Сковороди.');
            }
            return;
        }

        locked = true;
        score = Math.max(0, score - 2);
        setMessage('Такої байки не існує. Спробуй ще раз.');
        updateStats();

        setTimeout(() => {
            firstSelection.element.classList.remove('selected');
            secondSelection.element.classList.remove('selected');
            resetSelection();
        }, 900);
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
        label.textContent = cardData.label;

        card.appendChild(icon);
        card.appendChild(label);
        card.addEventListener('click', () => handleCardClick(card, cardData));
        gameGrid.appendChild(card);
    });

    updateStats();
});