exports.createDao = function(){

  var mysql = require('mysql'),
    table = 'player',
    client = mysql.createClient({
      user: 'root',
      password: '',
      database: 'skillhunter'
    });

  // this.insert = function(player){
  //   client.query(
  //     'INSERT INTO '+table+' '+
  //     'SET title = ?, text = ?, created = ?',
  //     ['super cool', 'this is a nice text', '2010-08-16 10:00:23']
  //   );
  // }

  // var prepareSelect = function(obj){
  //     var indexes = "";
  //     var values = [];
  //     for(var index in obj){
  //       indexes += " "+index+" = ?,";
  //       values.push(obj[index]);
  //     }
  //     if(!indexes.length)
  //       return null;

  //     indexes = indexes.substring(0, str.length-1);

  //     return {indexes: indexes, values: values};
  // }

  this.selectByUsername = function(username, callback){
    if(!username)
      return [];

    client.query(
      "SELECT id, username FROM " + table + " "+
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
      "SELECT id, username, email FROM " + table + " "+
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
      "SELECT id, username, sessionid FROM " + table + " "+
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
      "SELECT id, username, sessionid FROM " + table + " "+
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