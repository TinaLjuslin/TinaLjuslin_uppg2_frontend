document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');
    const mainSections = document.querySelectorAll('main > section');
const mainElement = document.querySelector('main');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();

                    const parentSection = targetElement.closest('main > section');
                    const parentLi = this.closest('li');

                    if (parentSection) {
                        if (mainElement) {
                            mainElement.scrollTop = 0;
                        }
                        if (!this.closest('.sub-menu')) {
                            document.querySelectorAll('.sidebar li.open').forEach(openLi => {
                                if (openLi !== parentLi) openLi.classList.remove('open');
                            });
                            if (parentLi && parentLi.querySelector('.sub-menu')) {
                                parentLi.classList.toggle('open');
                            }
                        }
                        
                        mainSections.forEach(s => s.classList.remove('active'));
                        parentSection.classList.add('active');

                        links.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');

                        setTimeout(() => {
                            targetElement.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                            if (mainElement) {
                                mainElement.focus();
                            }
                        }, 100);
                    }
                
                }
            }
        });
    });

    if (mainSections.length > 0) {
        mainSections[0].classList.add('active');
        links[0].classList.add('active');
    }
});

// To copy code 
function copyCode(button) {
    const codeContainer = button.parentElement;
    const codeText = codeContainer.querySelector('code').innerText;

    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = button.innerText;
        button.innerText = "Kopierat!";

        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Kunde inte kopiera text: ', err);
    });
}