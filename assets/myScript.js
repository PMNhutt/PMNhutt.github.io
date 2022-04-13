// nav toggle active
const nav = document.querySelector('.nav')
const marker = document.querySelector('#marker')
const item = document.querySelectorAll('.nav a')

function indicator(e) {
    marker.style.left = e.offsetLeft + "px";
    marker.style.width = e.offsetWidth + "px";
}

// item.forEach(link => {
//     link.addEventListener("click", (e) => {
//         // marker.style.animation = "none";
//         // indicator(e.target)
//         nav.querySelector('.active').classList.remove('active');
//         // setTimeout(() => {
//             link.classList.add('active')
//         // }, 200)
//         // marker.addEventListener("transitionend", () => {
//         //     marker.style.animation = "marker 1s ease forwards";
//         // })
//     })

// })


//nav scroll triggers
const section = document.querySelectorAll('section')

window.onscroll = () => {
    section.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            item.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.nav a[href*='+ id + ']').classList.add('active')
            })
        }
    })
}


//around home button
const aroundText = document.querySelector('.around-text-home h5')
aroundText.innerHTML = aroundText.textContent.replace(/\S/g, "<span>$&</span>")

const aroundItem = document.querySelectorAll('.home-button h5 span')
for (let i = 0; i < aroundItem.length; i++) {
    aroundItem[i].style.transform = "rotate(" + i * 16.5 + "deg)"
}



const aroundImgText = document.querySelector('.around-text h5')
aroundImgText.innerHTML = aroundImgText.textContent.replace(/\S/g, "<span>$&</span>")
const aroundImgItem = document.querySelectorAll('.about-img h5 span')
for (let i = 0; i < aroundImgItem.length; i++) {
    aroundImgItem[i].style.transform = "rotate(" + i * 11.6 + "deg)"
}




