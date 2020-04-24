(function(){
	$(function(){
		let uSuc = JSON.parse(localStorage.getItem('uSuccess'));
		let cl = $("#cartList");
		let str = '';
		if(uSuc){
			$.ajax(`http://localhost:3000/udata/${uSuc.id}`).then(function(data){
				for(let item in data){
					if(item != 'id' && item != 'carData'){
						console.log(item);
						str += `<li><input type="checkbox" class="check"><img class="li_img" src=""><span class="shoptit"></span><span class="perPrice"></span><span class="minus">-</span><input type='text' class="num" value=""><span class="plus">+</span><span class="perTotalPrice"></span><span class="delBtn" data-id=${item}>删除</span></li>`
					}
				}
				cl.html(str);
				let list = $("#cartList > li");
				let dBtn = $('.delBtn');
				let str1 = '';
				let pic = '';
				let tit = '';
				let sinprice = '';
				let num = '';
				let allprice = '';
				for(let j = 0 ; j < dBtn.length; j++){
					let data_id = dBtn.eq(j).attr('data-id');
					$.ajax(`http://localhost:3000/prodatas?id=${data_id}`).then(function(cData){
						$('.li_img').eq(j).attr('src', `${cData[0].imgsrc[0]}`);
						$('.shoptit').eq(j).html(`${cData[0].title}`);
						$('.perPrice').eq(j).html(`${cData[0].xs_price}`);
						$('.num').eq(j).val(`${data[data_id]}`);
						$('.perTotalPrice').eq(j).html(`${cData[0].xs_price * data[data_id]}元`);
					});
					
				}
				
				
				
			})
		}else{
			location.assign('http://localhost:8080/html/login.html');
		}
	});
	
	
	
})();