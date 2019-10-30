//add mySQL
var mysql = require("mysql");

//add inquirer for making user prompts
var inquirer = require("inquirer");

//add table for display of data in a table -- this is another node package
var Table = require("cli-table");

//create the connections with the database
var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "Ih@tepwsql1",
    database: "bamazon_db"
});

//connect the mysqlserver to database
connection.connect(function(err){
    if (err) throw err;
    //console.log("it's working");
    readItem();
});

//create function to read the database and display data
function readItem(){
    console.log("~Welcome to Bamazon!~\n");
    console.log("This is our current inventory...\n")

    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        var displaytTable = new Table({
            head: ["Id", "Item", "Department", "Price"],
            colWidths: [5,20,20,10]
        });
        for (var i = 0; i < res.length; i++){
            displaytTable.push([res[i].id, res[i].item, res[i].department, res[i].price]);
        }
        console.log(displaytTable.toString());
        confirmPurchase();
    })
}

function confirmPurchase(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "question",
            message: "Do you want to make a purchase?",
            choices: ["yes", "no"],
        },
    ])
    .then(answers => {
        if(answers.question === "no"){
            console.log ("Sorry we couldn't help you. We update inventory daily so please check back for the item you want.")
        }else{
            console.log("Thank you for shopping with us.")
            buying();
        }
    })
}

function buying(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What do you want to buy? (Enter the id number).",
            name: "id",
            filter: Number,
        },
        {
            type: "input",
            message: "How many do you want to buy?",
            name: "quantity",
            filter: Number,
        },
    ]).then(function(answers){
      var userQuantity = answers.quantity;
      var userId = answers.id;
      // var itemQuantity = query.quantity;
      console.log(userQuantity);
      console.log(userId);
      console.log(query);
      //console.log(itemQuantity);
      //console.log("You Chose to buy item id " + userID + " want " + userQuantity + "number of this item.");
      var query = "SELECT id, price, quantity FROM products WHERE ?";
      connection.query(query, userQuantity, function(err, res){
          if (err) throw err;
          for(var i = 0; i < res.length; i++){
              if (userQuantity > itemQuantity){
                  console.log("Sorry. We are unable to fulfill your request because the quantity exceeds our inventory quantity amount.")
              }else{
                  var total = userQuantity * res.price;
                  console.log("Congratulations.  Your total price is " + total);
              }
          }
      })
    })
}

//update inventory