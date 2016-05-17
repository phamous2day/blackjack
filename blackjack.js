var dealerHand = [];
var playerHand = [];

function newDeck(){
  var deck = [];
  var words = ["ace", "king", "queen", "jack", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",]
  for (var i = 0; i<13; i++){
    deck.push({point: words[i], suit: 'Spades'})
    deck.push({point: words[i], suit: 'Hearts'})
    deck.push({point: words[i], suit: 'Clubs'})
    deck.push({point: words[i], suit: 'Diamonds'})
  }
  return deck;
}

function getCardImageUrl(card) {
  var cardName;
  if(card.point ===1){
    cardName ='ace';
  } else if (card.point ===11){
    cardName ='jack';
  }else if (card.point ===11){
    cardName ='queen';
  }else if (card.point ===11){
    cardName ='king';
  }else{
    cardName =card.point
  }
  return 'images/' + cardName + card.suit + '.png'
}



function shuffle(deck){
  var newDeck = [];
  while(deck.length> 0){
    var idx = Math.floor(Math.random() * deck.length);
    var card = deck[idx];
    newDeck.push(card);
    deck.splice(idx,1);
  }
  return newDeck;
}


function resetGame() {
  deck= shuffle(newDeck());
  dealerHand = [];
  playerHand = [];
  $('#playerPoints').text("");
  $('#dealerPoints').text("");
  $('#messages').text("");
  $('#playerHand').html("");
  $('#dealerHand').html("");
}

function dealCard(hand, element) {
  var card = deck.pop();
  hand.push(card);
  // Draw a card at random from middle of the deck

  var idx = Math.floor(Math.random() * deck.length);
  var card = deck[idx];
  console.log('Before: deck has ' + deck.length + ' cards.');
  deck.splice(idx, 1);
  console.log('After: deck has ' + deck.length + ' cards.');

  var url = getCardImageUrl(card);
  var cardHTML = '<img class="card" src="' + url + '"/>';
  $(element).append(cardHTML);
}

function calculatePoints(hand) {
  // makes a copy of the hand array, so we don't modify it
  hand = hand.slice(0);

  // sort the array in reverse point order, so Aces are at the end for point decision between 1 or 11
  function compare(card1, card2) {
    return card2.point - card1.point;
  }
  hand.sort(compare);
  var sum = 0;
  for (var i = 0; i < hand.length; i++) {
    var card = hand[i];
    if (card.point > 10) {
      sum = sum + 10;
    } else if (card.point === 1) {
      if (sum + 11 <= 21) {
        sum = sum + 11;
      } else {
        sum = sum + 1;
      }
    } else {
      sum = sum + card.point;
    }
  }
  return sum;
}




function checkForBust() {
  var playerPoints = calculatePoints(playerHand);
  if (playerPoints > 21) {
    $('#messages').text("BUSTED");
    return true;
  }
  var dealerPoints = calculatePoints(dealerHand);
  if (dealerPoints > 21) {
    $('#messages').text("Dealer Busted");
    return true;
  }
  return false;
}

$(function() {

  $('#dealButton').click(function() {
    resetGame();
    dealCard(playerHand, '#playerHand');
    dealCard(dealerHand, '#dealerHand');
    dealCard(playerHand, '#playerHand');
    dealCard(dealerHand, '#dealerHand');
    checkForBust();
  });

  $('#hitButton').click(function() {
    dealCard(playerHand, '#playerHand')
    checkForBust();
  });

  $('#standButton').click(function() {
    var dealerPoints = calculatePoints(dealerHand);
    while (dealerPoints < 17) {
      dealCard(dealerHand, '#dealerHand');
      dealerPoints = calculatePoints(dealerHand);
    }
    if (!checkForBust()) {
      var playerPoints = calculatePoints(playerHand);
      var dealerPoints = calculatePoints(dealerHand);
      if (playerPoints > dealerPoints) {
        $('#messages').text('You Won!');
      } else if (playerPoints === dealerPoints) {
        $('#messages').text('Push');
      } else {
        $('#messages').text('You Lose!');
      }
    }
  });

});
