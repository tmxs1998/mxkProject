(function(){
	$(function(){
		let ban = $('#banner')
		let ban_list = $('.banner_ul li');
		let index_list = $('.index_ul li');
		let timer = null;
		let index = 0;
		
		timer = setInterval(function(){
			index++;
			if(index > ban_list.length - 1){
				index = 0;
			}
			
			changeBan();
		},5000);
		
		ban.mouseenter(function(){
			clearInterval(timer);
		});
		
		ban.mouseleave(function(){
			timer = setInterval(function(){
				index++;
				if(index > ban_list.length - 1){
					index = 0;
				}
				
				changeBan();
			},5000);
		});
		
		index_list.mouseenter(function(){
			index = $(this).index();
			changeBan();
		});
		
		function changeBan() {
			ban_list.attr({'class': ''}).animate({'opacity':0},200);
			ban_list.eq(index).attr({'class': 'banner_ac'}).animate({'opacity': 1},200);
			index_list.attr({'class': ''});
			index_list.eq(index).attr({'class': 'index_ac'});
		}
		
	});
	
	$(function(){
		$.ajax('http://localhost:3000/proDatas').then(function(data){
			console.log(data.magic);
			let nav = $(".sp_all_ac");
			let magic = data.magic;
			let str = ``;
			let arr = [];
			
			for(let i = 0; i < magic.length; i++){
				arr.push(magic[i].index * 1);
			}
			
			// 所有商品下拉菜单
			for(let i = 0; i < data.result.length; i++){
				if(arr.indexOf(i) != -1){
					str += `<li class="${data.result[i][1]}" data_i="${data.result[i][1]}">
						<a href="#">${data.result[i][0]}</a>
						<div class="sp_all_sec">`;
					for(let j = 0; j < magic[i].pro.length; j++){
						str += `<div class="sp_all_thi"><h5 class="sp_title">${magic[i].pro[j].title}</h5>`;
						for(let k = 0; k < magic[i].pro[j].data.length; k++){
							if(magic[i].pro[j].data[k].type){
								str += `<span class="sp_hot_r"><a>${magic[i].pro[j].data[k].t}</a></span>`;
							}else{
								str += `<span><a>${magic[i].pro[j].data[k].t}</a></span>`;
							}
						}
						str += `</div>`;
					}
					str += 	`</div></li>`;
				}
				
				else{
					str += `<li class="${data.result[i][1]}" data_i="${data.result[i][1]}">
					<a href="#">${data.result[i][0]}</a>
					</li>`
				}
			}
			nav.html(str);
			
			// 所有商品二级菜单
			let nav_list = nav.children();
			let str1 = ``;
			
		});
	});
	
})();
