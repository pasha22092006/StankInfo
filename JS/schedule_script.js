const days = [
  {
    name: 'Понедельник',
    load: 'Высокая',
    lessons: [
      { subject: 'Математический анализ', teacher: 'Иванов И.И.', room: '101' },
      { subject: 'История России', teacher: 'Петров П.П.', room: '202' },
      { subject: 'Физика', teacher: 'Сидоров С.С.', room: '303' },
      { subject: 'Дискретная математика', teacher: 'Алексеев А.А.', room: '404' }
    ]
  },
  {
    name: 'Вторник',
    load: 'Средняя',
    lessons: [
      { subject: 'Инфографика', teacher: 'Иванова И.И.', room: '105' },
      { subject: 'Физическая культура', teacher: 'Петрова П.П.', room: 'Спортзал' },
      { subject: 'Иностранный язык', teacher: 'Сидорова С.С.', room: '305' },
      { subject: '', teacher: '', room: '' }
    ]
  },
  {
    name: 'Среда',
    load: 'Низкая',
    lessons: [
      { subject: 'Физика', teacher: 'Алексеев А.А.', room: '401' },
      { subject: '', teacher: '', room: '' },
      { subject: '', teacher: '', room: '' },
      { subject: '', teacher: '', room: '' }
    ]
  },
  {
    name: 'Четверг',
    load: 'Высокая',
    lessons: [
      { subject: 'Структурное программирование', teacher: 'Кузнецов К.К.', room: '501' },
      { subject: 'Физическая культура', teacher: 'Петрова П.П.', room: 'Спортзал' },
      { subject: 'Программирование специализированных вычислительных устройств', teacher: 'Сидорова С.С.', room: '601' },
      { subject: '', teacher: '', room: '' }
    ]
  },
  {
    name: 'Пятница',
    load: 'Средняя',
    lessons: [
      { subject: 'Введение в проектную деятельность: технологическое и социальное проектирование', teacher: 'Михайлов М.М.', room: '701' },
      { subject: '', teacher: '', room: '' },
      { subject: '', teacher: '', room: '' },
      { subject: '', teacher: '', room: '' }
    ]
  }
];

const times = ['08:30-10:10', '10:20-12:00', '12:20-14:00', '14:10-15:50'];

let currentDay = 0;

function updateSlider() {
  document.querySelector('.day-name').textContent = days[currentDay].name;

  const indicator = document.querySelector('.load-indicator');
  const loadText = document.querySelector('.load-text');
  const lessonsCount = days[currentDay].lessons.filter(lesson => lesson.subject).length;

  if (lessonsCount === 4) {
    indicator.style.backgroundColor = 'red';
    loadText.textContent = 'Высокая нагрузка';
  } else if (lessonsCount === 3) {
    indicator.style.backgroundColor = 'orange';
    loadText.textContent = 'Средняя нагрузка';
  } else if (lessonsCount === 2) {
    indicator.style.backgroundColor = 'yellow';
    loadText.textContent = 'Низкая нагрузка';
  } else if (lessonsCount === 1) {
    indicator.style.backgroundColor = 'green';
    loadText.textContent = 'Очень низкая нагрузка';
  } else {
    indicator.style.backgroundColor = 'gray';
    loadText.textContent = 'Нет занятий';
  }

  const schedule = document.querySelector('.schedule');
  schedule.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    const lesson = days[currentDay].lessons[i];
    const item = document.createElement('div');
    item.className = 'schedule-item';

    const time = document.createElement('div');
    time.className = 'schedule-time';
    time.textContent = times[i];

    const subject = document.createElement('div');
    subject.className = 'schedule-subject';
    subject.textContent = lesson.subject || 'Занятие отсутствует';

    const teacher = document.createElement('div');
    teacher.className = 'schedule-teacher';
    teacher.textContent = lesson.teacher ? `Преподаватель: ${lesson.teacher}` : '';

    const room = document.createElement('div');
    room.className = 'schedule-room';
    room.textContent = lesson.room ? `Аудитория: ${lesson.room}` : '';

    item.appendChild(time);
    item.appendChild(subject);
    if (lesson.teacher) item.appendChild(teacher);
    if (lesson.room) item.appendChild(room);

    schedule.appendChild(item);
  }
}

document.querySelector('.arrow.left').addEventListener('click', () => {
  currentDay = (currentDay - 1 + days.length) % days.length;
  updateSlider();
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  currentDay = (currentDay + 1) % days.length;
  updateSlider();
});

updateSlider();






// popup
function openPopup(type) {
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');

  if (type === 'download') {
    popupText.innerHTML = 'Выберите предмет для скачивания материалов<br><br>Математический анализ<br>История России<br>Физика<br>Дискретная математика<br>Структурное программирование<br>Инфографика<br>Физическая культура<br>Иностранный язык<br>Программирование специализированных вычислительных устройств<br>Введение в проектную деятельность';
  } else if (type === 'exam') {
    popupText.innerHTML = 'Экзамены и зачеты<br><br>Математический анализ - 12 июня, 10:00<br>Физика - 15 июня, 12:00<br>История России - 17 июня, 14:00<br>Иностранный язык - 20 июня, 09:00';
  } else if (type === 'consultation') {
    popupText.innerHTML = 'Расписание консультаций<br><br>Математический анализ - 10 июня, 10:00<br>Физика - 13 июня, 12:00<br>История России - 16 июня, 14:00<br>Иностранный язык - 18 июня, 09:00';
  } else if (type === 'checklist') {
    popupText.innerHTML = 'Ваш чек-лист<br><br> Сдано: Математический анализ<br>Сдано: История России<br>Не сдано: Физика<br>Не сдано: Дискретная математика<br><br>Средний балл: 4.0';
  }

  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}