'use strict';
var wins = 0;
var lose = 0;
var draw = 0;
var result =  document.getElementById('result');
var reset = document.getElementById('reset-scores');
var gameResult = document.getElementById('gameResult');
var limit;


// funkcja generujaca losowa liczbę oznaczajaca ruch komputera
function generateRandomNumber() {
  return Math.floor((Math.random() * (3 - 1 + 1)) + 1);
}

// funkcja przypisujaca wartosc zmiennej win/lose/draw do poszczegolnych id z html
function setStats() {
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = lose;
  document.getElementById("draws").innerHTML = draw;
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
      result.innerHTML = "You won, computer played scissors!";
      wins++;
    }
    else if(computerMove === "paper"){
      result.innerHTML = "You lose, computer played paper!";
      lose++;
    }
  }
  if(userMove === "paper"){
    if(computerMove === "rock"){
      result.innerHTML = "You won, computer played rock!";
      wins++;
    }
    else if(computerMove === "scissors"){
      result.innerHTML = "You lose, computer played scissors!";
      lose++;
    }
  }
  if(userMove === "scissors"){
    if(computerMove === "paper"){
      result.innerHTML = "You won, computer played paper!";
      wins++;
    }
    else if(computerMove === "rock"){
      result.innerHTML = "You lose, computer played rock!";
      lose++;
    }
  }
  if(userMove === computerMove){
    result.innerHTML = "The result is a tie!";
    draw++;
  }
}
// funkcja pobierajaca wartosc wpisana w prompta i przypisujaca ja do zmiennej 'limit'. funkcja zwraca komunikat w inpucie z informacja do jakiej ilosci wygranych bedzie toczyla sie gra
function roundsLimit() {
  limit = window.prompt('How many round would u play?');
  if(limit > 0) {
     numberOfLimit.innerHTML = 'We will play up to ' + limit + ' wins';
   }
   else if(isNaN(limit) || limit <= 0) {
     numberOfLimit.innerHTML = 'Please type correct number of rounds';
 }
  return limit;
}

// funkcja pobiera informacje zapisane w zmiennych win/lose i porownuje ja z wartoscia zmiennej limit. jesli limit jest rowny win lub lose, zwracana jest informacja o rezultacie rozgrywki, uruchamia funkcje disableButtons w momencie spelnienia warunku wins==limit || lose==limit
function gameIsOver(){
  setStats();
  if(wins == limit){
    gameResult.innerHTML = 'YOU WON THE ENTIRE GAME!!!';
    disableButtons(true,'grey');
  }
  else if(lose == limit){
    gameResult.innerHTML = 'YOU LOSE, COMPUTER WAS BETTER!!!';
    disableButtons(true,'grey');
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


var btnPlayerMove = document.querySelectorAll('.player-move'); // ustalam zmienną dla wszystkich elementów, które mają klasę "player-move"

for (var i = 0; i < btnPlayerMove.length; i++) {
  var dataMove = btnPlayerMove[i].getAttribute('data-move'); // tworzę pętlę, która wyciąga z przeszukanych elementów atrybut "data-move"
  
  btnPlayerMove[i].addEventListener('click', function() { // funkcja z argumentem "dataMove"
    playerMove(dataMove);
  });
}


// eventListener "click" nasluchujacy akcji klikniecia w elementy o id buttons, w tym przypadku w caly div buttonow. przypisuje zmiennej userMove wartosc id klikanego w danym momencie buttona, przypisuje zmiennej computerMove wartosci pozyskane w funkcji 'generateComputerMove', uruchamia funkcje 'compare' dla 'computerMove' i 'userMove', uruchamia fukcje setStats zmieniajac tablice wynikow z kazdym kliknieciem w buttony,sprawdza przy kazdej akcji czy 'limit' jest juz rowny win lub lose(funkcja gameIsOver)
document.getElementById('buttons').addEventListener('click', function(event) {
  var userMove = event.target.id;
  var computerMove = generateComputerMove();
  compare(computerMove,userMove);
  setStats();
  gameIsOver();
});

// eventListener odpowiedzialny za nasluchiwanie akcji click na buttonie New Game(zmienna result, id gameResult), w pierwszej kolejnosci nadaje zmiennym lose/wins/draw wartosc 0, uruchamia prompta z zapytaniem o ilosc rund w nowej grze, odblokowuje mozliwosc uzywania buttonow paper/rock/scissors i czysci inputy
 reset.addEventListener('click', function() {
  lose = 0;
	wins = 0;
	draw = 0;
  limit = 0;
  roundsLimit();
  setStats();
  disableButtons(false,'#02ac46');
  result.innerHTML = "";
  gameResult.innerHTML = "";
});


