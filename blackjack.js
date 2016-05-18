
function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getPointName = function() {
  if (this.point === 1) {
    return 'ace';
  } else if (this.point === 11) {
    return 'jack';
  } else if (this.point === 12) {
    return 'queen';
  } else if (this.point === 13) {
    return 'king';
  } else {
    return String(this.point);
  }
};

Card.prototype.getImageUrl = function() {
  return 'images/' + this.getPointName() + '_of_' + this.suit + '.png';
};

function Deck() {
  this.cards = [];
  for (var i = 1; i <= 13; i++) {
    this.cards.push(new Card(i, 'spades'));
    this.cards.push(new Card(i, 'hearts'));
    this.cards.push(new Card(i, 'clubs'));
    this.cards.push(new Card(i, 'diamonds'));
  }
}

Deck.prototype.draw = function() {
  return this.cards.pop();
};

Deck.prototype.numCards = function() {
  return this.cards.length;
};

Deck.prototype.shuffle = function () {
  var newDeck = [];
  var deck = this.cards;
  while (deck.length > 0) {
    var idx = Math.floor(Math.random() * deck.length);
    var card = deck[idx];
    newDeck.push(card);
    deck.splice(idx, 1);
  }
  this.cards = newDeck;
};

function Hand() {
  this.cards = [];
}

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

Hand.prototype.getPoints = function() {
  var hand = this.cards;
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
};

var deck = new Deck();
deck.shuffle();

var dealerHand = new Hand();
var playerHand = new Hand();

function resetGame() {
  deck = new Deck();
  deck.shuffle();
  dealerHand = new Hand();
  playerHand = new Hand();
  $('#player-points').text('');
  $('#dealer-points').text('');
  $('#messages').text('');
  $('#player-hand').html('');
  $('#dealer-hand').html('');
}

function dealCard(hand, element) {
  var card = deck.draw();
  hand.addCard(card);
  var url = card.getImageUrl();
  var cardHTML = '<img class="card" src="' + url + '"/>';
  $(element).append(cardHTML);
}

/*
displayPoints - calculate the points using hand.getPoints for both the dealer and player. And it will update the display with those points #dealer-points and #player-points.
*/
function displayPoints() {
  var dealerPoints = dealerHand.getPoints();
  $('#dealer-points').text(dealerPoints);
  var playerPoints = playerHand.getPoints();
  $('#player-points').text(playerPoints);
}

/*
checkForBusts - get points using hand.getPoints function for both the dealer and player, and display message when someone busts. Returns true if there was a bust, and false otherwise.
*/
function checkForBusts() {
  var playerPoints = playerHand.getPoints();
  if (playerPoints > 21) {
    $('#messages').text('You busted. Better luck next time!');
    return true;
  }
  var dealerPoints = dealerHand.getPoints();
  if (dealerPoints > 21) {
    $('#messages').text('Dealer busted. You win!');
    return true;
  }
  return false;
}

$(function () {

  $('#deal-button').click(function () {
    resetGame();
    dealCard(playerHand, '#player-hand');
    dealCard(dealerHand, '#dealer-hand');
    dealCard(playerHand, '#player-hand');
    dealCard(dealerHand, '#dealer-hand');
    displayPoints();
    checkForBusts();
  });

  $('#hit-button').click(function () {
    dealCard(playerHand, '#player-hand');
    displayPoints();
    checkForBusts();
  });

  $('#stand-button').click(function () {
    var dealerPoints = dealerHand.getPoints();
    while (dealerPoints < 17) {
      dealCard(dealerHand, '#dealer-hand');
      dealerPoints = dealerHand.getPoints();
    }
    displayPoints();
    if (!checkForBusts()) {
      // determine the winner
      var playerPoints = playerHand.getPoints();
      var dealerPoints = dealerHand.getPoints();
      if (playerPoints > dealerPoints) {
        $('#messages').text('You won!');
      } else if (playerPoints === dealerPoints) {
        $('#messages').text('Push');
      } else {
        $('#messages').text('You lose!');
      }
    }

  });

});
