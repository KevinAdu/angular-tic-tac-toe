describe('app', function() {
	beforeEach(
		function() {
			module('app');
			extraPlayer = {
    			'name': 'Takamura',
    			'symbol': 'Y'
    		};
    		emptyPlayer = {
    			'name': '',
    			'symbol': ''
    		};
		}
	);

	var playersColl;
	var extraPlayer;
	var emptyPlayer;

	describe('gridControllerTest', function() {
		it('stuff', function() {
			expect('1').toEqual('1');
		});
	});

	describe('playerCollectionTest', function() {
		beforeEach(function() {
			inject(function(playerCollection) {
		    	playersColl = playerCollection;
		    	playersColl._players = [
		    		{
		    			'name': 'Miyata',
		    			'symbol': 'X'
		    		},
		    		{
		    			'name': 'Ippo',
		    			'symbol': 'O'
		    		}
		    	]
		    });	
		});

		it('add - adds player to collection', function() {
			expect(playersColl._players.length).toEqual(2);
			playersColl.add(extraPlayer);
			expect(playersColl._players.length).toEqual(3);	
			expect(playersColl._players[2]).toEqual(extraPlayer);	
		});

		it('getByIndex - get player by index', function() {
			expect(playersColl._players[0]).toEqual(playersColl.getByIndex(0));		
			expect(playersColl._players[1]).toEqual(playersColl.getByIndex(1));		
		});

		it('pluck - returns an array of values of the field listed from the collection', function() {
			expect(['Miyata', 'Ippo']).toEqual(playersColl._pluck('name'));
			expect([]).toEqual(playersColl._pluck('doesntExist'));
		});

		it('areNamesSet - check if the names are set for each player', function() {
			playersColl._players = [];
			playersColl._players.push(emptyPlayer);
			playersColl._players.push(emptyPlayer);
			expect(playersColl.areNamesSet()).toEqual(false);

			playersColl._players = [];
			playersColl._players.push(extraPlayer);
			playersColl._players.push(emptyPlayer);
			expect(playersColl.areNamesSet()).toEqual(false);

			playersColl._players = [];
			playersColl._players.push(extraPlayer);
			playersColl._players.push(extraPlayer);
			expect(playersColl.areNamesSet()).toEqual(true);

		});

		it('getCurrentPlayer - gets the player whose current turn it is', function() {
			expect(playersColl.getCurrentPlayer(1)).toEqual(playersColl._players[0]);
			expect(playersColl.getCurrentPlayer(2)).toEqual(playersColl._players[1]);
			expect(playersColl.getCurrentPlayer(7)).toEqual(playersColl._players[0]);
			expect(playersColl.getCurrentPlayer(8)).toEqual(playersColl._players[1]);
		});

	});
});