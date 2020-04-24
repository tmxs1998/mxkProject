(function(){
	$(function(){
		let uname = $('#l_username');
		let upwd = $('#l_pwd');
		let yzm_txt = $('#l_yzm');
		let yzm = $('.l_ranyzm');
		let btn = $('#l_btn');
		let war = $('.l_war') ;
		let reg_username = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		let reg_pwd = /^[a-zA-Z]\w{5,11}$/;
		let flag = 0;
		
		yzm.html(random());
		function random(){
			let code = "";
			while(code.length < 4){
				let ran = Math.floor(Math.random()*42 + 48);
				if(ran >= 48 && ran <= 57 || ran >= 65 && ran <= 90){
					code += String.fromCharCode(ran);
				}
			}
			return code;
		}
		
		yzm.click(function(){
			yzm.html(random());
			yzm_txt.val("");
		});
		
		function check(){
			flag = 0;
			//username
			if(!reg_username.test(uname.val())){
				war.css({'opacity': 1});
				war.html('请输入正确的邮箱!!!');
				flag++;
			}else if(flag == 0){
				war.css({'opacity': 0});
			}
			
			//pwd
			if(!reg_pwd.test(upwd.val())){
				war.css({'opacity': 1});
				war.html('请输入正确的密码!!!');
				flag++;
			}else if(flag == 0){
				war.css({'opacity': 0});
			}
			
			//yzm
			if((yzm_txt.val() == yzm.html()) != true){
				war.css({'opacity': 1});
				war.html('请输入正确的验证码!!!');
				flag++;
			}else if(flag == 0){
				war.css({'opacity': 0});
			}
			
			return flag;
		}
		
		
		
		btn.click(function(){
			if(check() == 0){
				$.ajax("http://localhost:3000/userinfo").then(function(data){
					for(let i = 0; i < data.length; i++){
						if(data[i].id == $.trim(uname.val())){
							if(data[i].pwd == upwd.val()){
								let uSuccess = {id: data[i].id};
								localStorage.setItem('uSuccess', JSON.stringify(uSuccess));
								$.ajax('http://localhost:3000/udata').then(function(cd){
									for(let j = 0; j < cd.length; j++){
										if(cd[j].id == data[i].id){
											return;
										}else{
											$.ajax('http://localhost:3000/udata', {
												type: 'post',
												data: {id: data[i].id}
											})
										}
									}
									
								})
								alert("登陆成功!!");
								location.assign('http://localhost:8080/index.html');
								return;
							}
						}
					}
						war.css({'opacity': 1});
						war.html('请输入正确的账号或密码!!!');
						uname.val("");
						upwd.val("");
						yzm.html(random());
						yzm_txt.val("");
					
				});
			}else{
				yzm.html(random());
				yzm_txt.val("");
			}
			
		});
		
	});
})();