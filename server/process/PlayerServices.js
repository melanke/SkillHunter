exports.createService = function(){
	var playerDao = require('../dao/PlayerDao').createDao();

	var _this = this;

	/**
	* Pede uma nova sessão passando o login e senha ou pede uma sessao existente passando o sessionid
	*/
	this.signin = function(session, callback){
		if(session.sessionid){
			playerDao.selectBySessionid(session.sessionid, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "yourSessionHasExpired"});
			});
		}else if (session.login && session.password) {
			playerDao.selectByLoginOrEmailAndPassword(session.login, session.password, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "invalidUsernameOrPassword"});
			});
		};
	};

	return this;
};