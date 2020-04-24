'use strict';

(function () {
	$(function () {
		var uSuc = JSON.parse(localStorage.getItem('uSuccess'));
		var cl = $("#cartList");
		var str = '';
		if (uSuc) {
			$.ajax('http://localhost:3000/udata/' + uSuc.id).then(function (data) {
				for (var item in data) {
					if (item != 'id' && item != 'carData') {
						console.log(item);
						str += '<li><input type="checkbox" class="check"><img class="li_img" src=""><span class="shoptit"></span><span class="perPrice"></span><span class="minus">-</span><input type=\'text\' class="num" value=""><span class="plus">+</span><span class="perTotalPrice"></span><span class="delBtn" data-id=' + item + '>\u5220\u9664</span></li>';
					}
				}
				cl.html(str);
				var list = $("#cartList > li");
				var dBtn = $('.delBtn');
				var str1 = '';
				var pic = '';
				var tit = '';
				var sinprice = '';
				var num = '';
				var allprice = '';

				var _loop = function _loop(j) {
					var data_id = dBtn.eq(j).attr('data-id');
					$.ajax('http://localhost:3000/prodatas?id=' + data_id).then(function (cData) {
						$('.li_img').eq(j).attr('src', '' + cData[0].imgsrc[0]);
						$('.shoptit').eq(j).html('' + cData[0].title);
						$('.perPrice').eq(j).html('' + cData[0].xs_price);
						$('.num').eq(j).val('' + data[data_id]);
						$('.perTotalPrice').eq(j).html(cData[0].xs_price * data[data_id] + '\u5143');
					});
				};

				for (var j = 0; j < dBtn.length; j++) {
					_loop(j);
				}
			});
		} else {
			location.assign('http://localhost:8080/html/login.html');
		}
	});
})();