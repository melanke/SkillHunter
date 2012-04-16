var email = require("./lib/node_mailer");



exports.send = function(options){
  var defaults = {
    host : "localhost",              // smtp server hostname
    port : "25",                     // smtp server port
    domain : "localhost",    
    from : "obama@whitehouse.gov",        // domain used by client to identify itself to server

    authentication : "login",        // auth login is supported; anything else is no auth
    username : "dXNlcm5hbWU=",       // Base64 encoded username
    password : "cGFzc3dvcmQ="       // Base64 encoded password
};
  
  email.send({
    to : options.to,
    subject : options.subject,
    template : options.template,   // path to template name
    data : options.data,

    host : defaults.host,              // smtp server hostname
    port : defaults.port,                     // smtp server port
    domain : defaults.domain,    
    from : defaults.from,        // domain used by client to identify itself to server

    authentication : defaults.authentication,        // auth login is supported; anything else is no auth
    username : defaults.username,       // Base64 encoded username
    password : defaults.password       // Base64 encoded password
  },
  options.callback);
};