/**
* classe que representa a sessao do usuario
*/
var Session = function(initcallback){

    var _this = this;
    
    this.setCookie = function(c_name,value,exdays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    };

    this.deleteCookie = function(c_name){
        var c_value= "1; expires=" + new Date().toUTCString();
        document.cookie=c_name + "=" + c_value;
    };
    
    this.getCookie = function(c_name){
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++){
            
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            
            if (x==c_name)
                return unescape(y);
            
        }
        return null;
    };
    
    /**
    * construtor - se o usuario tiver cookies tenta obter os dados do usuario atravez do sessionid
    */
    this.init = function(){
        var sessionid = this.getCookie("sessionid");
        
        if(sessionid){
            $.post(SERVER_URL+'signin/', {
                sessionid: sessionid
            }, function(response){
                if(response && !response.error)
                    inherit(_this, response.session);
                else
                    _this.signinError = response.error;

                if(initcallback)
                    initcallback(_this);
            });
        }
    };
    
    /**
    * tenta obter os dados do usuario buscando por username e senha criptografada, executa o callback passando a resposta como parametro
    */
    this.signin = function(username, password, callback){
        if(this.sessionid){
            delete this.signinError;
            callback(_this);
            return;
        }

        $.post(SERVER_URL+'signin/', {
            username: username,
            password: Security.sha1(password)
        }, 
        function(response){
            
            if(response && !response.error){
                inherit(_this, response.session);
                delete _this.signinError;
                _this.setCookie("sessionid", _this.sessionid, 365);
            }else
                _this.signinError = response.error;
            
            if(callback)
                callback(_this);
        });
    };
    
    /**
    * apaga os dados da sessao e o cookie
    */
    this.logout = function(callback){
        if(!this.sessionid)
            return;
        
        delete this.sessionid;
        delete this.username;
        delete this.password;

        this.deleteCookie("sessionid");
    };
    
    this.init();
    
};