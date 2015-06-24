/**
 * 
 */




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
		
		indicator.show();

		WL.Client.invokeProcedure(invocationData,{
			onSuccess :  onLoginSuccess,
			onFailure : onLoginFailure,
		});

		event.preventDefault();


	});
});


function onLoginSuccess(e) {
	console.log('Success...?');
	
	if(e.responseJSON.statusCode === 200) {
		indicator.hide();
		new PlanTypeListView();
		$.mobile.navigate( "#plans", { transition : "slide" });
	} else if(e.responseJSON.statusCode === 401) {
		indicator.hide();
		alert('Wrong credentials');
	} else {
		indicator.hide();
	}
}

function onLoginFailure(e) {
	console.log('What?');
	indicator.hide();
	console.log(e);
}