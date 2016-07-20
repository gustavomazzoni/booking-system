describe( 'booking service', function() {

	beforeEach( module( 'bookingflow.services' ) );

	var booking;
	beforeEach( inject( function( _booking_ ) {
		booking = _booking_;
	}));

	describe( 'saveState method', function() {

		it( 'should save param object into reservation instance variable then return it', inject( function() {
			var param = {service:{id:1}, slot:{}};
			var response = booking.saveState(param);
			// expect to be not null or undefined
			expect( response ).toBeTruthy();
			// expect to be an object
			expect( response ).toBeObject();
			// expect to have at least one instance member
			expect( response ).toBeNonEmptyObject();
			// expect to have same id passed as parameter
			expect( response.service.id ).toEqual(1);
		}));

	});

});

