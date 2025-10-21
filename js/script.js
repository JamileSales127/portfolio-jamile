/* script.js
   Vanilla JavaScript para validação do formulário, simulação de envio,
   alternância de tema e menu responsivo.
*/

// Seleções de elementos relevantes
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

// Estado do tema: por padrão o professor pediu tema escuro, então mantemos dark como inicial.
// Permitimos alternar e guardamos preferência no localStorage.
function applyTheme(theme){
  if(theme === 'light') body.classList.remove('theme-dark'), body.classList.add('theme-light');
  else body.classList.remove('theme-light'), body.classList.add('theme-dark');
}

// Inicialização do tema salvo (se existir)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', ()=>{
  const current = body.classList.contains('theme-light') ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

// Menu responsivo simples - só funciona em mobile
menuToggle.addEventListener('click', ()=>{
  // Só manipula o menu se estivermos em tela pequena (mobile)
  if(window.innerWidth <= 800) {
    const isVisible = mainNav.style.display === 'flex';
    if(isVisible) {
      mainNav.style.display = 'none';
    } else {
      mainNav.style.display = 'flex';
      mainNav.style.flexDirection = 'column';
    }
  }
});

// Validação simples do e-mail
function isValidEmail(email){
  // Regex simples para validar formato básico de e-mail
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Manipulação do formulário: validação e simulação de envio
contactForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Validações
  if(!nome || !email || !mensagem){
    alert('Por favor, preencha todos os campos antes de enviar.');
    return;
  }
  if(!isValidEmail(email)){
    alert('Por favor, informe um e-mail em formato válido (ex: usuario@dominio.com).');
    return;
  }

  // Simulação do envio: limpar campos e mostrar modal de sucesso
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensagem').value = '';

  // Exibir modal (aria-hidden=false)
  modal.setAttribute('aria-hidden', 'false');
});

// Fechar modal
modalClose.addEventListener('click', ()=>{
  modal.setAttribute('aria-hidden', 'true');
});

// Fechar modal ao clicar fora do conteúdo
modal.addEventListener('click', (ev)=>{
  if(ev.target === modal) modal.setAttribute('aria-hidden', 'true');
});

// Reset do menu ao redimensionar a janela
window.addEventListener('resize', ()=>{
  if(window.innerWidth > 800) {
    // Remove qualquer estilo inline em telas grandes
    mainNav.removeAttribute('style');
  }
});

// Garantir que o menu está correto ao carregar a página
document.addEventListener('DOMContentLoaded', ()=>{
  if(window.innerWidth > 800) {
    // Remove qualquer estilo inline em telas grandes
    mainNav.removeAttribute('style');
  }
});

// Comentário: este arquivo é puro JS sem frameworks como solicitado.