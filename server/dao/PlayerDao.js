/*
* Organização das consultas: 
* id e username sempre será retornado e o password nunca será
* se a query envolve [password ou sessionid] retorna apenas [id, username, email e sessionid];
* caso contrário retorna todos os dados exceto [password, email e sessionid]
*/

exports.createDao = function(){

  var mysql = require('mysql'),
    table = 'player',
    client = mysql.createClient({
      user: 'root',
      password: '',
      database: 'skillhunter'
    });

  this.selectByUsername = function(username, callback){
    if(!username)
      return [];

    client.query(
      "SELECT id, username, map, x, y FROM " + table + " "+
      "WHERE username = ? ",
      [username],
      function(err, results, fields) {
        if (err) {
          throw err;
        }

        callback(results);
      });
  };

  this.selectByEmail = function(email, callback){
    if(!email)
      return [];

    client.query(
      "SELECT id, username, email, map, x, y FROM " + table + " "+
      "WHERE email = ? ",
      [email],
      function(err, results, fields) {
        if (err) {
          throw err;
        }

        callback(results);
      });
  };

  this.selectByUsernameOrEmailAndPassword = function(username, password, callback){
    if(!username || !password)
      return [];

    client.query(
      "SELECT id, username, email, sessionid FROM " + table + " "+
      "WHERE (username = ? OR email = ?) AND password = ? ",
      [username, username, password],
      function(err, results, fields) {
        if (err) {
          throw err;
        }
        
        callback(results);
      });
  };

  this.selectBySessionid = function(sessionid, callback){
    if(!sessionid)
      return [];

    client.query(
      "SELECT id, username, email, sessionid FROM " + table + " "+
      "WHERE sessionid = ? ",
      [sessionid],
      function(err, results, fields) {

        if (err) {
          throw err;
        }

        callback(results);
      });
  };

  this.register = function(player, callback){
    client.query(
      "INSERT INTO " + table + " "+
      "(username, email, password) "+
      "VALUES (?, ?, ?)",
      [player.username, player.email, player.password],
      callback);
  }

  return this;

};