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
                    loginOrEmail: "Login ou E-mail",
                    password: "Senha"
                },
                button: "Entrar"
            },
            register: {
                title: "Crie uma conta",
                label: {
                    login: "Login",
                    email: "E-mail",
                    password: "Senha"
                },
                button: "Registrar"
            },
            error: {
                invalidUsernameOrPassword: "Login e Senha incompatíveis!"
            }
        }
    };

    var userLanguage = languages.ptbr;

    var _this = this;

    this.init = function(){
        this.checkLogin();
        this.renderPage();
        this.createListeners();
    };

    this.checkLogin = function(){
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
            _this.signin($("#signin-loginOrEmail").val(), $("#signin-password").val());
        });

        $("#signin").keyup(function(e){
            if(e.keyCode==13)
                _this.signin($("#signin-loginOrEmail").val(), $("#signin-password").val());
        })
    };

    this.signin = function(login, password){
        this.session.signin(login, password, function(sess){
            if(sess.signinError)
                _this.renderSigninError(sess.signinError);
            else
                _this.redirectToGame();
        });
    };

    this.renderSigninError = function(msg){
        if($(".error").length)
            return;

        $("#signin input[type=button]").after("<div class='error' style='display: none'>"+userLanguage.error[msg]+"</div>");
        $(".error").show("slow");
        setTimeout(function(){
            $(".error").hide("slow", function(){
                $(".error").remove();
            });
        }, 5000);
    };

    this.init();

};

var controller = new Controller();