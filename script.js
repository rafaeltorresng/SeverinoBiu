/**
 * SeverinoBiu - Script de interatividade
 * Funcionalidades: navegação suave, animações ao scroll
 */

// Smooth scroll já está ativado via CSS, mas vamos adicionar comportamentos extras

// Adiciona classe 'visible' aos elementos quando aparecem na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adiciona efeito de "typewriter" no título hero (opcional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent;
    // Garante que o layout não pule ao remover o texto
    const initialHeight = heroTitle.offsetHeight;
    heroTitle.style.minHeight = `${initialHeight}px`;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--cor-primary)';
    heroTitle.style.display = 'inline-block';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.style.borderRight = 'none';
        }
    };
    
    // Inicia após um pequeno delay
    setTimeout(typeWriter, 500);
}

