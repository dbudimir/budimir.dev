// Randcom cat API
const url = 'https://api.thecatapi.com/v1/images/search';
const catBuffer = [];

// Sounds
const redSound = document.querySelector('#red-sound');
const blueSound = document.querySelector('#blue-sound');
const yellowSound = document.querySelector('#yellow-sound');
const greenSound = document.querySelector('#green-sound');
const startSound = document.querySelector('#green-sound');

// Computer steps and user steps
const colors = ['red', 'blue', 'yellow', 'green'];
const compSteps = [];
let currentUserStep = 0;

// Dom elements for user messages.
const gameSquare = document.querySelector('.game-box');
const errorMsg = document.querySelector('#sorry');
const headerText = document.querySelectorAll('.header-text');

// Normal or cat mode
let mode = 'normal';

// Timer for user to take an action.
let initial;
function startTimer() {
    initial = setTimeout(function() {
        errorMsg.setAttribute('style', 'display:block;');
        errorMsg.innerHTML = `<span>You gotta be faster than that!</span>`;
        errorMsg.insertAdjacentHTML('beforeend', "<span onclick='reload()' class='start-over'>Try Again</span>");
    }, 5000);
}

// Draws a random color and adds it to compSteps array.
function draw() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    compSteps.push(colors[randomIndex]);
}

// Produces game mode options when the users slects "Start"
const startButton = function() {
    document.querySelector('.game-over').setAttribute('style', 'display:block;');
    errorMsg.innerHTML = `<span>Pick a mode before we get started.</span>`;
    errorMsg.insertAdjacentHTML('beforeend', "<span class='start-over' id='start-game'>Normal Mode</span>");
    errorMsg.insertAdjacentHTML('beforeend', "<span class='start-over' id='cat-mode'>Cat Mode</span>");
    document.querySelector('.score').innerHTML = `<span class='calc-score'>${
        compSteps.length
    }</span><span class='round'>ROUND</span>`;
    headerText.forEach(function(title) {
        title.setAttribute('class', 'header-text appear');
        title.innerText = 'Get ready!';
    });
    document.querySelector('#start-game').addEventListener('click', startGame);
    document.querySelector('#cat-mode').addEventListener('click', startCatMode);
};

// Starts normal mode
const startGame = function() {
    errorMsg.setAttribute('style', 'display:none;');
    draw();
    setTimeout(function() {
        compShow();
    }, 2000);
};

// Starts cat mode
const startCatMode = function() {
    errorMsg.setAttribute('style', 'display:none;');
    mode = 'cat';
    getData(url);
    draw();
    setTimeout(function() {
        compShow();
    }, 2000);
};

// On click compare the current game color with compSepts at the index of current user step.
gameSquare.addEventListener('click', e => {
    // When the user clicks on a quare
    if (e.target.classList.contains('square')) {
        e.preventDefault();
        const userSquare = e.target;
        const currentGameColor = compSteps[currentUserStep];
        // Play sound
        this.eval(`${userSquare.id}Sound`).play();
        // Flash the selected square.
        userSquare.setAttribute('class', 'flash');
        setTimeout(function() {
            userSquare.setAttribute('class', 'square');
        }, 500);
        // Clear and reset the timer
        clearTimeout(initial);
        startTimer();
        // Incrament current user step by 1
        currentUserStep += 1;
        // Get a new cat incase of cat mode.
        getData(url);
        // If this is the first time a user clicks
        if (compSteps.length === 0) {
            clearTimeout(initial);
            startButton();
            // If the user selects the wrong color
        } else if (currentGameColor !== userSquare.id) {
            clearTimeout(initial);
            errorMsg.setAttribute('style', 'display:block;');
            errorMsg.innerHTML = `<span>Sorry, the next color was <span id="real-answer">${currentGameColor}</span></span>`;
            errorMsg.insertAdjacentHTML('beforeend', "<span onclick='reload()' class='start-over'>Try Again</span>");
            document
                .querySelector('#real-answer')
                .setAttribute('style', `text-transform: uppercase; color:  ${currentGameColor};`);
            // If the user has clicked through the sequence in the correct order
        } else if (currentUserStep === compSteps.length) {
            document.querySelector('.calc-score').innerHTML = compSteps.length + 1;
            document.querySelector('.cats-temp').innerHTML = `<img src="${catBuffer[currentUserStep]}" id="random-cat">
                <img src="${catBuffer[currentUserStep + 1]}" id="random-cat">`;
            headerText.forEach(function(title) {
                title.innerText = 'Simon says...';
                title.classList.remove('appear');
                void title.offsetWidth;
                title.classList.add('appear');
            });
            clearTimeout(initial);
            draw();
            setTimeout(function() {
                compShow();
            }, 2000);
        }
        // When the user clicks the start button
    } else {
        startButton();
    }
});

// Simon says - Reproduces the pattern for the user
const compShow = function() {
    compSteps.forEach(function(color, index) {
        setTimeout(function() {
            const currentSquare = document.querySelector(`#${color}`);
            currentSquare.setAttribute('class', 'flash');
            this.eval(`${color}Sound`).play();
            // If cat mode, show a cat instead of the background color
            if (mode === 'cat') {
                currentSquare.setAttribute(
                    'style',
                    `background: url(${catBuffer[index]}); background-size: cover; background-position: center;`
                );
            }
            setTimeout(function() {
                currentSquare.setAttribute('class', 'square');
                if (mode === 'cat') {
                    currentSquare.removeAttribute('style', `background: url(${catBuffer[index]})`);
                }
            }, 1000);
            clearTimeout(initial);
            startTimer();
        }, 1250 * index);
    });
    // Remind the user when it's their turn to go again
    setTimeout(function() {
        headerText.forEach(function(title) {
            title.innerText = 'Your turn!';
            title.classList.remove('appear');
            void title.offsetWidth;
            title.classList.add('appear');
        });
    }, 1250 * compSteps.length + 1);
    // Reset the user steps
    currentUserStep = 0;
};

// Reload the page when the user clicks "Try Again"
function reload() {
    errorMsg.setAttribute('style', 'display:none;');
    location.reload(true);
}

// ////////////////////////////////////  // Random Cat API

// Gets a new cat url and pushes it to the cat array
const getData = function(myUrl) {
    fetch(myUrl, {
        headers: {
            'x-api-key': '599c1be4-1756-47c1-b525-4d7ef4cc541f',
        },
    })
        .then(res => res.json())
        .then(data => {
            catBuffer.push(data[0].url);
        })
        .catch(err => {
            alert('error');
        });
};

// Preloads two cat images into the buffer.
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 4; i += 1) {
        getData(url);
    }
    const promise = new Promise(function(resolve) {
        setTimeout(function() {
            resolve(catBuffer);
        }, 500);
    });

    promise.then(function() {
        document.querySelector('.cats-temp').innerHTML = `<img src="${catBuffer[0]}" id="random-cat">
        <img src="${catBuffer[1]}" id="random-cat">`;
    });
});

// ////////////////////////////////////  // Tilt effect

// Adds a sof light over the gamebox at the cursor
const lightBox = document.querySelector('.js-tilt-container');
lightBox.addEventListener('mousemove', e => {
    document.querySelector('.light').setAttribute(
        'style',
        `left: ${e.pageX - 300}px;
    top: ${e.pageY - 300}px`
    );
});

// Tilts the game box based on the users mous position
const tiltBox = document.querySelector('.js-tilt-container');
tiltBox.addEventListener('mousemove', e => {
    const left = tiltBox.offsetLeft;
    const top = tiltBox.offsetTop;
    const cursPosX = e.pageX - left;
    const cursPosY = e.pageY - top;
    const cursFromCenterX = tiltBox.offsetWidth / 2 - cursPosX;
    const cursFromCenterY = tiltBox.offsetHeight / 2 - cursPosY;
    tiltBox.setAttribute(
        'style',
        `transform: perspective(500px) rotateX(${cursFromCenterY / 120}deg) rotateY(${-(
            cursFromCenterX / 120
        )}deg) translateZ(10px); 
        -webkit-transform: perspective(500px) rotateX(${cursFromCenterY / 120}deg) rotateY(${-(
            cursFromCenterX / 120
        )}deg) translateZ(10px);`
    );
});

// Resets the gamebox when the user mouses away.
tiltBox.addEventListener('mouseleave', () => {
    tiltBox.setAttribute('style', 'transform: rotateX(0) rotateY(0); -webkit-transform: rotateX(0) rotateY(0) ;');
});
