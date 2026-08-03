document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const grainTitle = document.getElementById('grain-title');
    const grainDescription = document.getElementById('grain-description');
    const grainAudio = document.getElementById('grain-audio');
    const audioSource = grainAudio.querySelector('source');
    const body = document.querySelector('body');

    const btn17c = document.getElementById('btn-17c');
    const btn20c = document.getElementById('btn-20c');
    const prevButton = document.getElementById('prev-grain');
    const nextButton = document.getElementById('next-grain');

    // Data
    const grains = [
        {
            "17c": {
                title: "Два коштовні камені",
                description: "Байка розповідає про суперечку між Алмазом та Яхонтом. Твердий і блискучий Алмаз, що символізує гострий розум, вихваляється своєю міцністю. Натомість, прекрасний Яхонт, уособлення доброго серця, пишається своєю красою та ніжним сяйвом. Мораль байки: гострий розум без доброти може бути небезпечним, але добре серце, кероване розумом, є істинним благом.",
                audio: "assets/dva_koshtovni_kameni.MP3",
                background: "url('../assets/background-nature.jpg')"
            },
            "21c": {
                title: "Процесор і Дизайн",
                description: "Уявіть суперечку між найновішим процесором (Алмаз) та досконалим графічним дизайном (Яхонт). Процесор пишається своєю неймовірною швидкістю обчислень і здатністю вирішувати найскладніші логічні задачі. Дизайн же втілює естетику, емоційний зв'язок та зручність для користувача. Мораль: потужний функціонал без людяності та краси відштовхує, але інтуїтивний та привабливий продукт, підкріплений надійною технологією, завойовує серця.",
                audio: "assets/dva_koshtovni_kameni_modern.MP3", // Примітка: цей файл є плейсхолдером
                background: "url('../assets/background-work.jpg')"
            }
        },
        // Сюди можна додати більше байок
    ];

    // State
    let currentGrainIndex = 0;
    let currentCentury = '17c';

    // Functions
    function loadGrain(grainIndex, century) {
        const grainData = grains[grainIndex][century];

        // Fade out
        grainTitle.style.opacity = 0;
        grainDescription.style.opacity = 0;

        setTimeout(() => {
            grainTitle.textContent = grainData.title;
            grainDescription.textContent = grainData.description;
            body.style.backgroundImage = grainData.background;

            // Fade in
            grainTitle.style.opacity = 1;
            grainDescription.style.opacity = 1;
        }, 300); // Should match CSS transition duration

        if (audioSource.src !== grainData.audio) {
            audioSource.src = grainData.audio;
            grainAudio.load();
        }
    }

    function updateCenturyToggle() {
        if (currentCentury === '17c') {
            btn17c.classList.add('active');
            btn20c.classList.remove('active');
        } else {
            btn17c.classList.remove('active');
            btn20c.classList.add('active');
        }
    }

    // Event Listeners
    btn17c.addEventListener('click', () => {
        currentCentury = '17c';
        updateCenturyToggle();
        loadGrain(currentGrainIndex, currentCentury);
    });

    btn20c.addEventListener('click', () => {
        currentCentury = '21c';
        updateCenturyToggle();
        loadGrain(currentGrainIndex, currentCentury);
    });

    nextButton.addEventListener('click', () => {
        currentGrainIndex = (currentGrainIndex + 1) % grains.length;
        loadGrain(currentGrainIndex, currentCentury);
    });

    prevButton.addEventListener('click', () => {
        currentGrainIndex = (currentGrainIndex - 1 + grains.length) % grains.length;
        loadGrain(currentGrainIndex, currentCentury);
    });

    // Initial Load
    updateCenturyToggle();
    loadGrain(currentGrainIndex, currentCentury);
});
