exports.createService = function(){
	var playerDao = require('../dao/PlayerDao').createDao();

	var _this = this;

	this.signin = function(session, callback){
		if(session.sessionid){
			playerDao.selectBySessionid(session.sessionid, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "yourSessionHasExpired"});
			});
		}else if (session.login && session.password) {
			playerDao.selectByLoginAndPassword(session.login, session.password, function(results){
				if(results && results[0])
					callback({session: results[0]});
				else
					callback({error: "invalidUsernameOrPassword"});
			});
		};
	};

	return this;
};