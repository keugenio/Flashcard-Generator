
// // Load the NPM Package inquirer
var inquirer = require("inquirer");

run();

function run(){
		inquirer
		  .prompt([
		    // Here we create a basic text prompt.
		    {
			      type: "list",
			      message: "What would you like to do?",
			      choices: ["Create flashcard", "Read Flashcard", "Quit"],
			      name: "command"
		    },
		  ])
		  .then(function(inquirerResponse) {
			    // If the inquirerResponse confirms, we displays the inquirerResponse's username 
			    if (inquirerResponse.command == "Create flashcard") {
			      console.log("\nCreating Flash Card \n");
				    inquirer
				    	.prompt([
							    {
							      type: "list",
							      message: "what type of flash card are you creating?",
							      choices: ["cloze","basic"],
							      name: "type"
							    }
				    		]).then(function(inquirerResponse){
										createCard(inquirerResponse.type);
						  });

		      	} else if (inquirerResponse.command == "Read flashcard"){
		      	
		      	} else {
		      		console.log("\n *** session done. *** \n")
		      	}
    	});
}

function createCard(type){
	if (type === "basic"){
	    inquirer
	      .prompt([
	        	{
	            type: "input",
	            message: "What will the front of the card show?",
	            name: "front"
	          },
	          {
	            type: "input",
	            message: "What will the back of the card show?",
	            name: "back"
	          },

	      ])
	      .then(function(inquirer) {
					var basicCard = require("./BasicCard");
					var newBasicCard = basicCard(inquirer.front,inquirer.back);
					writeToLog(newBasicCard, type);   	      	
					printSpacer();  					
	      });
	} else {
    inquirer
	      .prompt([
	        	{
	            type: "input",
            	message: "What is the statement of this cloze sentence?",
	            name: "statement"
	          },
	          {
	            type: "input",
            	message: "What is the cloze deletion value?",
	            name: "cloze"
	          },
	      ])
	      .then(function(inquirer) {
					var ClozeCard = require("./ClozeCard");	 
					var clozeFull = inquirer.statement;     	
	        if (clozeFull.includes(inquirer.cloze)){
	          var newClozeCard = ClozeCard(inquirer.statement, inquirer.cloze);
	        } else {
	          console.log(inquirer.cloze + " is not found in '" + inquirer.statement + "'");
	          process.exit();
	        }  	
	        writeToLog(newClozeCard, type);      	
	      	printSpacer();     	
	      });		
	}
}

function printSpacer(){
	console.log ("<---------------------------->");
}

function readCard(card, type){
  if (type=="basic"){
    console.log("New flashcard: \n" + 
    						"Front: " + card.front + "\n" + 
                "Back: " + card.back);
  } else if (type == "cloze") {
    console.log("New flashcard: \n" + 
    						"full text: " + card.fullText + "\n" + 
    						"partial text: " + card.partial);    
  } else
    console ("error: card not created");
}

function writeToLog(card, type){
  var fs = require("fs");
  var message="";
  if (type == "basic"){
  	message = card.front + "," + card.back + ",";

	  fs.writeFile("basic.txt", message, function(err) {

	      // If the code experiences any errors it will log the error to the console.
	      if (err) {
	        return console.log(err);
	      }
	      readCard(card, type)

	  });
	}else {
		message = card.fullText + "," + card.partial + ",";
	  fs.writeFile("cloze.txt", message, function(err) {
	    if (err) {
	      return console.log(err);
	    }
	    readCard(card, type)
	  });	
	}
}