const menu = document.getElementById('menu-btn');
const close = document.getElementById('close-btn');
const nav = document.getElementById('navBar');

menu.addEventListener('click', () => {
    nav.classList.add('active');
});

close.addEventListener('click', () => {
    nav.classList.remove('active'); 
});
