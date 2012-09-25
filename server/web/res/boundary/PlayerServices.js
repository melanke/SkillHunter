var PlayerServices = function(){

	/*
	* obtem player por username
	*/
	this.getPlayerByUsername = function(username, callback){
		$.get(SERVER_URL+'player/',{
			username: username
		}, callback);
	};

	/*
	* obtem player por email
	*/
	this.getPlayerByEmail = function(email, callback){
		$.get(SERVER_URL+'player/',{
			email: email
		}, callback);
	};

	/*
	* cadastra um player
	*/
	this.register = function(player, callback){
		$.post(SERVER_URL+'player/register/', {
			username: player.username,
			email: player.email,
			password: Security.sha1(player.password)
		}, callback);
	};

	this.getPlayerEnvironment = function(username, callback){
		$.get(SERVER_URL+'player/environment/',{
			username: username
		}, function(data){
            var elements = [];
            elements.push(new Player(data.player));
            elements = elements.concat(data.playersNear);
            elements = elements.concat(maps[data.player.map]);

			callback(elements, data.player.id);
		});
	};

};