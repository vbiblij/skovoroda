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
                title: "Дурень шукає собі місце, а розумного і в кутку видно",
                description: "Байка розповідає про те як Смарагд пише своєму другу діамантію, і розповідає про те що він при дворі і весь такий сяючий а діамант не оброблений у вулканічному попелі і не сяє",
                audio: "assets/dva_koshtovni_kameni.MP3",
                background: "url('../assets/background-nature.jpg')"
            },
            "21c": {
                title: "Сучасна інтерпретація: Два коштовні камені",
                description: "Історія може бути адаптована до сучасного контексту, де смарагд та діамант представляють двох колег у корпоративному середовищі. ",
                audio: "assets/dva_koshtovni_kameni_modern.MP3", // Примітка: цей файл є плейсхолдером
                background: "url('../assets/background-work.jpg')"
            }
        },
        {
            "17c": {
                title: "Плоди пізнаються по дереву",
                description: "Ворона та чиж сидять на дереві та співаютья. Ворона дорікає чижу, що він не має таких же здібностей, як вона. ................. ",
                audio: "assets/vorona_i_chyzh.MP3",
                background: "url('../assets/background-nature.jpg')"
            },
            "21c": {
                title: "Сучасна інтерпретація: Ворона та Чиж",
                description: "Історія може бути адаптована до сучасного контексту, де ворона та чиж представляють двох колег у корпоративному середовищі. Ворона, яка має великий досвід та вплив, критикує чижика за його новаторські ідеї та підхід до роботи. ",
                audio: "assets/vorona_i_chyzh_modern.MP3", // Примітка: цей файл є плейсхолдером
                background: "url('../assets/background-work.jpg')"
            }
        },
        {
            "17c": {
                title: "Голосом і шерстиною ти справді схожий але серце твоє стоїть далеко",
                description: "Байка розповідає про вовка, який намагається обманути собаку. Вовк намагається обманути собаку, набивається  в друзі, але собака відчуває його справжню природу.",
                audio: "assets/sobaka_ta_vovk.MP3",
                background: "url('../assets/background-nature.jpg')"
            },
            "21c": {
                title: "Сучасна інтерпретація: Собака та Вовк",
                description: "У сучасній інтерпретації, ця байка може розповідати про онлайн-ізгоя, який намагається здаватися кимось іншим, використовуючи фальшиві профілі, але його справжня сутність розкривається через його дії та слова. Мораль: справжнє обличчя людини не сховати за маскою.",
                audio: "assets/sobaka_ta_vovk_modern.MP3", // Placeholder
                background: "url('../assets/background-work.jpg')"
            }
        }
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
            window.scrollTo(0, 0);
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