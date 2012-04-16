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

};