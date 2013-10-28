var module = angular.module('app', []);

module.factory('playerModel', function() {
	var model =
		[
			{
				'name':'',
				'symbol':'X',
			},
			{
				'name':'',
				'symbol':'O',
			}
		]

		return model;
});

module.controller('playerController', ['$scope', 'playerModel', 'readyToPlay', 
	function($scope, playerModel, readyToPlay) {
		var players = $scope.players = playerModel;
		
		$scope.readyToPlay = readyToPlay;
		$scope.playerIndex = 0;

		$scope.submitName = function() {
			if( $scope.playerIndex < playerModel.length - 1) {
				$scope.playerIndex += 1; 
			} else {
				$scope.readyToPlay = true;
			}
		}
	}
]);

module.value('readyToPlay', false);


module.directive('playerForm', function() {
	return { 
		restrict:'E',
		controller:'playerController',
		template: "<section ng-hide=\"readyToPlay\">\
					<h1>Player {{playerIndex + 1}}</h1>\
					<h1>Enter your name</h1>\
					<input type=\"text\" ng-model=\"players[playerIndex].name\"/>\
					<button ng-click=\"submitName()\">Submit</button>\
					</section>"
	}
	
});


//Change to boardController
module.controller('gridController', ['$scope', 'playerModel', function($scope, playerModel) {
	var board = $scope.board = ['', '', '', '', '', '', '' ,'' ,''];
	var players = $scope.players = playerModel;
	var currentPlayer;
	var gameOver = false;

	$scope.currentTurn = 1;

	$scope.setPiece = function(index) {
		
		if ((board[index] == '') && !gameOver) {
			currentPlayer = players[$scope.currentTurn % 2];
			board[index] = currentPlayer.symbol;
			gameOver = _checkIfWinner();
			$scope.currentTurn += 1;
		}
		
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