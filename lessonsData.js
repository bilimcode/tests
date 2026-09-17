// lessonsData.js

const lessonsData = {
    "Информатика": {
        "5 Класс": [
            { id: 1, title: "Урок 1. Техника безопасности и правила поведения в кабинете", url: "https://example.com/info5-1" },
            { id: 2, title: "Урок 2. Информация и информационные процессы", url: "https://example.com/info5-2" },
            { id: 3, title: "Урок 3. Устройство компьютера и его основные блоки", url: "https://example.com/info5-3" },
            // Добавьте остальные уроки до 34...
        ],
        "6 Класс": [
            { id: 1, title: "Урок 1. Компьютерные сети и Интернет", url: "https://example.com/info6-1" },
            { id: 2, title: "Урок 2. Безопасность в сети Интернет", url: "https://example.com/info6-2" },
            { id: 3, title: "Урок 3. Устройство системного блока и память компьютера", url: "https://docs.google.com/forms/d/e/1FAIpQLSfmIBQjVxhMnSln23oPqc6jk7bII2BvGIsgSGXeDk7D6H4cvw/viewform?usp=sharing&ouid=107170903566991386372" },
            // ...
        ],
        "7 Класс": [
            { id: 1, title: "Урок 1. Введение в программирование", url: "https://example.com/info7-1" },
            // ...
        ],
        "8 Класс": [
            { id: 1, title: "Урок 1. Структура данных и алгоритмы", url: "https://example.com/info8-1" },
            // ...
        ]
    },
    "Робототехника": {
        "5 Класс": [
            { id: 1, title: "Урок 1. Введение в робототехнику", url: "https://example.com/robot5-1" },
            { id: 2, title: "Урок 2. Сборка базовой платформы", url: "https://example.com/robot5-2" },
            // ...
        ],
        "6 Класс": [
            { id: 1, title: "Урок 1. Основы работы с ультразвуковым датчиком", url: "https://example.com/robot6-1" },
            // ...
        ],
        "7 Класс": [
            { id: 1, title: "Урок 1. в разработке", url: "https://example.com/robot7-1" },
            { id: 1, title: "Урок 1. в разработке", url: "https://example.com/robot7-1" },
            { id: 1, title: "Урок 1. Собери робота (образец)", url: "https://drive.google.com/file/d/1yRqFD2dJa5uBIOIiQfZAeJEfzYxHAjcU/view?usp=drive_link" },
            // ...
        ],
        "8 Класс": [
            { id: 1, title: "Урок 1. Программирование автономных роботов", url: "https://example.com/robot8-1" },
            // ...
        ]
    }
};

// Функция-помощник для генерации шаблона из 34 уроков, если ссылки ещё не запущены
function getLessonsFor(subject, className) {
    if (lessonsData[subject] && lessonsData[subject][className]) {
        return lessonsData[subject][className];
    }
    
    // Если для класса пока нет индивидуального списка, генерируются 34 базовых урока
    return Array.from({ length: 34 }, (_, i) => ({
        id: i + 1,
        title: `Урок ${i + 1}. Тема занятия`,
        url: "#"
    }));
}