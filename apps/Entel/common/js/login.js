/**
 * 
 */


var indicator;

$(function() {
	$('#login_form').submit(function(event) {

		var loginInfo = {
				rut: $('#login_rut').val(),
				phone_number: $('#login_phone_number').val(),
				password: $('#login_password').val()
		};

		var invocationData = {
				adapter : 'user',
				procedure : 'login',
				parameters : [ loginInfo ]
		};
		
		indicator = new WL.BusyIndicator();
		indicator.show();

		WL.Client.invokeProcedure(invocationData,{
			onSuccess :  onLoginSuccess,
			onFailure : onLoginFailure,
		});

		event.preventDefault();


	});
});


function onLoginSuccess(e) {
	
	indicator.hide();
	if(e.responseJSON.statusCode === 200) {
		$.mobile.navigate( "#plans", { transition : "slide" });
	} else if(e.responseJSON.statusCode === 401) {
		alert('Wrong credentials');
	}
}

function onLoginFailure(e) {
	
	indicator.hide();
	console.log(e);
}