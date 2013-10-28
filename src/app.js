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
	$scope.board = ['', '', '', '', '', '', '' ,'' ,''];
	$scope.players = playerModel;
	$scope.currentPlayer;
	$scope.gameOver = false;
	$scope.currentTurn = 1;

	$scope.setPiece = function(index) {
		
		if (($scope.board[index] == '') && !$scope.gameOver) {
			$scope.currentPlayer = $scope.players[$scope.currentTurn % 2];
			$scope.board[index] = $scope.currentPlayer.symbol;
			
			if(_checkIfWinner()) {
				$scope.gameOver = true;
			} else {
				$scope.currentTurn += 1;
			}
		}
	}

	$scope.reset = function() {
		$scope.currentTurn = 1;
		$scope.board = ['', '', '', '', '', '', '' ,'' ,''];
		$scope.gameOver = false;
	}

	var _checkIfWinner = function() {
		var winningRegex = new RegExp($scope.currentPlayer.symbol + "{3}");

		return ($scope.board[0] + $scope.board[1] + $scope.board[2]).search(winningRegex) != -1
            || ($scope.board[3] + $scope.board[4] + $scope.board[5]).search(winningRegex) != -1
            || ($scope.board[6] + $scope.board[7] + $scope.board[8]).search(winningRegex) != -1
            || ($scope.board[0] + $scope.board[3] + $scope.board[6]).search(winningRegex) != -1
            || ($scope.board[1] + $scope.board[4] + $scope.board[7]).search(winningRegex) != -1
            || ($scope.board[2] + $scope.board[5] + $scope.board[8]).search(winningRegex) != -1
            || ($scope.board[0] + $scope.board[4] + $scope.board[8]).search(winningRegex) != -1
            || ($scope.board[2] + $scope.board[4] + $scope.board[6]).search(winningRegex) != -1;
	}
}]);