/**
 * SeverinoBiu - Script de interatividade
 * Funcionalidades: navegação suave, animações ao scroll
 */

// Aguarda o DOM estar completamente carregado antes de executar
document.addEventListener('DOMContentLoaded', () => {
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

    // Adiciona efeito de "typewriter" no botão "In the workshop"
    const devBadge = document.querySelector('.dev-badge');
    if (devBadge) {
        const text = devBadge.textContent.trim();
        // Garante que o layout não pule ao remover o texto
        const initialHeight = devBadge.offsetHeight;
        const initialWidth = devBadge.offsetWidth;
        devBadge.style.minHeight = `${initialHeight}px`;
        devBadge.style.minWidth = `${initialWidth}px`;
        devBadge.textContent = '';
        devBadge.style.borderRight = '2px solid var(--cor-white)';
        devBadge.style.display = 'inline-block';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                devBadge.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                devBadge.style.borderRight = 'none';
            }
        };
        
        // Inicia após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // Gerencia o vídeo para evitar travamento ao voltar à página
    const heroVideo = document.querySelector('.hero-image-main video');
    if (heroVideo) {
        // Função para reiniciar o vídeo
        const restartVideo = () => {
            heroVideo.pause();
            heroVideo.currentTime = 0;
            heroVideo.play().catch(err => {
                // Se autoplay falhar, tenta novamente após um pequeno delay
                setTimeout(() => {
                    heroVideo.play().catch(() => {
                        console.log('Autoplay bloqueado pelo navegador');
                    });
                }, 100);
            });
        };

        // Quando a página volta a ser visível, reinicia o vídeo
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                restartVideo();
            }
        });

        // Também escuta quando a janela recebe foco novamente
        window.addEventListener('focus', () => {
            restartVideo();
        });

        // Garante que o vídeo está tocando quando a página carrega
        const playVideo = () => {
            heroVideo.play().catch(() => {
                // Se autoplay falhar, tenta novamente
                setTimeout(() => {
                    heroVideo.play().catch(() => {
                        console.log('Autoplay bloqueado pelo navegador');
                    });
                }, 100);
            });
        };

        // Tenta reproduzir quando os metadados estiverem carregados
        if (heroVideo.readyState >= 2) {
            // Vídeo já carregou
            playVideo();
        } else {
            heroVideo.addEventListener('loadedmetadata', playVideo, { once: true });
            heroVideo.addEventListener('canplay', playVideo, { once: true });
        }

        // Se o vídeo pausar por algum motivo, tenta reiniciar
        heroVideo.addEventListener('pause', () => {
            // Só reinicia se não foi pausado manualmente e a página está visível
            if (!document.hidden && heroVideo.paused) {
                setTimeout(() => {
                    if (heroVideo.paused && !document.hidden) {
                        restartVideo();
                    }
                }, 100);
            }
        });
    }
});

