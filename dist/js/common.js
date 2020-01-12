'use strict';

(function () {
	$(function () {
		var ban = $('#banner');
		var ban_list = $('.banner_ul li');
		var index_list = $('.index_ul li');
		var timer = null;
		var index = 0;

		timer = setInterval(function () {
			index++;
			if (index > ban_list.length - 1) {
				index = 0;
			}

			changeBan();
		}, 5000);

		ban.mouseenter(function () {
			clearInterval(timer);
		});

		ban.mouseleave(function () {
			timer = setInterval(function () {
				index++;
				if (index > ban_list.length - 1) {
					index = 0;
				}

				changeBan();
			}, 5000);
		});

		index_list.mouseenter(function () {
			index = $(this).index();
			changeBan();
		});

		function changeBan() {
			ban_list.attr({ 'class': '' }).animate({ 'opacity': 0 }, 200);
			ban_list.eq(index).attr({ 'class': 'banner_ac' }).animate({ 'opacity': 1 }, 200);
			index_list.attr({ 'class': '' });
			index_list.eq(index).attr({ 'class': 'index_ac' });
		}
	});
})();