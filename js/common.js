(function() {
	$(function() {
		$.ajax('http://localhost:3000/iAllDatas').then(function(data) {
			let nav = $(".sp_all_ac");
			let magic = data.magic;
			let str = ``;
			let arr = [];

			for (let i = 0; i < magic.length; i++) {
				arr.push(magic[i].index * 1);
			}

			// 所有商品下拉菜单
			for (let i = 0; i < data.result.length; i++) {
				if (arr.indexOf(i) != -1) {
					str +=
						`<li class="${data.result[i][1]}" data_i="${data.result[i][1]}">
						<a href="#">${data.result[i][0]}</a>
						<div class="sp_all_sec">`;
					for (let j = 0; j < magic[i].pro.length; j++) {
						str += `<div class="sp_all_thi"><h5 class="sp_title">${magic[i].pro[j].title}</h5>`;
						for (let k = 0; k < magic[i].pro[j].data.length; k++) {
							if (magic[i].pro[j].data[k].type) {
								str += `<span class="sp_hot_r"><a>${magic[i].pro[j].data[k].t}</a></span>`;
							} else {
								str += `<span><a>${magic[i].pro[j].data[k].t}</a></span>`;
							}
						}
						str += `</div>`;
					}
					str += `</div></li>`;
				} else {
					str +=
						`<li class="${data.result[i][1]}" data_i="${data.result[i][1]}">
					<a href="#">${data.result[i][0]}</a>
					</li>`
				}
			}
			nav.html(str);

			// 所有商品二级菜单
			let nav_list = nav.children();
			let str1 = ``;
		});

		// 底部商品列表
		$.ajax('http://localhost:3000/footerSpList').then(function(f_data) {
			let str = "";
			$.each(f_data, function(i, n) {
				for (let j = 0; j < n.length; j++) {
					str += `<a href="#">${n[j]}</a>`;
				}
				$("." + i).html(str);
				str = "";
			});

		});

		// 侧边栏
		$("#right_bar > div").mouseover(function() {
			$(this).find(".rb_tip").show().stop()
				.animate({
					"opacity": 1,
					"right": "37px"
				}, 500);
		});

		$("#right_bar > div").mouseleave(function() {
			$(this).find(".rb_tip").stop().css({
				"display": "none",
				"opacity": 0,
				"right": "50px"
			});
		});

		$(".rb_gotop").mousedown(function() {
			$("html, body").animate({
				"scrollTop": 0
			}, 1000);
		});
		
		
		
		$(window).scroll(function() {
			let wt = $(window).scrollTop();
			if (wt > 500) {
				$(".rb_gotop").show();
			} else {
				$(".rb_gotop").hide();
			}

		});
		
		
		//购物车信息
		let uSuc = JSON.parse(localStorage.getItem('uSuccess'));

		if (uSuc) {
			let str_login = `<span>欢迎您,${uSuc.id}<span>&nbsp;&nbsp;<a href="javascript:;" class="logout">注销</a>`;

			$('.login_sign').html(str_login);
			$('.cart_btn > a').attr('href', 'http://localhost:8080/html/shopcar.html');
			$.ajax(`http://localhost:3000/udata/${uSuc.id}`).then(function(u_data){
				let count = 0;
				console.log(u_data);
				$.each(u_data, function(i, val){
					if(i != 'id' && i != 'carData'){
						count++;
					}
				});
				$('#cart_num').text(count);
			});
			
			$('.rb_cart').click(function(){
				location.assign('http://localhost:8080/html/shopcar.html');
			});
		}else{
			$('.rb_cart').click(function(){
				location.assign('http://localhost:8080/html/login.html');+
			});
		}

		$('.logout').click(function() {
			alert("注销成功")
			localStorage.removeItem('uSuccess');
			window.location.reload();
		});

	});
})();
