document.addEventListener('DOMContentLoaded', () => {
    const grainText = document.getElementById('grain-text');
    const grainAudio = document.getElementById('grain-audio');
    const prevButton = document.getElementById('prev-grain');
    const nextButton = document.getElementById('next-grain');

    const grains = [
        {
            text: "Бери вершину і матимеш середину.",
            audio: "assets/aphorism-1.mp3" // Зауваження: це демонстраційний файл
        },
        {
            text: "З видимого пізнавай невидиме.",
            audio: "assets/aphorism-2.mp3" // Потрібно створити цей аудіофайл
        },
        {
            text: "Хто думає про науку, той любить її, а хто її любить, той ніколи не перестає вчитися.",
            audio: "assets/aphorism-3.mp3" // Потрібно створити цей аудіофайл
        },
        {
            text: "Що може бути солодше за те, коли я пізнаю себе?",
            audio: "assets/aphorism-4.mp3" // Потрібно створити цей аудіофайл
        }
    ];

    let currentGrainIndex = 0;

    function loadGrain(index) {
        const grain = grains[index];
        grainText.textContent = `“${grain.text}”`;
        const audioSource = grainAudio.querySelector('source');
        audioSource.src = grain.audio;
        grainAudio.load(); // Перезавантажуємо аудіо, щоб застосувати нове джерело
    }

    nextButton.addEventListener('click', () => {
        currentGrainIndex = (currentGrainIndex + 1) % grains.length;
        loadGrain(currentGrainIndex);
    });

    prevButton.addEventListener('click', () => {
        currentGrainIndex = (currentGrainIndex - 1 + grains.length) % grains.length;
        loadGrain(currentGrainIndex);
    });

    // Завантажити перше зерно при завантаженні сторінки
    loadGrain(currentGrainIndex);
});