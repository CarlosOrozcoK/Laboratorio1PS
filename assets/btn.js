// Toggle Navbar Menu
const toggleButton = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('#navbarNav');

toggleButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('show');
});
