/*global kampfer*/
kampfer.require('Class');
kampfer.require('mindMap.command');
kampfer.require('mindMap.radio');

kampfer.provide('mindMap.command.Controller');

//暂时长这样吧#_#
//以后再改
kampfer.mindMap.command.Controller = kampfer.Class.extend({
	initializer : function(window) {
		this.window = window;

		this.commandStack = [];
		this.commandStackIndex = 0;

		kampfer.mindMap.radio.addListener('executeCommand', this.doCommand, this);
	},

	getCommand : function(name) {
		return kampfer.mindMap.command[name] ||
			kampfer.mindMap.command.Base;
	},

	doCommand : function(event) {
		var Command = kampfer.mindMap.command[event.command], command;
		if( Command && (!Command.isAvailable || Command.isAvailable()) ) {
			command = new Command(event);
			command.execute();
			if(command.needPush) {
				this.commandStack[this.commandStackIndex++] = command;
			}
		}
	},

	commandStack : null,

	commandStackIndex : null,

	dispose : function() {
		kampfer.mindMap.CommandController.superClass.dispose.apply(this, arguments);
		this.publishers = null;
		this.commandStack = null;
	}
});