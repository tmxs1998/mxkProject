'use strict';

(function () {
	// 轮播图
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

	//content数据加载
	$(function () {
		var content = $('#content > .container');
		var count = 20;
		var str_con = "";
		$.ajax('http://localhost:3000/prodatas').then(function (data) {
			for (var i = 0; i < data.length; i++) {
				str_con += '<div class="con clean"><div class="con_tit"><img src="//localhost:8080/images/' + data[i].id + '.jpg" ></div><div class="con_list clean">';
				for (var j = 0; j < count; j++) {
					str_con += '<dl><dt><a href="//localhost:8080/html/sp_show.html?id=' + data[i].id + '" target="_blank" title="' + data[i].title + '"><img src="' + data[i].imgsrc[0] + '" ></a></dt><dd><a href="//localhost:8080/html/sp_show.html?id=' + data[i].id + '" class="clean" target="_blank" title="' + data[i].title + '"><h4>' + data[i].title + '</h4><span>\uFFE5' + data[i].xs_price + '</span><span>\uFFE5' + data[i].dp_price + '</span><span>\u7ACB\u5373\u62A2\u8D2D</span></a></dd></dl>';
				}
				str_con += '</div></div>';
			}
			content.html(str_con);
		});
	});

	//右边栏
	$(function () {
		$('#rb_cart').click(function () {
			location.assign('http://localhost:8080/html/shopcar.html');
		});
	});
})();