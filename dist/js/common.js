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

	$(function () {
		$.ajax('http://localhost:3000/iAllDatas').then(function (data) {
			console.log(data.magic);
			var nav = $(".sp_all_ac");
			var magic = data.magic;
			var str = '';
			var arr = [];

			for (var i = 0; i < magic.length; i++) {
				arr.push(magic[i].index * 1);
			}

			// 所有商品下拉菜单
			for (var _i = 0; _i < data.result.length; _i++) {
				if (arr.indexOf(_i) != -1) {
					str += '<li class="' + data.result[_i][1] + '" data_i="' + data.result[_i][1] + '">\n\t\t\t\t\t\t<a href="#">' + data.result[_i][0] + '</a>\n\t\t\t\t\t\t<div class="sp_all_sec">';
					for (var j = 0; j < magic[_i].pro.length; j++) {
						str += '<div class="sp_all_thi"><h5 class="sp_title">' + magic[_i].pro[j].title + '</h5>';
						for (var k = 0; k < magic[_i].pro[j].data.length; k++) {
							if (magic[_i].pro[j].data[k].type) {
								str += '<span class="sp_hot_r"><a>' + magic[_i].pro[j].data[k].t + '</a></span>';
							} else {
								str += '<span><a>' + magic[_i].pro[j].data[k].t + '</a></span>';
							}
						}
						str += '</div>';
					}
					str += '</div></li>';
				} else {
					str += '<li class="' + data.result[_i][1] + '" data_i="' + data.result[_i][1] + '">\n\t\t\t\t\t<a href="#">' + data.result[_i][0] + '</a>\n\t\t\t\t\t</li>';
				}
			}
			nav.html(str);

			// 所有商品二级菜单
			var nav_list = nav.children();
			var str1 = '';
		});

		// 底部商品列表
		$.ajax('http://localhost:3000/footerSpList').then(function (f_data) {
			var str = "";
			$.each(f_data, function (i, n) {
				for (var j = 0; j < n.length; j++) {
					str += '<a href="#">' + n[j] + '</a>';
				}
				$("." + i).html(str);
				str = "";
			});
		});

		// 侧边栏
		$("#right_bar > div").mouseover(function () {
			$(this).find(".rb_tip").show().stop().animate({ "opacity": 1, "right": "37px" }, 500);
		});

		$("#right_bar > div").mouseleave(function () {
			$(this).find(".rb_tip").stop().css({ "display": "none", "opacity": 0, "right": "50px" });
		});

		$(".rb_gotop").mousedown(function () {
			$("html, body").animate({ "scrollTop": 0 }, 1000);
		});

		$(window).scroll(function () {
			var wt = $(window).scrollTop();
			if (wt > 500) {
				$(".rb_gotop").show();
			} else {
				$(".rb_gotop").hide();
			}
		});
	});
})();