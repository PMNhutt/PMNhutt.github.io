// scroll navigation

const navigation = document.getElementById('navigation')

window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) {
        navigation.style.backdropFilter = 'blur(6px)'
    } else {
        navigation.style.backdropFilter = 'blur(0px)'
    }
})

// handle click menu
const menu = document.getElementById('menu-btn')
const menuModal = document.querySelector('.nav-links-res-modal')


menu.addEventListener('click', () => {
    let check = menuModal.getAttribute('data-visible')

    if (check == 'false') {
        menuModal.setAttribute('data-visible', true)
    } else {
        menuModal.setAttribute('data-visible', false)

    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menuModal.setAttribute('data-visible', false)
    }
})