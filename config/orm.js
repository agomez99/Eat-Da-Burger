var connection = require("../config/connection.js");

 
  // Object for all our SQL statement functions.
  var orm = {
    all: function(tableName, cb) {
      var queryString = "SELECT * FROM ??;";
      connection.query(queryString,[tableName], function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create: function(tableName, colsToIns, valsToIns, cb) {
        const cols = '??,'.repeat(colsToIns.length).slice(0,-1);
        const vals = '?,'.repeat(colsToIns.length).slice(0,-1);
    
        const sql = `INSERT INTO ${tableName} (${cols}) VALUES (${vals});`;
    
        connection.query(sql, [colsToIns[0].toString(),colsToIns[1].toString(),valsToIns[0].toString(),valsToIns[1].toString()], function(err, result) {
          if (err) throw err;
          cb(result);
        });
      },

    update: function(table, objColVals, condition, cb) {
      var queryString = `UPDATE ${table}`;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  
    delete: function(table,condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
  };

   // Helper function to convert object key/value pairs to SQL syntax
   function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  // Export the orm object for the model (cat.js).
  module.exports = orm;