# blackjack

Our class spent nearly 3 days covering this assignment.

As of May 16, 2016 my biggest breakthrough is finidng a better way to sort through the images of the cards rather than manually typing out all 52 values in an array. This was done using a "for-loop" and .push methods in an array like this:


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




~~ SIDENOTE ~~
Codecademy exercises really helped me understand this assignment better.
Here are the links in sequential order:
https://www.codecademy.com/courses/blackjack-part-1/0/1
https://www.codecademy.com/courses/blackjack-part-2/0/1
https://www.codecademy.com/courses/blackjack-part-3/0/1

From the Codecademy exercises, I learned the following concepts:
*getters
*private variables
*constructors: used to make objects
*Math.floor((Math.random()*52)+1) !--> to round numbers, to get random numbers between a designated value.
*switch statements !--> kind of like if statements
