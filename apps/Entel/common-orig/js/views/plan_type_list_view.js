/**
 * 
 */

var PlanTypeListView = Backbone.View.extend({
	el: "#planTypesList",
	initialize: function(){
		this.planTypeCollection = new PlanTypeCollection(this);
	},
	callback: function(){
		this.render();
	},
	render: function(){

		for (var i=0; i<this.planTypeCollection.length; i++){
			var planType = this.planTypeCollection.at(i);
			var planTypeView = new PlanTypeView({model: planType});
			this.$el.append(planTypeView.render().el);
		}
		return this;
	}
});
