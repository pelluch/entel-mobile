/**
 * 
 */

$(function() {
	$('#login').submit(function(event) {
		
		var loginInfo = {
				rut: $('#login_rut').val(),
				phone_number: $('#login_phone_number').val(),
				password: $('#login_password').val()
		};
		
		console.log(loginInfo);
		event.preventDefault();
		
		
	});
});
/**
 * 
 */