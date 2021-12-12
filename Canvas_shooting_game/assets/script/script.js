const canvas = document.querySelector('canvas');
//
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const score = document.querySelector('#score')
const startGame = document.querySelector('#startGame')
const modelG = document.querySelector('#model')
const endScore = document.querySelector('#endScore')
const endTime = document.querySelector('#endTime')
const modelElement = document.querySelector('#model_2')
const modelPause = document.querySelector('#model_pause')
const pauseScore = document.querySelector('#pauseScore')
const continueGame = document.querySelector('#continueGame')
const restartGame = document.querySelector('#restart')
const pause = document.querySelector('#pause')
const pauseBackground = document.querySelector('#pause_background')
const scoreCorner = document.querySelector('#score_corner')
const startBackground = document.querySelector('#start_background')
const startText = document.querySelector('#startText')
const timer = document.querySelector('#timer')
const timerCorner = document.querySelector('#timer_corner')
const howToPlay = document.querySelector('#how')
const howText = document.querySelector('#howText')
const about = document.querySelector('#about')
const aboutText = document.querySelector('#aboutText')
const modelMess = document.querySelector('#model_mess')
const changeMess = document.querySelector('#message1')
const changeMess2 = document.querySelector('#message2')
const endGameBackground = document.querySelector('#endGameBg')
const gameOver = document.querySelector('#endText')
const highScoreBoard = document.querySelector('.highScore')
const highScoreDisplay = document.querySelector('#highScore')
const exit = document.querySelector('#exit')
const exitText = document.querySelector('#exitText')

//color element
const pyroColor = 'hsl(0, 60%, 50%)'
const hydroColor = 'hsl(220, 60%, 50%)'
const anemoColor = 'hsl(170, 60%, 50%)'
const electroColor = 'hsl(290, 60%, 50%)'
const dendroColor = 'hsl(90, 60%, 50%)'
const cryoColor = 'hsl(180, 60%, 50%)'
const geoColor = 'hsl(30, 60%, 50%)'

//background color
const bgGradient = c.createLinearGradient(0, 0, 0, canvas.height)
bgGradient.addColorStop(0, '#171e26')
bgGradient.addColorStop(1, '#3f586b')

//background img
const bgImage = new Image();
bgImage.src = './assets/css/img/stars-black.png';
const ground = new Image();
ground.src = './assets/css/img/ice.png';
const spaceShip = new Image();
spaceShip.src = './assets/css/img/spaceShips_004.png';

//enemy appearances
const enemyPyro1 = './assets/css/img/Enemy_pyro_1.png'
const enemyHydro1 = './assets/css/img/Enemy_hydro_1.png'
const enemyGeo1 = './assets/css/img/Enemy_geo_1.png'
const enemyAnemo1 = './assets/css/img/Enemy_anemo_1.png'
const enemyDendro1 = './assets/css/img/Enemy_dendro_1.png'
const enemyCryo1 = './assets/css/img/Enemy_cryo_1.png'
const enemyElectro1 = './assets/css/img/Enemy_electro_1.png'
const enemyPyro2 = './assets/css/img/Enemy_pryo_2.png'
const enemyHydro2 = './assets/css/img/Enemy_hydro_2.png'
const enemyGeo2 = './assets/css/img/Enemy_geo_2.png'
const enemyAnemo2 = './assets/css/img/Enemy_anemo_2.2.png'
const enemyDendro2 = './assets/css/img/Enemy_dendro_2.png'
const enemyCryo2 = './assets/css/img/Enemy_cryo_2.2.png'
const enemyElectro2 = './assets/css/img/Enemy_electro_2.png'

/* ================================================================================================ */

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.alpha = 1
    }

    //add draw function
    //startAngle: how long arc shoud be
    //endAngle: Math.PI* 2 => draw circle
    draw() {
        c.save();
        c.beginPath()
        c.globalAlpha = this.alpha
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
        c.shadowBlur = 30;
        c.shadowColor = this.color;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update() {
        this.draw()
        this.alpha -= 0.01
    }
}

//shooting bullet from center screen
//velocity: moving 
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.save();
        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)

        c.fillStyle = this.color
        c.shadowColor = this.color
        c.shadowBlur = 20
        c.shadowOffsetX = 0
        c.shadowOffsetY = 0
        c.fill()
        c.restore()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}

class Enemy {
    constructor(x, y, radius, color, velocity, img) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.img = img
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? 1 : -1
    }
    draw() {
        c.save()
        /*
        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
         */

        //draw exactly fit to the circle collision
        // c.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)

        //rotate img
        c.translate(this.x, this.y);
        c.rotate(this.angle * Math.PI / 360 * this.spin);
        c.drawImage(this.img, 0 - this.radius, 0 - this.radius, this.radius * 2, this.radius * 2)
        c.restore()
    }
    update() {
        this.angle += 0.3
        this.draw()
        //hit sides of screen => bounce of the screen
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius <= 0) {
            this.velocity.x = -this.velocity.x
        }
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}

class Enemy_2 {
    constructor(x, y, radius, color_1, color_2, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color_1 = color_1
        this.color_2 = color_2
        this.velocity = velocity
        // this.img = img
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? 1 : -1
    }
    draw() {
        c.save()

        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
        c.fillStyle = this.color_1
        c.fill()
        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
        c.fillStyle = this.color_2
        c.fill()

        //draw exactly fit to the circle collision
        // c.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)

        //rotate img
        // c.translate(this.x, this.y);
        // c.rotate(this.angle * Math.PI / 360 * this.spin);
        // c.drawImage(this.img, 0 - this.radius, 0 - this.radius, this.radius * 2, this.radius * 2)
        c.restore()
    }
    update() {
        this.angle += 0.3
        this.draw()
        //hit sides of screen => bounce of the screen
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius <= 0) {
            this.velocity.x = -this.velocity.x
        }
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}

const friction = 0.99
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }

}

class Status {
    constructor(x, y, text, color, velocity) {
        this.x = x
        this.y = y
        this.text = text
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.font = '35px PASTI'
        c.strokeStyle = 'black'
        c.lineWidth = 4
        c.strokeText(this.text, this.x, this.y)
        c.fillStyle = this.color
        c.fillText(this.text, this.x, this.y)
        c.restore()
    }
    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }

}


//specify center screen player
const w = canvas.width / 2
const h = (canvas.height / 2) + 120

//create player
let player = new Player(w, h - 5, 15, 'white')

/*
CALCULATE SHOOTING VELOCITY
                 /|
  need this ===>/ |
               /  |
              /   |
             /   _| Y
            /___|_|
            X

1. get the angle
2. put in atan2(y, x) = angle
3. get x and y velocities : sin(angle) : how long the shooting path
, cos(angle): the corner of

*/


//create bullet array
let bullet = []
//create animies
let enemies = []

let enemies_2 = []

let particles = []

let textStatus = []

var colorBullet

//timer
let timerInterval
let totalSec = 0
let spd = 0
let state = 0

function countTime(seccond) {
    totalSec++
    var hour = Math.floor(totalSec / 3600)
    var minute = Math.floor((totalSec - hour * 3600) / 60)
    var sec = totalSec - (hour * 3600 + minute * 60)
    timer.innerHTML = pad(hour) + ':' + pad(minute) + ':' + pad(sec)
    return seccond
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

//reset when click start game when end
function init() {
    player = new Player(w, h - 5, 15, pyroColor)
    colorBullet = pyroColor
    bullet = []
    enemies = []
    enemies_2 = []
    particles = []
    scroreCount = 0
    totalSec = 0
    score.innerHTML = scroreCount
    endScore.innerHTML = scroreCount
    timer.innerHTML = totalSec
    spd = 0
    state = 0
    checkState = false
    checkPause = false
}



//spawn animies
let spawnEnemiesInterval
let spawnEnemiesInterval_2

function spawnEnimies() {
    var val = scroreCount
    switch (true) {
        case (val >= 250 && val < 400):
            spd = 0.25
            state = spd
            break;
        case (val >= 400 && val < 600):
            spd = 0.5
            state = spd
            break;
        case (val >= 600 && val < 1000):
            spd = 1
            state = spd
            break;
        case (val >= 1000):
            spd = 1.5
            state = spd
            break;
        default:
            switch (true) {
                case (state > 0):
                    spd = state
                    break;
                case (state == 0.5):
                    spd = 0.5
                    break;
                case (state == 1):
                    spd = 1
                    break;
                case (state == 1.5):
                    spd = 1.5
                    break;
                default:
                    spd = -0.5
                    break;
            }
            break;
    }
    console.log('spd ' + spd + ' point ' + val)
    //Math.random() spdue is from 0 to 1
    //random from 10 to 30
    if (spd <= 0.25) {
        var radius = (Math.random() * (60 - 30)) + 30
    } else {
        radius = 60
    }
    let x
    let y
    /*
    4 CORNERS
            //set spawn random from left and right
            //0 - radius : left, canvas.width + radius: right 
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius       
            //set spawn random from top and bottom  
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    */
    /*
    4 SIDES
        if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
         y = Math.random() * (canvas.height/2)
        
    } else {
        x = Math.random() * canvas.width
         y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        
    }  
    */
    // if (Math.random() < 0.5) {
    //     x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
    //     y = Math.random() * (0 - radius)
    // } else {
    //     x = Math.random() * canvas.width
    //     y = Math.random() * (0 - radius)
    // }
    // x = Math.random() * (canvas.height + radius)
    x = Math.max(radius, Math.random() * canvas.width - radius)
    y = 0
    //calc velocity
    const angle = (Math.random() * (2 - 1)) + 1
    const velocity = {
        x: Math.cos(angle) * (1 + spd),
        y: Math.sin(angle) * (1 + spd)
    }

    //random between pyro:0, geo:30, dendro:90, anemo: 170
    //, hydro:220, cycro: 180, electro: 290
    let elementColor = [0, 30, 90, 170, 220, 180, 290]
    let random = Math.floor(Math.random() * elementColor.length)
    var color = `hsl(${elementColor[random]}, 60%, 50%)`
    var enemyType = new Image()
    switch (elementColor[random]) {
        case 0:
            enemyType.src = (Math.random() < 0.5 ? enemyPyro1 : enemyPyro2)
            break;
        case 30:
            enemyType.src = (Math.random() < 0.5 ? enemyGeo1 : enemyGeo2)
            break;
        case 90:
            enemyType.src = (Math.random() < 0.5 ? enemyDendro1 : enemyDendro2)
            break;
        case 170:
            enemyType.src = (Math.random() < 0.5 ? enemyAnemo1 : enemyAnemo2)
            break;
        case 220:
            enemyType.src = (Math.random() < 0.5 ? enemyHydro1 : enemyHydro2)
            break;
        case 180:
            enemyType.src = (Math.random() < 0.5 ? enemyCryo1 : enemyCryo2)
            break;
        case 290:
            enemyType.src = (Math.random() < 0.5 ? enemyElectro1 : enemyElectro2)
            break;
    }
    // console.log()
    enemies.push(new Enemy(x, y, radius, color, velocity, enemyType))
}

function spawnEnimies_2() {
    let allowSpawn = true
    var radius = 50
    let x
    let y

    x = Math.max(radius, Math.random() * canvas.width - radius)
    y = 0
    //calc velocity
    const angle = (Math.random() * (2 - 1)) + 1
    const velocity = {
        x: Math.cos(angle) / 2,
        y: Math.sin(angle) / 2
    }

    //random between pyro:0, geo:30, dendro:90, anemo: 170
    //, hydro:220, cycro: 180, electro: 290
    let elementColor = [0, 30, 90, 170, 220, 180, 290]
    let random = Math.floor(Math.random() * elementColor.length)
    var color_1 = `hsl(${elementColor[random]}, 60%, 50%)`
    let random_2 = Math.floor(Math.random() * elementColor.length)
    var color_2
    if (random_2 != random) {
        color_2 = `hsl(${elementColor[random_2]}, 60%, 50%)`
    }
    else {
        allowSpawn = false
    }
    var enemyType = new Image()
    switch (elementColor[random]) {
        case 0:
            enemyType.src = (Math.random() < 0.5 ? enemyPyro1 : enemyPyro2)
            break;
        case 30:
            enemyType.src = (Math.random() < 0.5 ? enemyGeo1 : enemyGeo2)
            break;
        case 90:
            enemyType.src = (Math.random() < 0.5 ? enemyDendro1 : enemyDendro2)
            break;
        case 170:
            enemyType.src = (Math.random() < 0.5 ? enemyAnemo1 : enemyAnemo2)
            break;
        case 220:
            enemyType.src = (Math.random() < 0.5 ? enemyHydro1 : enemyHydro2)
            break;
        case 180:
            enemyType.src = (Math.random() < 0.5 ? enemyCryo1 : enemyCryo2)
            break;
        case 290:
            enemyType.src = (Math.random() < 0.5 ? enemyElectro1 : enemyElectro2)
            break;
    }
    if (allowSpawn == true) {
        enemies_2.push(new Enemy_2(x, y, radius, color_1, color_2, velocity))
    }
}
//add animation
let animationId
let scroreCount = 0
let highScore = localStorage.getItem('game1stHighScore') || 0
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore
let groundHeight = 150
let groundX = 0
let groundX2 = canvas.width
let checkBonus = false
let checkEndGame = false
let checkPause = false
let checkState = false

function animate() {

    //loop animation
    animationId = requestAnimationFrame(animate)
    // c.fillStyle = bgGradient

    // c.fillRect(0, 0, canvas.width, canvas.height)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

    c.drawImage(spaceShip, w - 30, h - 10, 60, 100)

    //create ground
    c.drawImage(ground, groundX, canvas.height - groundHeight, canvas.width, groundHeight)
    c.drawImage(ground, groundX2, canvas.height - groundHeight, canvas.width, groundHeight)
    if (groundX < -canvas.width) {
        groundX = canvas.width - 2
    } else {
        groundX--
    }
    if (groundX2 < -canvas.width) {
        groundX2 = canvas.width - 2
    } else {
        groundX2--
    }
    player.update()
    if (player.alpha <= 0.2) {
        player.alpha = 1
    }

    //animate particles
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })

    //statusText
    textStatus.forEach((text, index) => {
        if (text.alpha <= 0) {
            textStatus.splice(index, 1)
        } else {
            text.update()
        }
    })

    //animate bullet
    bullet.forEach((projectile, index) => {
        projectile.update()
        //remove projectile from screen
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(function () {
                bullet.splice(index, 1)
            }, 0)
        }
    })

    //animate enemies
    enemies.forEach((enemy, index) => {
        enemy.update()


        //get distance from player to enemy
        var playerDistance = Math.hypot(player.x - enemy.x,
            player.y - enemy.y)
        //if enemy hit player ==> end game
        //if enemy hit ground ==> endgame
        if ((playerDistance - enemy.radius - player.radius < 1)
            || (enemy.y + enemy.radius > canvas.height - groundHeight)) {
            //end game
            clearInterval(spawnEnemiesInterval)
            cancelAnimationFrame(animationId)
            checkHighScore()
            setTimeout(() => {
                modelG.style.display = 'flex'
                modelG.style.background = '#f8f9fa'
            }, 13000)
            endGameBackground.style.display = 'block'
            endGameBackground.play();
            endScore.innerHTML = 'Score: ' + scroreCount
            endTime.innerHTML = 'Time: ' + timer.innerHTML
            endTime.style.display = 'block'
            endScore.style.display = 'block'
            modelElement.style.display = 'none'
            pause.style.display = 'none'
            startText.innerHTML = 'Restart'
            pauseBackground.style.display = 'block'
            clearInterval(timerInterval)
            checkEndGame = true
            howToPlay.style.display = 'none'
            about.style.display = 'none'
            changeState = false
            checkPause = true
            gameOver.style.display = 'block'
            highScoreDisplay.style.display = 'block'
            highScoreDisplay.textContent = highScoreBoard.innerHTML
            exit.style.display = 'block'
        }

        //remove enemy when bullet hit
        /*
        Math.hypot: tinh canh huyen` tam giac vuong
        => reduce distance from bullet to enemies
        */

        /*
            MAIN MECHANIC OF THE GAME! (pyro, hydro, anemo, electro, dendro, cryo, geo)
                                      
            1. same color: + 10
            2. pyro :   -> cryo: -20           -20 by (hydro, anemo, electro)      
                        -> dendro: -20
                        -> electro: -10
                        -> anemo: -10
                        -> geo: -10
                        -> hydro: -5            
            3. hydro:   -> pyro: -20            -20 by (electro, cryo)
                        -> geo: -20         
                        -> electro: -10
                        -> anemo: -10
                        -> dendro: -5
                        -> cryo: -5
            4. anemo:   -> pyro: -20            -20 by (geo)
                        -> dendro: -20
                        -> hydro: -10
                        -> electro: -10
                        -> cryo: -10
                        -> geo: -5
            5. electro: -> hydro: -20           -20 by (dendro, geo)
                        -> pyro: -20
                        -> anemo: -10
                        -> cryo: -10
                        -> geo: -5
                        -> dendro: -5
            6. dendro:  -> electro: -20         -20 by (pyro, cryo, anemo)
                        -> geo: -20
                        -> cryo: -10
                        -> anemo: -10
                        -> hydro: -5
                        -> pyro: -5
            7. cryo:    -> hydro: -20           -20 by (pyro, )
                        -> pyro: -20
                        -> anemo: -10
                        -> geo: -10
                        -> electro: -10
                        -> dendro: -5
            8. geo:     -> electro: -20         -20 by (hydro, dendro)
                        -> anemo: -20
                        -> pyro: -10
                        -> cryo: -10
                        -> dendro: -5
                        -> hydro: -5
                               
        */
        bullet.forEach((projectile, projectIndex) => {
            var distance = Math.hypot(projectile.x - enemy.x,
                projectile.y - enemy.y)
            //colision detect
            if (distance - enemy.radius - projectile.radius < 1) {

                //(NO REMOVE) SAME COLOR +5 RADIUS 
                if (projectile.color == enemy.color) {
                    //decreasing score 
                    if (scroreCount > 0) {
                        scroreCount -= 5
                        score.innerHTML = scroreCount
                    }


                    //add text status when hit
                    for (let i = 0; i <= 1; i++) {
                        textStatus.push(new Status(enemy.x, enemy.y, '-5', 'white', { x: 1, y: -1 }))
                        textStatus.push(new Status(enemy.x, enemy.y, 'Immune', enemy.color, { x: -1, y: -1 }))
                    }
                    //create explosion
                    for (let i = 0; i < enemy.radius * 2; i++) {
                        particles.push(new Particle(projectile.x, projectile.y,
                            Math.random() * 3, enemy.color, { x: (Math.random() - 0.5) * (Math.random() * 6), y: (Math.random() - 0.5) * (Math.random() * 6) }))
                    }
                    gsap.to(enemy, {
                        radius: enemy.radius + 5
                    })
                    setTimeout(function () {
                        bullet.splice(projectIndex, 1)
                    }, 0)
                }
                else {
                    // //increasing score
                    // scroreCount += 10
                    // score.innerHTML = scroreCount

                    //create explosion
                    for (let i = 0; i < enemy.radius * 2; i++) {
                        particles.push(new Particle(projectile.x, projectile.y,
                            Math.random() * 3, enemy.color, { x: (Math.random() - 0.5) * (Math.random() * 6), y: (Math.random() - 0.5) * (Math.random() * 6) }))
                    }

                    //REMOVE ENEMY
                    if (enemy.radius - 20 > 8) {


                        switch (projectile.color) {
                            case pyroColor:
                                switch (enemy.color) {
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Melt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Burnt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Burnt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Burnt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Burnt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Not very affective', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case hydroColor:
                                switch (enemy.color) {
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Vaporize', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case anemoColor:
                                switch (enemy.color) {
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Torn', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Worn out', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case electroColor:
                                switch (enemy.color) {
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Overloaded', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Electrocute', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case dendroColor:
                                switch (enemy.color) {
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Overgrow', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Rocksplit', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case cryoColor:
                                switch (enemy.color) {
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Melt', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Frozen', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case geoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                            case geoColor:
                                switch (enemy.color) {
                                    case electroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Immune', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case anemoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-20', enemy.color, { x: 1, y: -1 }))
                                            textStatus.push(new Status(enemy.x, enemy.y, 'Immune', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 20
                                        })
                                        checkBonus = true
                                        break;
                                    case cryoColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case pyroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-10', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 10
                                        })
                                        checkBonus = false
                                        break;
                                    case dendroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                    case hydroColor:
                                        //add text status when hit
                                        for (let i = 0; i <= 1; i++) {
                                            textStatus.push(new Status(enemy.x, enemy.y, '-5', enemy.color, { x: 1, y: -1 }))
                                            // textStatus.push(new Status(enemy.x, enemy.y, 'Extinguish', enemy.color, { x: -1, y: -1 }))
                                        }
                                        gsap.to(enemy, {
                                            radius: enemy.radius - 5
                                        })
                                        checkBonus = false
                                        break;
                                }
                                break;
                        }

                        setTimeout(function () {
                            bullet.splice(projectIndex, 1)
                        }, 0)
                    } else {
                        //increase score when remove
                        if (checkBonus == true) {
                            scroreCount += 20
                            score.innerHTML = scroreCount
                            for (let i = 0; i <= 1; i++) {
                                textStatus.push(new Status(enemy.x, enemy.y, '+20', 'white', { x: 1, y: -1 }))
                                textStatus.push(new Status(enemy.x, enemy.y, 'Bonus', 'white', { x: -1, y: -1 }))
                            }
                        } else {
                            scroreCount += 10
                            score.innerHTML = scroreCount
                            for (let i = 0; i <= 1; i++) {
                                textStatus.push(new Status(enemy.x, enemy.y, '+10', 'white', { x: 1, y: -1 }))
                            }
                        }

                        //remove flashing when remove enemies
                        setTimeout(function () {
                            enemies.splice(index, 1)
                            bullet.splice(projectIndex, 1)
                        }, 0)
                    }
                }
            }
        })

    })

    //show message when hit score miles
    showMessage(0.25)
}


//add shooting when click

const pyro = document.querySelector('#pyro')
pyro.addEventListener('click', function () {
    colorBullet = pyroColor
    player.color = pyroColor
})
const hydro = document.querySelector('#hydro')
hydro.addEventListener('click', function () {
    colorBullet = hydroColor
    player.color = hydroColor
})
const anemo = document.querySelector('#anemo')
anemo.addEventListener('click', function () {
    colorBullet = anemoColor
    player.color = anemoColor

})
const electro = document.querySelector('#electro')
electro.addEventListener('click', function () {
    colorBullet = electroColor
    player.color = electroColor

})
const dendro = document.querySelector('#dendro')
dendro.addEventListener('click', function () {
    colorBullet = dendroColor
    player.color = dendroColor

})
const cryo = document.querySelector('#cryo')
cryo.addEventListener('click', function () {
    colorBullet = cryoColor
    player.color = cryoColor

})
const geo = document.querySelector('#geo')
geo.addEventListener('click', function () {
    colorBullet = geoColor
    player.color = geoColor

})

const elemental = document.querySelectorAll('.elem');
elemental.forEach(function (el) {
    el.addEventListener('click', function () {
        modelElement.querySelector('.chosen').classList.remove('chosen');
        el.classList.add('chosen')

    })
})


//shoot when click
addEventListener('click', (event) => {
    //calc velocity
    const angle = Math.atan2(event.clientY - h, event.clientX - w)
    const velocity = {
        x: Math.cos(angle) * 20,
        y: Math.sin(angle) * 20
    }
    bullet.push(new Projectile(w, h, 5, colorBullet, velocity))
})


startGame.addEventListener('click', function () {
    init()
    animate(0)
    spawnEnemiesInterval = setInterval(spawnEnimies, 2000)
    // spawnEnemiesInterval_2 = setInterval(spawnEnimies_2, 5000)
    modelG.style.display = 'none'
    modelElement.style.display = 'flex'
    pause.style.display = 'block'
    scoreCorner.style.display = 'block'
    startBackground.style.display = 'none'
    timerCorner.style.display = 'block'
    pauseBackground.style.display = 'none'
    checkEndGame = false
    timerInterval = setInterval(countTime, 1000)
    howToPlay.style.display = 'none'
    about.style.display = 'none'
    endGameBackground.style.display = 'none'
})

pause.addEventListener('click', function () {
    clearInterval(spawnEnemiesInterval)
    clearInterval(spawnEnemiesInterval_2)
    cancelAnimationFrame(animationId)
    modelPause.style.display = 'flex'
    pauseScore.innerHTML = 'score: ' + scroreCount
    pauseBackground.style.display = 'block'
    clearInterval(timerInterval)
    checkPause = true
})

restartGame.addEventListener('click', function () {
    init()
})

continueGame.addEventListener('click', function () {
    animate(0)
    spawnEnemiesInterval = setInterval(spawnEnimies, 2000)
    // spawnEnemiesInterval_2 = setInterval(spawnEnimies_2, 5000)
    modelPause.style.display = 'none'
    pause.style.display = 'block'
    pauseBackground.style.display = 'none'
    timerInterval = setInterval(countTime, 1000)
    checkPause = false
})

//press key event
addEventListener('keydown', function (event) {
    switch (event.key) {
        case "Escape":
            if (checkEndGame == false && modelG.style.display === 'none') {
                clearInterval(spawnEnemiesInterval)
                clearInterval(spawnEnemiesInterval_2)
                cancelAnimationFrame(animationId)
                modelPause.style.display = 'flex'
                pauseScore.innerHTML = 'Points: ' + scroreCount
                pauseBackground.style.display = 'block'
                clearInterval(timerInterval)
                checkPause = true
            }
            break;
        case "q":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = pyroColor
                player.color = pyroColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                pyro.classList.add('chosen')
            }
            break;
        case "w":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = hydroColor
                player.color = hydroColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                hydro.classList.add('chosen')
            }
            break;
        case "e":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = anemoColor
                player.color = anemoColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                anemo.classList.add('chosen')
            }

            break;
        case "r":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = electroColor
                player.color = electroColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                electro.classList.add('chosen')
            }
            break;
        case "1":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = dendroColor
                player.color = dendroColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                dendro.classList.add('chosen')
            }

            break;
        case "2":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = cryoColor
                player.color = cryoColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                cryo.classList.add('chosen')
            }

            break;
        case "3":
            if (checkPause == false && modelG.style.display === 'none') {
                colorBullet = geoColor
                player.color = geoColor
                modelElement.querySelector('.chosen').classList.remove('chosen');
                geo.classList.add('chosen')
            }

            break;
    }
})

//pause when switch tab
addEventListener('visibilitychange', function () {
    if (document.visibilityState === "hidden" && modelG.style.display === 'none' && checkEndGame == false) {
        clearInterval(spawnEnemiesInterval)
        cancelAnimationFrame(animationId)
        modelPause.style.display = 'flex'
        pauseScore.innerHTML = 'score: ' + scroreCount
        pauseBackground.style.display = 'block'
        clearInterval(timerInterval)
        checkPause = true
    }
})

// show message when hit score limit
function showMessage(spdNum) {
    if (spd == spdNum) {
        if (checkState == false) {
            modelMess.style.display = 'block'
            changeMess2.innerHTML = 'speed up!'
            checkState = true
            setTimeout(() => {
                modelMess.style.display = 'none'
            }, 2000);
        }

    } else if (spd == 0.5) {
        if (checkState == true) {
            modelMess.style.display = 'block'
            changeMess2.innerHTML = 'bigger!'
            checkState = false
            setTimeout(() => {
                modelMess.style.display = 'none'
            }, 2000);
        }
    } else if (spd == 1) {
        if (checkState == false) {
            modelMess.style.display = 'block'
            changeMess2.innerHTML = 'speed up!'
            checkState = true
            setTimeout(() => {
                modelMess.style.display = 'none'
            }, 2000);
        }
    } else if (spd == 1.5) {
        if (checkState == true) {
            modelMess.style.display = 'block'
            changeMess2.innerHTML = 'speed up!'
            checkState = false
            setTimeout(() => {
                modelMess.style.display = 'none'
            }, 2000);
        }
    }
}

//check high score
function checkHighScore() {
    if (scroreCount > localStorage.getItem('game1stHighScore')) {
        localStorage.setItem('game1stHighScore', scroreCount)
        highScore = scroreCount
        highScoreBoard.textContent = 'HIGH SCORE: ' + highScore
    }
}


