var module = angular.module('app', []);

module.factory('boardModel', function() {
	var model = ['', '', '', '', '', '', '' ,'' ,''];
	return model;
});

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


//Change to boardController
module.controller('gridController', ['$scope', 'boardModel', 'playerModel', function($scope, boardModel, playerModel) {
	var board = $scope.board = boardModel;
	var players = $scope.players = playerModel;
	var currentTurn = 1;

	$scope.setPiece = function(index) {
		board[index] = players[currentTurn%2].symbol;
		currentTurn += 1;
	}
}]);