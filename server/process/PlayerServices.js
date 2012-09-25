exports.createService = function(){
	var trycatch = require('trycatch');
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

	this.getPlayer = function(playerParam, callback){
		if(playerParam.username){
			playerDao.selectByUsername(playerParam.username, function(results){
				if(results)
					callback(results[0]);
				else
					callback(null);
			});
		}else if(playerParam.email){
			playerDao.selectByEmail(playerParam.email, function(results){
				if(results)
					callback(results[0]);
				else
					callback(null);
			});
		}else{
			callback(null);
		}
	};

	this.getPlayerEnvironment = function(playerParam, callback){
		if(playerParam.username){
			playerDao.selectByUsername(playerParam.username, function(results){
				if(results){
					var response = {
						player: results[0],
						playersNear: []
					};
					callback(response);
				}
				else
					callback(null);
			});
		}else{
			callback(null);
		}
	};

	this.register = function(player, callback){
		trycatch(function(){
			_this.validateUsername(player.username);
			_this.validateEmail(player.email);
			playerDao.register(player, function(err, info){
				if(err)
					callback({
						error: err
					});
				else
					callback({success: true});
			});
			//TODO: send email confirmation
		}, function(error){
			callback({error: error.message});
		});
	};

	this.validateUsername = function(username, onError){
        if(!username || username.length < 6 || username.length > 20){
            throw new Error("outOfLengthRangeUsername");
        }else if(/\W/.test(username)){
            throw new Error("invalidCharsUsername");
        }else{
            this.getPlayer({username: username}, function(player){
                if(player)
                    throw new Error("unavailableUsername");
            });
        }
    };

    this.validateEmail = function(email, onError){
        if(!email || email.length < 10 || email.length > 80){
            throw new Error("outOfLengthRangeEmail");
        }else if(!/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(email)){
            throw new Error("invalidCharsEmail");
        }else{
            this.getPlayer({email: email}, function(player){
                if(player)
                    throw new Error("unavailableEmail");
            });
        }
    };

	return this;
};