(function(){
	// 轮播图
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
	
	//content数据加载
	$(function(){
		let content = $('#content > .container');
		let count = 20;
		let str_con = "";
		$.ajax('http://localhost:3000/prodatas').then(function(data){
			for(let i = 0; i < data.length; i++){
				str_con += `<div class="con clean"><div class="con_tit"><img src="//localhost:8080/images/${data[i].id}.jpg" ></div><div class="con_list clean">`;
				for(let j = 0; j < count; j++){
					str_con += `<dl><dt><a href="//localhost:8080/html/sp_show?id=${data[i].id}" target="_blank" title="${data[i].title}"><img src="${data[i].imgsrc[0]}" ></a></dt><dd><a href="//localhost:8080/html/sp_show?id=${data[i].id}" class="clean" target="_blank" title="${data[i].title}"><h4>${data[i].title}</h4><span>￥${data[i].xs_price}</span><span>￥${data[i].dp_price}</span><span>立即抢购</span></a></dd></dl>`;
				}
				str_con += `</div></div>`;
			}
			content.html(str_con);
		});
		
	})
	
})();
