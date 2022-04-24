'use strict';

// LESSON PROJECT 82 PIG GAME

// how to make scores dissapear (nuliui prilygint)

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // # yra ID selectorius
const score1El = document.getElementById('score--1'); // jei rasom getElementByID, tuomet nereikia naudoti #.
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

// Starting conditions
// score0El.textContent = 0; // sito nebereikia, nes jie perkeliami i INIT kintamaji
// score1El.textContent = 0; // sito nebereikia, nes jie perkeliami i INIT kintamaji

// how to dissapear dice image
const diceEl = document.querySelector('.dice'); // sito nebereikia, nes jie perkeliami i INIT kintamaji
// diceEl.classList.add('hidden');

//Starting conditions
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing; // sito reikia, kadangi taip issaukimi varibales, kurie yra INIT funkcijoje

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

// let currentScore = 0; // sitas negali buti inside f-joj, kadangi ta f-ja kartojasi nuolat paspaudus roll dice ir visuomet skaicius nusinulintu, o ne sumuotusi.
// let scores = [0, 0];
// let activePlayer = 0;
// let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// LESSON 83 Rolling dice

//sukuriami starting conditions

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); // trunc nuima po kablio skaicius

    //2. Display dice
    diceEl.classList.remove('hidden');
    // to display image according dice number:
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1;   // add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // 84 lESSON SWITCHING ACTIVE PLAYER
      // sukuriame let activePlayer = 0 (virsuj)
    } else {
      switchPlayer();
      //setting current score to 0, when dice is 1
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // //switch to next player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active'); // keiciam spalva kai keiciasi zaidejas
    }
  }
});

// 85 LESSON HOLDING CURRENT SCORE
// sukuriam mygtuka btnhold

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    // visu pirma prisimenam, kad taskai stores to scores variable, kuris yra array (abiems skaiciuojasi) Naudojam active player, kad paskaiciuoti reikiamam zaidejui taskus
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore; - pavyzdys aiskesnis
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 30) {
      // Finish the game
      // kuriam kintamaji let playing = true - tam, kad patikrintume ar zaidimas vis dar nera baigtas
      playing = false;
      diceEl.classList.add('hidden'); // btnHold ir btnRoll idedam i if(playing), tai reiskia, jog kol bus true, tie mygtukai veiks, o kai pasieksim rezultata 100, tuomet playing bus false ir mygtukai nebeveiks.
      document
        .querySelector(`.player--${activePlayer}`) // kai renkames querySelector, tai klase turi buti su tasku priekyje pasirinkta.
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player (kodas is auksciau yra paverciamas funkcija ir bus cia issaukiama:
      // //document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // //switch to next player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

// 86 LESSON - RESETTING THE GAME

// // Mano sprendimas, veikiantis 100proc.
// document.querySelector('.btn--new').addEventListener('click', function () {
//   diceEl.classList.add('hidden');
//   document.getElementById('score--0').textContent = 0;
//   document.getElementById('score--1').textContent = 0;
//   scores = [0, 0];
//   activePlayer = 0;
//   document.getElementById('current--0').textContent = 0;
//   document.getElementById('current--1').textContent = 0;
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   currentScore = 0;
//   playing = true;
// });

// Destytojo sprendimas:

// paimami visi sie elementai ir sukuriama funkcija INIT del DRY:
// score0el.textContent = 0;
// score1el.textContent = 0;
// current0El.textContent = 0;
// current1El.textContent = 0;
// player0El.classList.remove('player--winner');
// player1El.classList.remove('player--winner');
// player0El.classList.add('player--active');
// player1El.classList.remove('player--active');
// let scores = [0, 0];
// let activePlayer = 0;
// let currentScore = 0;
// let playing = true;

btnNew.addEventListener('click', init);
