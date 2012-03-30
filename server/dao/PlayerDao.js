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

  this.selectByLogin = function(login, callback){
    if(!login)
      return [];

    client.query(
      "SELECT id, login, sessionid FROM " + table + " "+
      "WHERE login = ? ",
      [login],
      function(err, results, fields) {
        if (err) {
          throw err;
        }

        callback(results);
      });
  };

  this.selectByLoginOrEmailAndPassword = function(login, password, callback){
    if(!login || !password)
      return [];

    client.query(
      "SELECT id, login, sessionid FROM " + table + " "+
      "WHERE (login = ? OR email = ?) AND password = ? ",
      [login, login, password],
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
      "SELECT id, login, sessionid FROM " + table + " "+
      "WHERE sessionid = ? ",
      [sessionid],
      function(err, results, fields) {

        if (err) {
          throw err;
        }

        callback(results);
      });
  };

  return this;

};