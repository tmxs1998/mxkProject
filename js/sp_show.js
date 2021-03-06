$(function() {
	let spID = location.search.split("=")[1];
	let prevText = "";
	let sp_pic = $('.sp_pic');
	let sp_i = $('.sp_i');
	let sp_info = $('#sp_info > .container');
	let str_pic = "";
	let str_i = "";
	let str_info = "";
	$.ajax('http://localhost:3000/prodatas').then(function(data) {
		for (let i = 0; i < data.length; i++) {
			if (spID == data[i].id) {
				str_pic += `<img src="${data[i].imgsrc[0]}"><ul class="clean">`
				for (let j = 0; j < data[i].imgsrc.length; j++) {
					if(j == 0){
						str_pic += `<li class="li_act"><img src="${data[i].imgsrc[j]}" ></li>`
					}else{
						str_pic += `<li><img src="${data[i].imgsrc[j]}" ></li>`
					}
				}
				str_pic +=
					`</ul><div class="pic_share clean"><span>分享到：</span><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
				str_i +=
					`<h4>${data[i].title}</h4><ul>
					<li><span class="sp_i_info">吊牌价：</span><span class="sp_i_dp">${data[i].dp_price}.00</span></li><li><span class="sp_i_info">销售价：</span><span class="sp_i_xs">${data[i].xs_price}.00</span><span class="sp_i_hd">活动价</span><span class="sp_i_pt">(${data[i].discount})</span><span>立省￥ ${data[i].dp_price - data[i].xs_price}</span></li><li><span class="sp_i_info">运费：</span><span>${data[i].send}</span></li><li><span class="cartSub">-</span><input type="text" value="1" id="cartNum"><span class="cartPlus">+</span><input type="button" value="加入购物车" id="cartBtn" /></li></ul>`;
				for (let k = 0; k < data[i].info.length; k++) {
					str_info += `<img src="${data[i].info[k]}" >`;
				}
			}
		}
		sp_pic.html(str_pic);
		sp_i.html(str_i);
		sp_info.html(str_info);

		// 
		let nSub = $(".cartSub");
		let nPlus = $(".cartPlus");
		let oNum = $("#cartNum");
		let oBtn = $("#cartBtn");
		

		nSub.click(function() {
			let count = oNum.val();
			count--;
			if (count < 1) {
				return;
			}
			oNum.val(count);
		});

		nPlus.click(function() {
			let count = oNum.val();
			count++;
			oNum.val(count);

		});

		oNum.blur(function() {
			let reg = /^[1-9]\d{0,}$/;
			if (reg.test(oNum.val())) {
				prevText = oNum.val();
			} else {
				oNum.val(prevText);
			}
		});


		oBtn.click(function() {
			let uSuc = JSON.parse(localStorage.getItem('uSuccess'));
			let cData = "";
			let spnum = "";
			if (uSuc) {
				$.ajax(`http://localhost:3000/udata/${uSuc.id}`).then(function(data) {
					if (data[spID] == undefined) {
						cData = '{"' + spID + '":"' + oNum.val() + '"}';
						cData = JSON.parse(cData);

						$.ajax(`http://localhost:3000/udata/${uSuc.id}`, {
							type: 'patch',
							data: cData
						});
						location.assign('http://localhost:8080/html/shopcar.html');
					} else {
						$.ajax(`http://localhost:3000/udata/${uSuc.id}`).then(function(cd) {
							console.log(cd);
							let aNum = cd[spID] * 1 + oNum.val() * 1;
							cData = '{"' + spID + '":"' + aNum + '"}';
							cData = JSON.parse(cData)
							$.ajax(`http://localhost:3000/udata/${uSuc.id}`, {
								type: 'patch',
								data: cData
							});
							location.assign('http://localhost:8080/html/shopcar.html');
						});

					}

				});

			} else {
				location.assign('http:localhost:8080/html/login.html');
			}

		});
		
		let pic_list = $('.sp_pic > ul > li');
		let pic_list_img = $('.sp_pic > ul > li > img');
		let pic_big = $('.sp_pic > img');
		pic_list_img.mouseover(function(){
			let imgsrc = $(this).attr('src');
			pic_list.attr('class', '');
			$(this).parent().attr('class', 'li_act');
			pic_big.attr('src', imgsrc);
		});

	});





});
