// event handler for player clicking a square
$(document).ready(function() {
  $('input.reset').on('click', clearBoard);

  // markX or markO depending on whose turn it is
  $('.board td').on('click', goHere);

  // easter eggs
  $('h1 span').on('mouseover', toe);
  $('h1 span').on('mouseleave', robot);
});

// global variables
var clickCount = 0;
var winner = false;

// function called every time a square is clicked.
function goHere(e) {
  e.preventDefault();

  if (!winner) {
    winner = false;
    var square = $(this);

    // if square is already occupied, alert user
    if (square.hasClass('player1') || square.hasClass('player2')) {
      alert("Seat's taken!");

      // if it's player 1's turn
    } else if ($('h2 span').text() === '1') {

      // add class player1 and data player x to square
      square.addClass('player1').data('player', 'x');

      // fill square
      square.text('X');

      // increase click count
      clickCount++;

      // check to see if X won
      checkFor('x');

      // change player's turn to player 2
      $('h2 span').text('2');

      // if it's player 2's turn
    } else if ($('h2 span').text() === '2') {

      // add class player 2 and data player o to square
      square.addClass('player2').data('player', 'o');

      // fill square
      square.text('O');

      // increase click count
      clickCount++;

      // check to see if O won
      checkFor('o');

      // change player's turn to player 1
      $('h2 span').text('1');
    }
  }
}


function checkFor(player) {
  var className = player === 'x' ? 'player1' : 'player2';

  if (!winner) {
    // check to see if any vertical row has a winner
    for (var i = 0; i < 3; i++) {
      if(
        $('#row1 td').eq(i).data('player') === player
          && $('#row2 td').eq(i).data('player') === player
          && $('#row3 td').eq(i).data('player') === player
      ) {
        playerWins(player);
      }
    }

    // check to see if any horizontal row has a winner
    if (
      $(`#row1 td.${className}`).length === 3 ||
      $(`#row2 td.${className}`).length === 3 ||
      $(`#row3 td.${className}`).length === 3
    ) {
      playerWins(player);

    // check to see if top left to bottom right diagonal has a winner
    } else if (
      $('#row1 td')
        .eq(0)
        .data('player') === player &&
      $('#row2 td')
        .eq(1)
        .data('player') === player &&
      $('#row3 td')
        .eq(2)
        .data('player') === player
    ) {
      playerWins(player);

    // check to see if bottom left to top right diagonal has a winner
    } else if (
      $('#row1 td')
        .eq(2)
        .data('player') === player &&
      $('#row2 td')
        .eq(1)
        .data('player') === player &&
      $('#row3 td')
        .eq(0)
        .data('player') === player
    ) {
      playerWins(player);
    }

    // if there have been nine clicks and no winner, cat's game
    if (winner === false && clickCount === 9) {
      catGame();
    }
  }
}

function playerWins(player) {
  // figure out which player's score to increment
  var playerToTarget = player === 'x' ? 'p1Score' : 'p2Score';

  // target score and turn into a number
  var scoreToIncrement = +$(`#${playerToTarget}`).text();

  // increment that player's score
  scoreToIncrement++;

  // update dom to reflect new score
  $(`#${playerToTarget}`).html(scoreToIncrement);

  // show that player won
  $('.content').append(`<h1 class='winTag'>Player ${player === 'x' ? '1' : '2'} Wins!</h1>`)
  winner = true;
}

function catGame() {
  // show cat's game
  $('.content').append("<h1 class='winTag'>Cat's Game!</h1>");
  winner = true;
}

function clearBoard() {
  $('.board td').data('player', '');
  $('.board td').removeClass('player1 player2');
  $('.board td').text('');
  clickCount = 0;
  $('.winTag').remove();
  winner = false;
}

function toe() {
  $('.background').css(
    'background-image',
    'url("http://www.paulkonrardy.com/images/Blog/MyLeftBigToe2.jpg")'
  );
}

function robot() {
  $('.background').css('background-image', 'url("css/images/IMG_2534.jpg")');
}
