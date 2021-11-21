// function([string1, string2],target id,[color1,color2])    
consoleText(['A Software Engineer', 'Ho Chi Minh City', 'Made with Love :3'], 'text', ['#fff', '#fff', '#fff']);

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}

// scroll mouse
var iconWeb = document.getElementById("mouse-bounce");
var iconPhone = document.getElementById("mouse-bounce-phone");


// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};


function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        //    mybutton.style.display = "block";
        iconWeb.style.opacity = "0";
        iconWeb.style.visibility = "hidden";
        iconPhone.style.opacity = "0";
        iconPhone.style.visibility = "hidden";

    } else {
        //     mybutton.style.display = "none";
        iconWeb.style.opacity = "1";
        iconWeb.style.visibility = "visible";
        iconPhone.style.opacity = "1";
        iconPhone.style.visibility = "visible";
    }
}

// audio
var music = document.getElementById('audioplayer');
var pButton = document.getElementById('pButton');
pButton.addEventListener("click", play);

// window.onload = function() {
//     music.play();
// }

function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "bi bi-volume-up-fill text-light";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "bi bi-volume-mute-fill text-light";
    }
}

// icon loader
var loader = document.getElementsByClassName("poli");
for(var i = 0; i < loader.length; i++){
  	loader[i].addEventListener("webkitAnimationEnd", myEndFunction);   
  }

function myEndFunction(){  
  for(var i = 0; i < loader.length; i++){
  	loader[i].classList.remove("poli");
  }  
};



