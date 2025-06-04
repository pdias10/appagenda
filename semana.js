document.addEventListener('DOMContentLoaded', () => {
  const weekContainer = document.getElementById('week-days');
  const weekLabel = document.getElementById('week-range');
  const todayLabel = document.getElementById('today-label');
  const prevBtn = document.getElementById('prev-week');
  const nextBtn = document.getElementById('next-week');

  let currentDate = new Date();

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Start on Monday
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    return start;
  }

  function formatarDataCompleta(date) {
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    return `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
  }

  function renderWeek(date) {
  const grid = document.getElementById('week-grid');
  grid.innerHTML = "";

  const start = getStartOfWeek(date);
  const dias = [];

  for (let i = 0; i < 7; i++) {
    const dia = new Date(start);
    dia.setDate(start.getDate() + i);
    dias.push(dia);
  }

  const inicio = dias[0];
  const fim = dias[6];
  weekLabel.textContent = `Semana de ${formatarDataCompleta(inicio)} a ${formatarDataCompleta(fim)}`;
  todayLabel.textContent = `${formatarDataCompleta(new Date())}`;

  // Cabeçalho da grade: vazado + dias
  const headerVazio = document.createElement('div');
  headerVazio.classList.add('time-cell');
  grid.appendChild(headerVazio);

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  dias.forEach(dia => {
    const head = document.createElement('div');
     head.classList.add('time-cell');
  
    const nomeDia = diasDaSemana[dia.getDay()];
    const dataDia = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}`;
  
    head.innerHTML = `<strong>${nomeDia}</strong><br>${dataDia}`;
    grid.appendChild(head);
  });

  // Linhas de horário
  for (let hora = 0; hora < 24; hora++) {
    const timeLabel = document.createElement('div');
    timeLabel.classList.add('time-cell');
    timeLabel.textContent = `${String(hora).padStart(2, '0')}:00`;
    grid.appendChild(timeLabel);

    dias.forEach(dia => {
      const cell = document.createElement('div');
      cell.classList.add('day-hour');

      const dataStr = `${dia.getFullYear()}-${String(dia.getMonth() + 1).padStart(2, '0')}-${String(dia.getDate()).padStart(2, '0')}T${String(hora).padStart(2, '0')}:00`;

      cell.addEventListener('click', () => {
        window.location.href = `criar-compromisso.html?data=${dataStr.slice(0, -6)}`;
      });

      grid.appendChild(cell);
    });
  }
}

  prevBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 7);
    renderWeek(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 7);
    renderWeek(currentDate);
  });

  renderWeek(currentDate);
});

