# Tic-Tac-Toe

Game of Tic-Tac-Toe 

HOW THE GAME WORKS 

Game requires two players 

  Players may choose icons from a list
  Default icons are 'X' for player 1 and 'O' for player 2
  Players may change Icons at any time, however it is recommended that players only change icons between games. 

  Scoreboard keeps track of each players wins.
  Scores can be reset back to zero by pressing the 'Reset Scores' button.  

  Game notifies users who's turn it is.
  Game notifies users if the game is a draw.
  No points awarded for draws. 

  Player 1 always goes first when both player scores equal 0 (this is basically when the game is reset or first loaded). 
  After this, the game alternates between players after each game until the scores are reset back to zero.

  Enjoy!!





BUGS AND DIFFICULTIES DURING CREATION 

  Issue:
  The last button did not display its symbol when clicked. When someone won or the game resulted in a draw, the final X or O did not render.

  Why it was happening:
  I realized this issue was due to calling the resetGame() function too early. Initially, within my checkWinner() function, I called resetGame() immediately after checking for a winner or a draw. This caused the game to reset before the final symbol had a chance to display.

  Solution: 
  To solve this, I modified the function call to use setTimeout(resetGame, 1000);. This adjustment introduced a 1-second delay before resetting the game, allowing the final symbol to render properly on the board before the game reset.


