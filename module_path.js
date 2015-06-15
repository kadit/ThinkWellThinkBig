require.config({
	paths:{

		backbone        :   'lib/backbone/backbone',
	 	jQuery          :   'lib/jquery/jquery-1.9.1',
	 	bootstrap       :   'lib/bootstrap/js/bootstrap',
	 	underscore		: 	'lib/underscore/underscore',
	 	text			:    'lib/requiretext/text'


	},

	shim: {
			jQuery:{
				exports: '$'
			},
			backbone:{
				deps:["jQuery","underscore"],
				exports:'Backbone'
			},
			bootstrap:{
				deps:["jQuery"]
			}
	}

});

require(['jQuery','backbone','bootstrap','controllers/backboneRouter'],function($,Backbone,bootstrap,backboneRouter){
	
});

 