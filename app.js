// Секретный ключ
const SECRET_SALT = "MySchoolSecretKey2026";

let selectedSubject = '';
let selectedClass = '';

// Конфигурация для уроков с распределением по вариантам (СОР / СОЧ)
// Ключ: "Класс_НомерУрока"
// Вы можете легко добавлять сюда ссылки (сколько угодно в массив)
const MULTI_FORM_LESSONS = {
    "6 Класс_7": [
        'https://forms.gle/qhFHbqBBfK9FgVsi7',
        'https://forms.gle/CbP22ZSttDGz5snHA',
        'https://forms.gle/TWWC5ai7mqn6CzrN6'
    ],
    "6 Класс_15": [
        // 'ссылка_вариант_1',
        // 'ссылка_вариант_2'
    ],
    "6 Класс_25": [
        // Добавьте ссылки при необходимости
    ],
    "6 Класс_33": [
        // Добавьте ссылки при необходимости
    ],
    
    "5 Класс_7": [
        // У вас сейчас 1 форма, она будет открываться напрямую. 
        // Если добавите вторую, включится авто-распределение по ПК!
        'https://docs.google.com/forms/d/e/1FAIpQLSe0SG9XSA3atSjmzSxIQEpkLaX438C8swtrRF943loL1L7gdw/viewform?usp=header'
    ],
    "5 Класс_15": [
        // 'ссылка_1', 'ссылка_2'
    ],
    "5 Класс_25": [
        // 'ссылка_1', 'ссылка_2'
    ],
    "5 Класс_33": [
        // 'ссылка_1', 'ссылка_2'
    ]
};

// Генерация временного пароля
function generateCurrentPassword() {
    const now = new Date();
    const hourTimestamp = Math.floor(now.getTime() / 3600000);
    
    const str = SECRET_SALT + hourTimestamp;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; 
    }
    const code = Math.abs(hash % 900000) + 100000;
    return code.toString();
}

// Таймер обновления пароля
function updateTimer() {
    const now = new Date();
    const minutesLeft = 59 - now.getMinutes();
    const secondsLeft = 59 - now.getSeconds();

    const formattedMinutes = String(minutesLeft).padStart(2, '0');
    const formattedSeconds = String(secondsLeft).padStart(2, '0');

    const timerElement = document.getElementById('seconds-left');
    if (timerElement) {
        timerElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// Навигация по шагам
function goToStep(step) {
    document.querySelectorAll('.step-page').forEach(page => page.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');

    document.getElementById('bc-subject').className = step >= 1 ? 'active' : '';
    document.getElementById('bc-class').className = step >= 2 ? 'active' : '';
    document.getElementById('bc-pass').className = step >= 3 ? 'active' : '';
    document.getElementById('bc-lessons').className = step >= 4 ? 'active' : '';
}

function selectSubject(subjectName, iconClass) {
    selectedSubject = subjectName;
    document.getElementById('bc-subject').innerHTML = `<i class="fa-solid ${iconClass}"></i> ${subjectName}`;
    goToStep(2);
}

function selectClass(className) {
    selectedClass = className;
    document.getElementById('bc-class').innerHTML = `<i class="fa-solid fa-users"></i> ${className}`;
    goToStep(3);
}

function verifyPassword() {
    const inputVal = document.getElementById('pass-input').value.trim();
    const validPassword = generateCurrentPassword();

    if (inputVal === validPassword) {
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('pass-input').value = '';
        loadLessons();
        goToStep(4);
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

// Отрисовка списка уроков
function loadLessons() {
    document.getElementById('lessons-heading').innerText = `${selectedSubject} — ${selectedClass}`;
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';

    const list = getLessonsFor(selectedSubject, selectedClass);

    list.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        
        // Проверяем, есть ли заготовленные формы для данного класса и номера урока
        const configKey = `${selectedClass}_${lesson.id}`;
        const formsArray = MULTI_FORM_LESSONS[configKey];
        const hasMultipleForms = formsArray && formsArray.length > 0;

        if (hasMultipleForms) {
            // Если форма одна — открываем её напрямую, если больше одной — включаем распределение по ПК
            card.innerHTML = `
                <div class="lesson-title"><i class="fa-solid fa-book-open"></i> ${lesson.title}</div>
                <button type="button" class="lesson-btn multi-form-btn">
                    Открыть задание <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
            `;
            
            const btn = card.querySelector('.multi-form-btn');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Если ссылка всего одна — открываем её без запроса номера ПК
                if (formsArray.length === 1) {
                    window.open(formsArray[0], '_blank');
                    return;
                }

                // Если ссылок несколько — распределяем по номерам ПК (от 1 до 24)
                var p = localStorage.getItem('pc_no');
                while(!p || isNaN(p) || p < 1 || p > 24) {
                    p = prompt('Введите номер вашего компьютера (от 1 до 24):');
                    if (p === null) return;
                }
                localStorage.setItem('pc_no', p.trim());
                
                var index = (parseInt(p) - 1) % formsArray.length;
                window.location.href = formsArray[index];
            });

        } else {
            // Стандартная логика для остальных уроков
            card.innerHTML = `
                <div class="lesson-title"><i class="fa-solid fa-book-open"></i> ${lesson.title}</div>
                <a href="${lesson.url}" target="_blank" class="lesson-btn">
                    Открыть задание <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            `;
        }

        container.appendChild(card);
    });
}