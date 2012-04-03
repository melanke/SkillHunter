var Controller = function(){

    var languages = {
        ptbr: {
            game: {
                name: "SkillHunter"
            },
            nav: {
                home: "Início",
                about: "Sobre",
                printScreenAndVideos: "Imagens e Vídeos",
                help: "Ajuda"
            },
            signin: {
                title: "Faça Login",
                label: {
                    usernameOrEmail: "Login ou E-mail",
                    password: "Senha"
                },
                button: "Entrar"
            },
            register: {
                title: "Crie uma conta",
                label: {
                    username: "Login",
                    email: "E-mail",
                    password: "Senha"
                },
                button: "Registrar"
            },
            error: {
                invalidUsernameOrPassword: "Login e Senha incompatíveis!",
                unavailableUsername: "O Login escolhido não está disponível!",
                unavailableEmail: "O E-mail informado já foi registrado!",
                outOfLengthRangeUsername: "O Login deve conter de 8 à 40 caracteres"
            }
        }
    };

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
    };

    this.signin = function(username, password){
        this.session.signin(username, password, function(sess){
            if(sess.signinError)
                _this.renderSigninError(sess.signinError);
            else
                _this.redirectToGame();
        });
    };

    this.verifyUsername = function(username){
        if(username.length < 8 || username.length > 40){
            this.renderRegisterError("tooShortUsername");
        }
        else if(playerServ.getPlayerByUsername(username)){
            this.renderRegisterError("outOfLengthRangeUsername");
        }
    };

    this.verifyEmail = function(username){
        if(playerServ.getPlayerByEmail(username))
            this.renderRegisterError("unavailableEmail");
    };

    this.renderSigninError = function(msg){
        this.renderError("#signin input[type=button]", msg);
    };

    this.renderRegisterError = function(msg){
        this.renderError("#register input[type=button]", msg);
    };

    this.renderError = function(elSelectorBefore, msg){
        $(elSelectorBefore).after("<div class='error' style='display: none'>"+userLanguage.error[msg]+"</div>");//cria o elemento .error
        $(".error").show("slow"); //exibe ele gradativamente
        setTimeout(function(){//depois de 5 segundos:
            $(".error").hide("slow", function(){//esconde ele gradativamente
                $(".error").remove();//e deleta
            });
        }, 5000);
    };

    this.init();

};

var controller = new Controller();