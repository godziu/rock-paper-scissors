'use strict';
// var wins = 0;
// var lose = 0;
// var draw = 0;
// var result =  document.getElementById('result');
// var reset = document.getElementById('reset-scores');
var gameResult = document.getElementById('gameResult');
// var params.limit;

var params = {
  wins: 0,
  lose: 0,
  draw: 0,
  result: document.getElementById('result'),
  reset: document.getElementById('reset-scores'),
  // gameResult: document.getElementById('gameResult');
  limit: 0
}

disableButtons(true,'grey');

// var btnPlayerMove = document.querySelectorAll('.player-move'); // ustalam zmienną dla wszystkich elementów, które mają klasę "player-move"

// for (var i = 0; i < btnPlayerMove.length; i++) {
//   var dataMove = btnPlayerMove[i].getAttribute('data-move'); // tworzę pętlę, która wyciąga z przeszukanych elementów atrybut "data-move"
  
//   btnPlayerMove[i].addEventListener('click', function() { // funkcja z argumentem "dataMove"
//     playerMove(dataMove);
//   });
// }


var showModal = function(event){
    if(event){
      event.preventDefault();
      var modalAttrib = event.target.getAttribute('href');
      var allModals = document.querySelectorAll('.modal');
      var overlayId = "#modal-overlay";

      for(var i = 0; i < allModals.length; i++) {
        allModals[i].classList.remove('show');
      }
      document.querySelector(modalAttrib).classList.add('show');
      document.querySelector(overlayId).classList.add('show');
    }
    else {
      var modalId = document.getElementById('modal-overlay');
      var modal = document.querySelector('.modal');
      modalId.classList.add('show');
      modal.classList.add('show');
    }
  };
  
  // Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale
  
  var modalLinks = document.querySelectorAll('.show-modal');
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', showModal);
  }
  
  // Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  // Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
  // Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
  
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }

// funkcja generujaca losowa liczbę oznaczajaca ruch komputera
function generateRandomNumber() {
  return Math.floor((Math.random() * (3 - 1 + 1)) + 1);
}

// funkcja przypisujaca wartosc zmiennej win/lose/draw do poszczegolnych id z html
function setStats() {
  document.getElementById("wins").innerHTML = params.wins;
  document.getElementById("losses").innerHTML = params.lose;
  document.getElementById("draws").innerHTML = params.draw;
}
// funckaj przypisujaca do wartosci 1/2/3 wytworzonych przez funkcje 'generateRandomNumber' wartosci slowne paper/rock/scissors
function generateComputerMove() {
  var randomNumber = generateRandomNumber()
  var computerMove;
  if(parseInt(randomNumber) === 1) {
    computerMove = "paper"
  }
  else if(parseInt(randomNumber) === 2) {
    computerMove = "rock"
  }
  else if(parseInt(randomNumber) === 3) {
    computerMove = "scissors"
  }
  return computerMove;
}
// funkcja porownujaca ruch gracza i wygenerowany ruch komputera i zwracajaca input o rezultacie, zmienia rowniez wartosci zmiennych win/lose/draws w zaleznosci od rezultatu
function compare(computerMove,userMove) {
  if(userMove === "rock") {
    if(computerMove === "scissors") {
      params.result.innerHTML = "You won, computer played scissors!";
      params.wins++;
    }
    else if(computerMove === "paper"){
      params.result.innerHTML = "You lose, computer played paper!";
      params.lose++;
    }
  }
  if(userMove === "paper"){
    if(computerMove === "rock"){
      params.result.innerHTML = "You won, computer played rock!";
      params.wins++;
    }
    else if(computerMove === "scissors"){
      params.result.innerHTML = "You lose, computer played scissors!";
      params.lose++;
    }
  }
  if(userMove === "scissors"){
    if(computerMove === "paper"){
      params.result.innerHTML = "You won, computer played paper!";
      params.wins++;
    }
    else if(computerMove === "rock"){
      params.result.innerHTML = "You lose, computer played rock!";
      params.lose++;
    }
  }
  if(userMove === computerMove){
    params.result.innerHTML = "The result is a tie!";
    params.draw++;
  }
}
// funkcja pobierajaca wartosc wpisana w prompta i przypisujaca ja do zmiennej 'params.limit'. funkcja zwraca komunikat w inpucie z informacja do jakiej ilosci wygranych bedzie toczyla sie gra
function roundsLimit() {
  params.limit = window.prompt('How many round would u play?');
  if(params.limit > 0) {
     numberOfLimit.innerHTML = 'We will play up to ' + params.limit + ' wins';
   }
   else if(isNaN(params.limit) || params.limit <= 0) {
     numberOfLimit.innerHTML = 'Please type correct number of rounds';
 }
  return params.limit;
}

// funkcja pobiera informacje zapisane w zmiennych win/lose i porownuje ja z wartoscia zmiennej params.limit. jesli params.limit jest rowny win lub lose, zwracana jest informacja o rezultacie rozgrywki, uruchamia funkcje disableButtons w momencie spelnienia warunku wins==params.limit || lose==params.limit
function gameIsOver(){
  setStats();
  if(params.wins == params.limit){
    gameResult.innerHTML = 'YOU WON THE ENTIRE GAME!!!';
    disableButtons(true,'grey');
    showModal();
  }
  else if(params.lose == params.limit){
    gameResult.innerHTML = 'YOU LOSE, COMPUTER WAS BETTER!!!';
    disableButtons(true,'grey');
    showModal();
  }
}


// funkcja odpowiedzialna za zablokowanie przyciskow o id paper/rock/scissors lub odblokowanie ich w zaleznosci od akcji, zmienia rowniez styl przyciskow w zaleznosci od akcji.
function disableButtons(flag,bgColor){
  document.getElementById("paper").disabled = flag;
  document.getElementById("rock").disabled = flag;
  document.getElementById("scissors").disabled = flag;
  document.getElementById("paper").style.backgroundColor = bgColor;
  document.getElementById("rock").style.backgroundColor = bgColor;
  document.getElementById("scissors").style.backgroundColor = bgColor;
}


// eventListener "click" nasluchujacy akcji klikniecia w elementy o id buttons, w tym przypadku w caly div buttonow. przypisuje zmiennej userMove wartosc id klikanego w danym momencie buttona, przypisuje zmiennej computerMove wartosci pozyskane w funkcji 'generateComputerMove', uruchamia funkcje 'compare' dla 'computerMove' i 'userMove', uruchamia fukcje setStats zmieniajac tablice wynikow z kazdym kliknieciem w buttony,sprawdza przy kazdej akcji czy 'params.limit' jest juz rowny win lub lose(funkcja gameIsOver)
document.getElementById('buttons').addEventListener('click', function(event) {
  var userMove = event.target.id;
  var computerMove = generateComputerMove();
  compare(computerMove,userMove);
  setStats();
  gameIsOver();
});

// eventListener odpowiedzialny za nasluchiwanie akcji click na buttonie New Game(zmienna result, id gameResult), w pierwszej kolejnosci nadaje zmiennym lose/wins/draw wartosc 0, uruchamia prompta z zapytaniem o ilosc rund w nowej grze, odblokowuje mozliwosc uzywania buttonow paper/rock/scissors i czysci inputy
 params.reset.addEventListener('click', function() {
  params.lose = 0;
	params.wins = 0;
	params.draw = 0;
  params.limit = 0;
  roundsLimit();
  setStats();
  disableButtons(false,'#02ac46');
  params.result.innerHTML = "";
  gameResult.innerHTML = "";
});

 // _____________________________________________________



  
  
  // Teraz wystarczy napisać funkcję otwierającą modal:
  
  
  





