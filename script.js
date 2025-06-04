document.addEventListener('DOMContentLoaded', () => {
  const daysContainer = document.getElementById('calendar-days');
  const monthYearLabel = document.getElementById('month-year');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');

  let currentDate = new Date();

  function renderCalendar(date) {
  daysContainer.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7;

  const monthName = date.toLocaleString('default', { month: 'long' });
  monthYearLabel.textContent = `${capitalize(monthName)} ${year}`;

  // Atualiza texto da data de hoje
  const todayLabel = document.getElementById('today-label');
  todayLabel.textContent = `${formatarDataCompleta(new Date())}`;

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('div');
    daysContainer.appendChild(empty);
  }

  const today = new Date();

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const btn = document.createElement('button');
    btn.textContent = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    btn.addEventListener('click', () => {
      window.location.href = `criar-compromisso.html?data=${dateStr}`;
    });

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      btn.classList.add('current');
    }

    daysContainer.appendChild(btn);
  }
}

// Função para exibir "31 de Maio de 2025"
function formatarDataCompleta(date) {
  const dias = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  renderCalendar(currentDate);
});
