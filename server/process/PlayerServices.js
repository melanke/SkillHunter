exports.createService = function(){
	var playerDao = require('../dao/PlayerDao').createDao();

	var _this = this;

	/**
	* Pede uma nova sessão passando o username e senha ou pede uma sessao existente passando o sessionid
	*/
	this.signin = function(session, callback){
		if(session.sessionid){
			playerDao.selectBySessionid(session.sessionid, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "yourSessionHasExpired"});
			});
		}else if (session.username && session.password) {
			playerDao.selectByUsernameOrEmailAndPassword(session.username, session.password, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "invalidUsernameOrPassword"});
			});
		};
	};

	return this;
};