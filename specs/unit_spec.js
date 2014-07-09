

describe("My Unit", function () {
	beforeEach(module('App'));

	it("should be ok", function () {
		inject(function ($rootScope, $controller) {
			var scope = $rootScope.$new();
			var ctrl = $controller('MainCtrl', { $scope: scope });

			expect(scope.foobar).toEqual('bazbaz');
		});
	});
});

