//1 player 1 dealer
// create and shuffle a deck
// 2 cards each
// check for blackjack, higher hand value
// display hands

//game states and starting game mode
var gameStart = `Start`;
var gameCardDraw = `Cards Drawn.`;
var gameCompare = `Results`;
var currentGameMode = gameStart;
var playerHand = [];
var dealerHand = [];
var gameDeck = `empty at the start`;

//create deck
var createDeck = function () {
  var deck = [];
  var suits = [`♥`, `♦`, `♣`, `♠`];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var CardName = rankCounter;
      if (CardName == 1) {
        CardName = `Ace`;
      }
      if (CardName == 11) {
        CardName = `Jack`;
      }
      if (CardName == 12) {
        CardName = `Queen`;
      }
      if (CardName == 13) {
        CardName = `King`;
      }
      var card = {
        name: CardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

var main = function (input) {
  output = "";
  return output;
};
