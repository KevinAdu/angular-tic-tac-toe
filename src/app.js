var module = angular.module('app', []);

module.factory('playerModel', function() {
	var model =
		[
			{
				'name':'Kevin',
				'symbol':'X',
			},
			{
				'name':'Steve',
				'symbol':'O',
			}
		]

		return model;
});


//Change to boardController
module.controller('gridController', ['$scope', 'playerModel', function($scope, playerModel) {
	var board = $scope.board = ['', '', '', '', '', '', '' ,'' ,''];
	var players = $scope.players = playerModel;
	var currentTurn = 1;
	var currentPlayer;
	var gameOver = false;

	$scope.setPiece = function(index) {
		if ((board[index] == '') && !gameOver) {
			currentPlayer = players[currentTurn % 2]
			board[index] = currentPlayer.symbol;
		
			if(_checkIfWinner()) {
				gameOver = true;
			}	
		}

		currentTurn += 1;
	}

	var _checkIfWinner = function() {
		var winningRegex = new RegExp(currentPlayer.symbol + "{3}");
		return (board[0] + board[1] + board[2]).search(winningRegex) != -1
            || (board[3] + board[4] + board[5]).search(winningRegex) != -1
            || (board[6] + board[7] + board[8]).search(winningRegex) != -1
            || (board[0] + board[3] + board[6]).search(winningRegex) != -1
            || (board[1] + board[4] + board[7]).search(winningRegex) != -1
            || (board[2] + board[5] + board[8]).search(winningRegex) != -1
            || (board[0] + board[4] + board[8]).search(winningRegex) != -1
            || (board[2] + board[4] + board[6]).search(winningRegex) != -1;
	}
}]);