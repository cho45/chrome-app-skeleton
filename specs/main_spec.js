function switchToAppWindow (nth) {
	function _switchToAppWindow (n) {
		if (n <= 0) throw "failed to switch to app window";

		browser.driver.getAllWindowHandles().then(function (handles) {
			if (handles.length <= nth) {
				_switchToAppWindow(n--);
			} else {
				browser.driver.switchTo().window(handles[nth]);
			}
		});
	}
	_switchToAppWindow(1000);
}

describe('My App', function () {
	beforeEach(function () { switchToAppWindow(1) });

	it("test", function () {
		expect(element(by.model('foobar')).getAttribute('value')).toEqual('bazbaz');
	});

	it("unit tests", function () {
		browser.driver.executeScript(function () {
			chrome.app.window.create('specs/test.html', {
				'bounds': {
					'width': 800,
					'height': 600
				}
			}, function (created) {
				created.contentWindow.errors = [];
				created.contentWindow.onerror = function (e) {
					created.contentWindow.errors.push(String(e));
				};
			});
		});

		switchToAppWindow(2);

		expect(browser.driver.getCurrentUrl()).toMatch(/test\.html$/);

		browser.driver.wait(function () {
			return browser.driver.executeScript('return !!window.jasmine');
		}, 1000);

		browser.driver.wait(function () {
			return browser.driver.executeScript('return jsApiReporter.status() == "done"');
		}, 60000);

		expect(browser.driver.executeScript('return jsApiReporter.specs()').then(function (specs) {
			var success = true;
			for (var i = 0, spec; (spec = specs[i]); i++) {
				if (spec.status == 'failed') success = false;

				for (var j = 0, it; (it = spec.failedExpectations[j]); j++) {
					console.log('got', it.actual, 'expected', it.expected);
					console.log(it.stack);
				}
			}
			return success;
		})).toEqual(true);
	});
});
