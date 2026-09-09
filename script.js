function sharePortfolio() {
    const currentUrl = window.location.href;
    const shareData = {
        title: 'Portfólio de Estágio - Psicologia FMU',
        text: 'Acesse nosso portfólio acadêmico com materiais, dinâmicas e relatórios do estágio clínico.',
        url: currentUrl
    };

    if (navigator.share && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(err => {
            if (err.name !== 'AbortError') showToast();
        });
    } else {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showToast();
        }).catch(() => {
            alert('Não foi possível copiar o link.');
        });
    }
}

function showToast() {
    const toast = document.getElementById('toastMsg');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}