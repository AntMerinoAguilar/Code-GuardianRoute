const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.querySelector('.slide-menu');
const overlay = document.querySelector(".overlay");

// Fonction qui va donner (ou enlever) les classes quand on ouvre (ou ferme) le menu
function toggleMenu() {
    sideMenu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Événement sur le bouton hamburger
menuBtn.addEventListener('click', toggleMenu);

// Événement pour fermer le menu en cliquant en dehors
overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        toggleMenu();
    }
})