"use strict";

$(function () {
	var id = location.search.split("=")[1];
	var prevText = "";
	var sp_pic = $('.sp_pic');
	var sp_i = $('.sp_i');
	var sp_info = $('#sp_info > .container');
	var str_pic = "";
	var str_i = "";
	var str_info = "";
	$.ajax('http://localhost:3000/prodatas').then(function (data) {
		for (var i = 0; i < data.length; i++) {
			if (id == data[i].id) {
				str_pic += "<img src=\"" + data[i].imgsrc[0] + "\"><ul class=\"clean\">";
				for (var j = 0; j < data[i].imgsrc.length; j++) {
					str_pic += "<li><img src=\"" + data[i].imgsrc[j] + "\" ></li>";
				}
				str_pic += "</ul><div class=\"pic_share clean\"><span>\u5206\u4EAB\u5230\uFF1A</span><i></i><i></i><i></i><i></i><i></i><i></i></div>";
				str_i += "<h4>" + data[i].title + "</h4><ul>\n\t\t\t\t\t<li><span class=\"sp_i_info\">\u540A\u724C\u4EF7\uFF1A</span><span class=\"sp_i_dp\">" + data[i].dp_price + ".00</span></li><li><span class=\"sp_i_info\">\u9500\u552E\u4EF7\uFF1A</span><span class=\"sp_i_xs\">" + data[i].xs_price + ".00</span><span class=\"sp_i_hd\">\u6D3B\u52A8\u4EF7</span><span class=\"sp_i_pt\">(" + data[i].discount + ")</span><span>\u7ACB\u7701\uFFE5 " + (data[i].dp_price - data[i].xs_price) + "</span></li><li><span class=\"sp_i_info\">\u8FD0\u8D39\uFF1A</span><span>" + data[i].send + "</span></li></ul>";
				for (var k = 0; k < data[i].info.length; k++) {
					str_info += "<img src=\"" + data[i].info[k] + "\" >";
				}
			}
		}
		sp_pic.html(str_pic);
		sp_i.html(str_i);
		sp_info.html(str_info);
	});
});