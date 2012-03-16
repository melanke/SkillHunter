var Controller = function(){

    this.init = function(){
        this.checkLogin();
        this.renderPage();
        this.createListeners();
    };

    this.checkLogin = function(){
        this.session = new Session();

        if(this.session.sessionid)
            location.href = "";
    };

    this.renderPage = function(){

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
                }
            }
        }

        $("body").html(_.template($("#body").html(), languages.ptbr));
    };

    this.createListeners = function(){

    };

    this.init();

};

var controller = new Controller();