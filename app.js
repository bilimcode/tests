// Секретный ключ (УБЕДИТЕСЬ, ЧТО ОН СОВПАДАЕТ С КЛЮЧОМ В teacher.html)
const SECRET_SALT = "MySchoolSecretKey2026";

let selectedSubject = '';
let selectedClass = '';

// Алгоритм генерации временного 6-значного кода на 1 ЧАС (60 минут)
function generateCurrentPassword() {
    const now = new Date();
    // Делим время в миллисекундах на количество миллисекунд в 1 часе (1000 * 60 * 60 = 3600000)
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

// Отсчет времени до конца текущего часа (Минуты и Секунды)
function updateTimer() {
    const now = new Date();
    
    const minutesLeft = 59 - now.getMinutes();
    const secondsLeft = 59 - now.getSeconds();

    // Форматируем с ведущими нулями (например, "05:09")
    const formattedMinutes = String(minutesLeft).padStart(2, '0');
    const formattedSeconds = String(secondsLeft).padStart(2, '0');

    const timerElement = document.getElementById('seconds-left');
    if (timerElement) {
        timerElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// Переключение шагов
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

// Отрисовка списка уроков из файла lessonsData.js
function loadLessons() {
    document.getElementById('lessons-heading').innerText = `${selectedSubject} — ${selectedClass}`;
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';

    // Получаем массив уроков из lessonsData.js
    const list = getLessonsFor(selectedSubject, selectedClass);

    list.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <div class="lesson-title"><i class="fa-solid fa-book-open"></i> ${lesson.title}</div>
            <a href="${lesson.url}" target="_blank" class="lesson-btn">
                Открыть задание <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        `;
        container.appendChild(card);
    });
}