'use strict';

(function () {
	$(function () {
		var allSign = $('.signinfo');
		var username = $('#s_username');
		var pwd = $('#s_pwd');
		var repwd = $('#s_repwd');
		var yzm_txt = $('#s_yzm');
		var btn = $('#s_btn');
		var checkbox = $('#s_cb');
		var war = $('.s_war');
		var yzm = $('.sf_yzmRan');
		var reg_username = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		var reg_pwd = /^[a-zA-Z]\w{5,11}$/;
		var flag = 0;
		yzm.html(random());

		function random() {
			var code = "";
			while (code.length < 4) {
				var ran = Math.floor(Math.random() * 42 + 48);
				if (ran >= 48 && ran <= 57 || ran >= 65 && ran <= 90) {
					code += String.fromCharCode(ran);
				}
			}
			return code;
		}

		function check() {
			flag = 0;
			//username
			if (!reg_username.test(username.val())) {
				war.css({ 'opacity': 1 });
				war.html('请输入正确的邮箱!!!');
				flag++;
			} else if (flag == 0) {
				war.css({ 'opacity': 0 });
			}

			//pwd
			if (!reg_pwd.test(pwd.val())) {
				war.css({ 'opacity': 1 });
				war.html('请输入正确的密码!!!');
				flag++;
			} else if (flag == 0) {
				war.css({ 'opacity': 0 });
			}

			//repwd
			if (repwd.val() === pwd.val() != true) {
				war.css({ 'opacity': 1 });
				war.html('请输入正确的密码!!!');
				flag++;
			} else if (flag == 0) {
				war.css({ 'opacity': 0 });
			}

			//yzm
			if (yzm_txt.val() == yzm.html() != true) {
				war.css({ 'opacity': 1 });
				war.html('请输入正确的验证码!!!');
				flag++;
			} else if (flag == 0) {
				war.css({ 'opacity': 0 });
			}

			return flag;
		}

		allSign.blur(function () {
			check();
		});

		yzm.click(function () {
			yzm.html(random());
			yzm_txt.val("");
		});

		btn.click(function () {
			if (checkbox.prop('checked')) {
				war.css({ 'opacity': 0 });
				if (check() == 0) {
					$.ajax('http://localhost:3000/userinfo').then(function (data) {
						var count = 0;
						for (var i = 0; i < data.length; i++) {
							if (data[i].id == username.val()) {
								alert('该用户名已注册');
								username.val('');
								pwd.val('');
								repwd.val('');
								yzm_txt.val('');
								yzm.html(random());
								return;
							}
							count++;
						}

						if (count == data.length) {
							$.ajax('http://localhost:3000/userinfo', {
								type: 'post',
								data: { id: username.val(), pwd: pwd.val() }
							}).then(function () {
								alert('注册成功');
								location.assign('http://localhost:8080/html/login.html');
							});
						}
					});
				}
			} else {
				war.css({ 'opacity': 1 });
				war.html('请勾选阅读并同意!!!');
			}
		});
	});
})();