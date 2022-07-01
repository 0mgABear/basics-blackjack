//1 player 1 dealer
// create and shuffle a deck
// 2 cards each
// check for blackjack, higher hand value
// display hands
//game states and starting game mode
var gameStart = `Start`;
var gameCardDraw = `Hit or Stand`;
var gameDealer = `Dealer's Turn!`;
var gameCompare = `Comparing Scores`;
var gameEnd = `End`;
var currentGameMode = gameStart;
var playerHand = [];
var dealerHand = [];
var gameDeck = [];

//function create deck
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
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
//shuffle function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentCard = cards[index];
    var randomCard = cards[randomIndex];
    cards[index] = randomCard;
    cards[randomIndex] = currentCard;
    index += 1;
  }
  return cards;
};
//instantly create a shuffled deck
var newShuffledDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};
//check starting hand (either dealer or player) for blackjack -> instant winning condition
var checkBlackjack = function (handArray) {
  var cardOne = handArray[0];
  var cardTwo = handArray[1];
  var blackjack = false;
  if (
    (cardOne.name == `Ace` && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == `Ace`) ||
    (cardOne.name == `Ace` && cardTwo.name == `Ace`)
  ) {
    blackjack = true;
  }
  return blackjack;
};
//numerical value of hand
var handValue = function (handArray) {
  var totalHandValue = 0;
  for (i = 0; i < handArray.length; i++) {
    var currentCard = handArray[i];
    if (
      currentCard.name == `Jack` ||
      currentCard.name == `Queen` ||
      currentCard.name == `King`
    ) {
      totalHandValue += 10;
    } else {
      totalHandValue += currentCard.rank;
    }
  }
  return totalHandValue;
};
var displayCardsinHand = function (playerHandArray, dealerHandArray) {
  var playerCards = `Player has: <br>`;
  var dealerCards = `Dealer has: <br>`;
  for (i = 0; i < playerHandArray.length; i++) {
    playerCards = playerCards + playerHandArray[i].name + playerHand[i].suit;
  }
  for (i = 0; i < dealerHandArray.length; i++) {
    dealerCards =
      dealerCards + dealerHandArray[i].name + dealerHandArray[i].suit;
  }
  return playerCards + `<br>` + dealerCards;
};
var totalCardValue = function (playerHandValue, dealerHandValue) {
  var message =
    `Player score:` + playerHandValue + `<br> Dealer Score:` + dealerHandValue;
  return message;
};

var main = function (input) {
  output = ``;
  if (currentGameMode == gameStart) {
    gameDeck = newShuffledDeck(); //create deck
    for (i = 0; i < 2; i++) {
      playerHand.push(gameDeck.shift());
      dealerHand.push(gameDeck.shift());
    }
    output =
      `Cards Dealt! <br><br>` +
      displayCardsinHand(playerHand, dealerHand) +
      `<br><br>` +
      `Hand Values Are: <br>` +
      `(Player): ${handValue(playerHand)}` +
      `<br>` +
      `(Dealer): ${handValue(dealerHand)}` +
      `<br> Would You like to Hit Or Stand?`; //displaying initial hand

    var playerBlackjack = checkBlackjack(playerHand);
    var dealerBlackjack = checkBlackjack(dealerHand);
    //check for blackjack
    if (playerBlackjack == true || dealerBlackjack == true) {
      currentGameMode = gameEnd; //end the game
      //checking for blackjack in initial hand -> if blackjack -> game ends.
      if (playerBlackjack == true && dealerBlackjack == true) {
        //checking for any blackjack
        output = displayCardsinHand(playerHand, dealerHand) + `Blackjack Tie!`;
      } else if (playerBlackjack == true && dealerBlackjack == false) {
        output =
          `Player Blackjack Win!` +
          `<br><br>` +
          displayCardsinHand(playerHand, dealerHand);
      } else {
        output =
          `Dealer Blackjack Win!` +
          `<br>` +
          displayCardsinHand(playerHand, dealerHand);
      }
      currentGameMode = gameCardDraw; //transition to next game mode automatically
    }
  }
  if (currentGameMode == gameCardDraw) {
    if (input == hit) {
      //if input is hit
      playerHand.push(gameDeck.shift()); //push a card to player hand
      var playerHandValue = handValue(playerHand);
      var dealerHandValue = handValue(dealerHand);
      output = `Current cards: ${displayCardsinHand(
        playerHand,
        dealerHand
      )}. Total hand values:
       ${totalCardValue(
         playerHandValue,
         dealerHandValue
       )}. Do you still wish to draw?`;
      if (playerHandValue >= 21) {
        //checking if player goes bust at any point in time
        output =
          `Sorry! You went bust! Dealer wins!` +
          `<br><br>` +
          displayCardsinHand(playerHand, dealerHand) +
          `<br><br>` +
          totalCardValue(playerHandValue, dealerHandValue);
      }
    }
    if (input == stand) {
      console.log(currentGameMode);
      output = `No Blackjack! Dealer's Turn!`;
      currentGameMode = gameDealer;
    }
  }
  if (currentGameMode == gameDealer) {
    var dealerHandValue = handValue(dealerHand);
    while (dealerHandValue <= 16) {
      dealerHand.push(gameDeck.shift());
      dealerHandValue = handValue(dealerHand);
      console.log(dealerHandValue);
    }
    currentGameMode = gameCompare;
  }
  if (currentGameMode == gameCompare) {
    var playerHandValue = handValue(playerHand);
    var dealerHandValue = handValue(dealerHand);
    if (playerHandValue == dealerHandValue) {
      output =
        `Tie, Same Hand!` +
        `<br>` +
        displayCardsinHand(playerHand, dealerHand) +
        `<br>` +
        totalCardValue(playerHandValue, dealerHandValue);
    } else if (playerHandValue > dealerHandValue) {
      output =
        `Player Wins!` +
        `<br>` +
        displayCardsinHand(playerHand, dealerHand) +
        `<br>` +
        totalCardValue(playerHandValue, dealerHandValue);
    } else if (dealerHandValue >= 21) {
      output =
        `Player Wins! Dealer Went bust!` +
        displayCardsinHand(playerHand, dealerHand) +
        totalCardValue(playerHandValue, dealerHandValue);
    } else {
      output =
        `Dealer Wins!` +
        `<br>` +
        displayCardsinHand(playerHand, dealerHand) +
        `<br>` +
        totalCardValue(playerHandValue, dealerHandValue);
    }
  }
  return output;
};
