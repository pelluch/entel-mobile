
var PlanTypeAdapter = (function(){
	function getPlanTypes(_caller){
		var caller = _caller;
		
		var invocationData = {
				adapter: "plan_type", 
				procedure: "getPlanTypes",
				parameters: []
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess: getPlanTypesSuccess,
			onFailure: getPlanTypesFailer
		});

		function getPlanTypesSuccess(data){
			caller.callback(data.responseJSON.array);
		}
		
		function getPlanTypesFailer(){
			alert("An error has occured. Please check backend connectivity and restart the app");
		}
	}
	
	return {
		getPlanTypes: getPlanTypes
	};
}());
