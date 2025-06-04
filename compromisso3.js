const urlParams = new URLSearchParams(window.location.search);
const dataStr = urlParams.get('data'); // Esperado: "2025-04-10"
const el = document.getElementById('dataSelecionada');

if (dataStr && el) {
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    const dataObj = new Date(ano, mes - 1, dia); // JS: mês começa do 0

    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
    weekday: 'long', // Segunda-feira, terça-feira, ...
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });

    // Capitaliza a primeira letra
    el.textContent = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}

    const colors = [
      { name: 'Azul', value: 'blue' },
      { name: 'Vermelho', value: 'red' },
      { name: 'Verde', value: 'green' },
      { name: 'Amarelo', value: 'yellow' },
      { name: 'Roxo', value: 'purple' },
      { name: 'Laranja', value: 'orange' },
      { name: 'Preto', value: 'black' },
      { name: 'Rosa', value: 'pink' },
      { name: 'Marrom', value: 'brown' },
      { name: 'Cinza', value: 'gray' }
    ];

    const dropdown = document.getElementById('colorDropdown');
    const selectedColor = document.getElementById('selectedColor');
    const colorList = document.getElementById('colorList');

    const corInicial = colors[2];
    selectedColor.innerHTML = `
      <div style="display: flex; align-items: center;">
        <div class="color-preview" style="background-color: ${corInicial.value}"></div>
        <span>${corInicial.name}</span>
      </div>
    `;

    // Preenche a lista de cores
    colors.forEach(color => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = `
        <div class="color-preview" style="background-color: ${color.value}"></div>
        <span>${color.name}</span>
      `;
      item.addEventListener('click', () => {
        selectedColor.innerHTML = `
          <div style="display: flex; align-items: center;">
            <div class="color-preview" style="background-color: ${color.value}"></div>
            <span>${color.name}</span>
          </div>
        `;
        colorList.style.display = 'none';
      });
      colorList.appendChild(item);
    });

    // Alterna o menu suspenso
    selectedColor.addEventListener('click', () => {
      colorList.style.display = colorList.style.display === 'block' ? 'none' : 'block';
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        colorList.style.display = 'none';
      }
    });

    const botoes = document.querySelectorAll('.botao');

    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        botao.classList.toggle('borda-preta');
      });
    });