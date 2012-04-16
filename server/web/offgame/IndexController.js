var Controller = function(){

    var userLanguage = languages.ptbr;

    var playerServ = new PlayerServices();

    var _this = this;

    this.init = function(){
        this.checkSignin();
        this.renderPage();
        this.createListeners();
    };

    this.checkSignin = function(){
        this.session = new Session(function(sess){
            if(sess.sessionid)
                _this.redirectToGame();
        });
    };

    this.redirectToGame = function(){
        window.location.href= "Game.html";
    };

    this.renderPage = function(){
        $("body").html(_.template($("#body").html(), userLanguage));
    };

    this.createListeners = function(){
        $("#signin input[type=button]").click(function(){
            _this.signin($("#signin-usernameOrEmail").val(), $("#signin-password").val());
        });

        $("#signin").keyup(function(e){
            if(e.keyCode==13) //ENTER
                _this.signin($("#signin-usernameOrEmail").val(), $("#signin-password").val());
        });

        $("#register-username").blur(function(){
            _this.verifyUsername($(this).val());
        });

        $("#register-email").blur(function(){
            _this.verifyEmail($(this).val());
        });

        $("#register input[type=button]").click(function(){
            _this.register({
                username: $("#register-username").val(),
                email: $("#register-email").val(),
                password: $("#register-password").val()
            });
        });

        $("#register").keyup(function(e){
            if(e.keyCode==13) //ENTER
                _this.register({
                    username: $("#register-username").val(),
                    email: $("#register-email").val(),
                    password: $("#register-password").val()
                });
        });
    };

    this.signin = function(username, password){
        this.session.signin(username, password, function(sess){
            if(sess.signinError)
                _this.renderSigninError(sess.signinError);
            else
                _this.redirectToGame();
        });
    };

    this.register = function(player){
        playerServ.register(player, function(response){
            if(response && !response.error){
                //TODO: send to confirm email page
                //temp-test-code:
                _this.signin(player.username, player.password);
            }else
                _this.renderRegisterError(response.error);
        });
    };

    this.verifyUsername = function(username){
        if(username.length < 6 || username.length > 20){
            this.renderRegisterError("outOfLengthRangeUsername");
        }else if(/\W/.test(username)){
            this.renderRegisterError("invalidCharsUsername");
        }else{
            playerServ.getPlayerByUsername(username, function(player){
                if(player)
                    _this.renderRegisterError("unavailableUsername");
            });
        }
    };

    this.verifyEmail = function(email){
        if(email.length < 10 || email.length > 80){
            this.renderRegisterError("outOfLengthRangeEmail");
        }else if(!/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(email)){
            this.renderRegisterError("invalidCharsEmail");
        }else{
            playerServ.getPlayerByEmail(email, function(player){
                if(player)
                    _this.renderRegisterError("unavailableEmail");
            });
        }
    };

    this.renderSigninError = function(msg){
        this.renderError("#signin input[type=button]", userLanguage.error.signin[msg] || userLanguage.error.signin["unexpectedError"]);
    };

    this.renderRegisterError = function(msg){
        this.renderError("#register input[type=button]", userLanguage.error.register[msg] || userLanguage.error.signin["unexpectedError"]);
    };

    this.renderError = function(elSelectorBefore, msg){
        if($(".error").length){ //se ja existir uma mensagem de erro
            $(".error").remove(); //apaga a mensagem para aparecer a nova
            clearTimeout(this.renderErrorTimeout); //tira o timeout para a mensagem nao desaparecer antes da hora
        }

        $(elSelectorBefore).after("<div class='error' style='display: none'>"+msg+"</div>");//cria o elemento .error
        $(".error").show("slow"); //exibe ele gradativamente
        this.renderErrorTimeout = setTimeout(function(){//depois de 5 segundos:
            $(".error").hide("slow", function(){//esconde ele gradativamente
                $(".error").remove();//e deleta
            });
        }, 5000);
    };

    this.init();

};

var controller = new Controller();