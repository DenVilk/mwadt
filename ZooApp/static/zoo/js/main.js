function updateTimer() {
    // Получаем сохраненное время из localStorage
    let currentTime = localStorage.getItem('countdown') || 3600;

    const countdownElement = document.getElementById('countdown');

    countdownElement.addEventListener('click', (e)=>{
        localStorage.setItem('countdown', currentTime);
        currentTime = 3600;
    })

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Обновляем таймер
    function update() {
        countdownElement.textContent = `Обратный отсчет: ${formatTime(currentTime)}`;

        // Уменьшаем время на 1 секунду
        if (currentTime > 0) {
            currentTime--;
            // Сохраняем текущее время в localStorage
            localStorage.setItem('countdown', currentTime);
        } else {
            clearInterval(interval);
            alert('Обратный отсчет завершен!');
        }
    }

    // Запускаем таймер каждую секунду
    const interval = setInterval(update, 1000);
}


window.addEventListener("load", () => {
    function calculateAge(birthDate) {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    }

    // Функция для определения дня недели
    function getDayOfWeek(birthDate) {
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = new Date(birthDate).getDay();
        return daysOfWeek[dayIndex];
    }

    // Получаем дату рождения от пользователя
    if (localStorage.getItem("age18") == null) {
        const birthDate = prompt('Введите дату рождения в формате ГГГГ-ММ-ДД (например, 2000-01-01):');

        // Расчет возраста
        const age = calculateAge(birthDate);

        // Проверка на совершеннолетие
        if (age >= 18) {
            // Определение дня недели
            const dayOfWeek = getDayOfWeek(birthDate);
            alert(`Ваш возраст: ${age} лет. День недели вашего рождения: ${dayOfWeek}`);
            localStorage.setItem("age18", true);
        } else {
            // Алерт о необходимости разрешения родителей
            let res = confirm('Вы несовершеннолетний. Для использования сайта необходимо разрешение родителей.');
            if (!res) window.close();
            localStorage.setItem("age18", true);
        }
    }

    updateTimer();
})