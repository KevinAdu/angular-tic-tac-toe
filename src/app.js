var module = angular.module('app', []);

module.value('readyToPlay', false);
module.value('currentTurn', 1);

module.factory('playerModel', function() {
	var player = function(symbol) {
		this.name = '';
		this.symbol = symbol;
	}

	return player;
});

module.service('playerCollection', 
	function(currentTurn) {
		return {
			_players : [],
			add : function(player) {
				this._players.push(player);
			},
			getByIndex : function(index) {
				return this._players[index];
			},
			size : function() {
				return this._players.length;
			},
			getPlayers : function() {
				return this._players;
			},
			areNamesSet : function() {
				return this._pluck('name').indexOf('') == -1
			},
			getCurrentPlayer : function (turn) {
				return this._players[turn % 2];
			},		
			_pluck : function (field) {
				var arr = [];
				for (var i = 0; i < this._players.length; i ++) {
					arr.push(this._players[i][field]);
				}

				return arr;
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
			if(!players.areNamesSet()) {
				$scope.playerIndex += 1; 
			} else {
				$scope.readyToPlay = true;
			}
		}
	}
]);


module.directive('playerForm', 
	function() {
		return { 
			restrict:'E',
			controller:'playerController',
			template: "<section ng-hide=\"readyToPlay\">\
							<h1>Player {{playerIndex + 1}}</h1>\
							<h1>Enter your name</h1>\
							<input type=\"text\" ng-model=\"players.getByIndex(playerIndex).name\"/>\
							<button ng-click=\"submitName()\">Submit</button>\
						</section>"
		}
	
});

//Change to boardController
module.controller('boardController', ['$scope', 'playerCollection', 'currentTurn', 
	function($scope, playerCollection, currentTurn) {
		$scope.board = ['', '', '', '', '', '', '' ,'' ,''];
		$scope.players = playerCollection;
		$scope.gameOver = false;
		$scope.currentTurn = currentTurn;

		$scope.setPiece = function(index) {
			if (($scope.board[index] == '') && !$scope.gameOver) {
				$scope.board[index] = $scope.players.getCurrentPlayer($scope.currentTurn).symbol;
				
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
			var winningRegex = new RegExp($scope.players.getCurrentPlayer($scope.currentTurn) + "{3}");

			return ($scope.board[0] + $scope.board[1] + $scope.board[2]).search(winningRegex) != -1
	            || ($scope.board[3] + $scope.board[4] + $scope.board[5]).search(winningRegex) != -1
	            || ($scope.board[6] + $scope.board[7] + $scope.board[8]).search(winningRegex) != -1
	            || ($scope.board[0] + $scope.board[3] + $scope.board[6]).search(winningRegex) != -1
	            || ($scope.board[1] + $scope.board[4] + $scope.board[7]).search(winningRegex) != -1
	            || ($scope.board[2] + $scope.board[5] + $scope.board[8]).search(winningRegex) != -1
	            || ($scope.board[0] + $scope.board[4] + $scope.board[8]).search(winningRegex) != -1
	            || ($scope.board[2] + $scope.board[4] + $scope.board[6]).search(winningRegex) != -1;
		}
	}
]);