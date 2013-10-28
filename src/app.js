var module = angular.module('app', []);

module.factory('playerModel', function() {
	var player = function(symbol) {
		this.name = '';
		this.symbol = symbol;

		this.getSymbol = function() {
			return this.symbol;
		}

		this.getName = function() {
			return this.name;
		}
	}

	return player;
});

module.service('playerCollection', function() {
	return {
		players : [],
		add : function(player) {
			this.players.push(player);
		},
		get : function(index) {
			return this.players[index];
		},
		size : function() {
			return this.players.length;
		},
		getAsArray : function() {
			return this.players;
		}
	}
});

module.controller('playerController', ['$scope', 'playerModel', 'playerCollection', 'readyToPlay', 
	function($scope, playerModel, playerCollection, readyToPlay) {
		var playerOne = new playerModel('X');
		var playerTwo = new playerModel('O');
		var players = $scope.players = playerCollection;
		
		players.add(playerOne);
		players.add(playerTwo);
		
		$scope.readyToPlay = readyToPlay;
		$scope.playerIndex = 0;

		$scope.submitName = function() {
			if( $scope.playerIndex < players.size() - 1) {
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
					<input type=\"text\" ng-model=\"players.get(playerIndex).name\"/>\
					<button ng-click=\"submitName()\">Submit</button>\
					</section>"
	}
	
});


//Change to boardController
module.controller('gridController', ['$scope', 'playerCollection', function($scope, playerCollection) {
	$scope.board = ['', '', '', '', '', '', '' ,'' ,''];
	$scope.players = playerCollection;
	$scope.currentPlayer;
	$scope.gameOver = false;
	$scope.currentTurn = 1;

	$scope.setPiece = function(index) {
		
		if (($scope.board[index] == '') && !$scope.gameOver) {
			$scope.currentPlayer = $scope.players.get($scope.currentTurn % 2);
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