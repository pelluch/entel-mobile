var PlanTypeView = Backbone.View.extend({
	tagName: "li",
	template: 	'<a data-id="<%= id %>" href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + 
				'<%= name %></a>',
	events: {
		"click" : "itemClicked"
	},
	render: function(){
		var template = _.template(this.template);
		var itemHtml = template(this.model.attributes);
		this.$el.html(itemHtml);
		return this;
	},
	itemClicked: function(){
		alert(this.model.get("name"));
	}
});
