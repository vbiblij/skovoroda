document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reflection-form');
    const questionsSection = document.getElementById('questions-section');
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');

    const concludingWords = [
        {
            title: "Шукай себе всередині",
            text: "Сродна праця — це та, що відповідає твоїй природі. Ти вже маєш відповіді в собі. Прислухайся до свого серця, воно підкаже шлях. Робота, що приносить радість, і є твоє покликання."
        },
        {
            title: "Природа — твій найкращий порадник",
            text: "Подібно до того, як птах народжений для польоту, а риба — для води, так і ти народжений для своєї справи. Не йди проти своєї природи. Те, що дається легко і з насолодою, — ознака сродності."
        },
        {
            title: "Щастя у праці, а не в нагороді",
            text: "Не шукай щастя в зовнішніх речах: багатстві чи славі. Справжнє щастя — це сам процес праці, яка відповідає твоїй душі. Коли ти займаєшся сродною працею, ти вже щасливий."
        },
        {
            title: "Пізнай себе, і знайдеш свою справу",
            text: "Твої мрії та захоплення — це ключ до пізнання себе. Не ігноруй їх. Світ може нав'язувати свої правила, але лише ти знаєш, що для тебе є істинним. Сродна праця починається з самопізнання."
        }
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Вибираємо випадкове напутнє слово
        const randomIndex = Math.floor(Math.random() * concludingWords.length);
        const result = concludingWords[randomIndex];

        resultTitle.textContent = result.title;
        resultContent.innerHTML = `<p>${result.text}</p><p class="skovoroda-signature">- Григорій Сковорода (інтерпретація)</p>`;

        // Показуємо результати та ховаємо питання
        questionsSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    });
});