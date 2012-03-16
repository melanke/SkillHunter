var Session = function(){
    
    this.setCookie = function(c_name,value,exdays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
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
    
    var _this = this;
    
    this.init = function(){
        var sessionid = this.getCookie("sessionid");
        
        if(sessionid){
            $.get('http://localhost:3333/signin/', {
                sessionid: sessionid
            }, function(response){
                if(response && !response.error)
                    inherit(_this, response.session);
                else
                    _this.signinError = response.error;
            });
        }
    };
    
    this.login = function(attrs, callback){
        if(this.sessionid)
            return;
        
        $.post(serverUrl+'signin/', attrs, 
        function(response){
            
            if(response && !response.error){
                inherit(_this, response.session);
                _this.setCookie("sessionid", _this.sessionid, 365);
            }else
                _this.signinError = response.error;
            
            callback();
        });
    };
    
    this.logout = function(callback){
        if(!this.sessionid)
            return;
        
        this.sessionid = null;
        this.login = null;
        this.session = null;
        
        $.post(serverUrl+'logout/', callback);
    };
    
    this.init();
    
};