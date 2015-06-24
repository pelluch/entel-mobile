var PlanTypeCollection = Backbone.Collection.extend({
	model: PlanType,
	
	initialize: function(caller){
		this.caller = caller;
		PlanTypeAdapter.getPlanTypes(this);
		return this;
	},
	
	callback: function(items){
		this.reset();
		this.add(items);
		this.caller.callback();
	},
	
});
