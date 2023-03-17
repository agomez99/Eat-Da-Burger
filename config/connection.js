var mysql = require("mysql");

if(process.env.JAWSDB_URL){
var connection = mysql.createConnection(process.env.JAWSDB_URL)
}else{
var connection = mysql.createConnection({
  host: "containers-us-west-87.railway.app",
  port: 7509,
  user: "root",
  password: "4HSNPNvVmAw8Ph0DcISo",
  database: "railway"
});
}
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
