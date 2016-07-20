/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'service service', function() {

	beforeEach( module( 'bookingflow.services' ) );

	var service;
	beforeEach( inject( function( _service_ ) {
		service = _service_;
	}));

	describe( 'findById method', function() {

		it( 'should return a valid service object', inject( function() {
			service.findById('578950539443219907a74827').then( function(response) {
				// expect to be not null or undefined
				expect( response ).toBeTruthy();
				// expect to be an object
				expect( response ).toBeObject();
				// expect to have at least one instance member
				expect( response ).toBeNonEmptyObject();
				// expect to have same id passed as parameter
				// expect( response.id ).toEqual(1);
				expect( response.id ).toEqual('578950539443219907a74827');
			});
		}));
	});
});

