/**
 * Portfólio de Estágio • Psicologia FMU
 * Script de Compartilhamento & Microinterações
 */

document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleSharePortfolio);
    }
});

let toastTimeout = null;

async function handleSharePortfolio() {
    const currentUrl = window.location.href;
    const shareData = {
        title: 'Mostra de Estágio • Psicologia FMU',
        text: 'Acesse o portfólio acadêmico com materiais didáticos, práticas e o relatório final de estágio do curso de Psicologia da FMU.',
        url: currentUrl
    };

    // Tenta primeiro o compartilhamento nativo do dispositivo móvel/sistema operacional
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return; // Usuário concluiu o compartilhamento nativo
        } catch (err) {
            // Se o usuário cancelou o modal de compartilhamento, não exibe erro
            if (err.name === 'AbortError') {
                return;
            }
            // Se falhou por outro motivo, continua para o fallback de copiar link
        }
    }

    // Fallback: Copiar URL para a área de transferência
    copyUrlToClipboard(currentUrl);
}

function copyUrlToClipboard(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showToast('Link do portfólio copiado com sucesso!');
            })
            .catch(() => {
                fallbackCopy(url);
            });
    } else {
        fallbackCopy(url);
    }
}

// Fallback de cópia para navegadores legados
function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Link do portfólio copiado com sucesso!');
        } else {
            alert('Não foi possível copiar o link automaticamente.');
        }
    } catch (err) {
        alert('Copie o link manualmente: ' + text);
    } finally {
        document.body.removeChild(tempInput);
    }
}

function showToast(message) {
    const toast = document.getElementById('toastMsg');
    if (!toast) return;

    if (message) {
        const textSpan = toast.querySelector('span');
        if (textSpan) {
            textSpan.textContent = message;
        }
    }

    // Reseta temporizador anterior para evitar cortes prematuros
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toastTimeout = null;
    }, 3200);
}