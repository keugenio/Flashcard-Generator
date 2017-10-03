
// // Load the NPM Package inquirer
var inquirer = require("inquirer");

run();

function run(){
		printSpacer("=");
		inquirer
    	.prompt([
			    {
			      type: "list",
			      message: "What type of flash card are you creating?",
			      choices: ["cloze","basic","quit"],
			      name: "type"
			    }
    		]).then(function(inquirer){
    				if (inquirer.type != "quit")
							createCard(inquirer.type);
						else{
						 	printSpacer("~");
							console.log("\n *** session done. *** \n");
							printSpacer("~");
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
					printSpacer("~");
					console.log ("\n *** basic flashcard created **** \n");
					printCard(newBasicCard, type);   	
					printSpacer("~", run);		   	
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
	          }
	      ])
	      .then(function(inquirer) {
					var ClozeCard = require("./ClozeCard");	 
					var newClozeCard = ClozeCard(inquirer.statement, inquirer.cloze);  

	        if (newClozeCard.partial){
	        	printSpacer("~");
	        	console.log("\n*** cloze flashcard created ***\n");
	        	printCard(newClozeCard, "cloze"); 
	        	printSpacer("~", run);	        	
	        } else {
	        	printSpacer("!");
	          console.log("*** error: '" + newClozeCard.cloze + "' is not found in '" + newClozeCard.fullText + "' \n" +
	          						"*** cloze card created but no partial statement assigned. please reset.\n");
	          resetPartial(newClozeCard);
	        }  
	
	      });		
	}
}

function printSpacer(character, run){
	var charString = character;
	for (var i = 0; i < 40; i++)
		charString += character;
	console.log(charString);
	if (run)
		run();	
}

function printCard(card, type){
  if (type=="basic"){
    console.log("<<Basic flashcard>> \n" + 
    						"Front: " + card.front + "\n" + 
                "Back: " + card.back + "\n");
  } else if (type == "cloze") {
    console.log("<<Cloze flashcard>> \n" + 
    						"Cloze: " + card.cloze + "\n" +
    						"Full text: " + card.fullText + "\n" + 
    						"Partial text: " + card.partial + "\n");    
  }
}

function resetPartial(card){
	printCard(card, "cloze");
	printSpacer("!");
 	inquirer
	      .prompt([
	          {
	            type: "input",
            	message: "What is the new cloze deletion value?",
	            name: "cloze"
	          },
	      ])
	      .then(function(inquirer) {
	      		card.resetPartial(inquirer.cloze);
	      		if (!card.partial){
	      			printSpacer("!");
	      			console.log("'" + card.cloze + "' is not found in '" + card.fullText + "' \n" +
	          						"no partial statement created. \n");
	      			resetPartial(card);
	      		} else{
	      			printSpacer("~");
	      			console.log("\n*** success!! partial statement created ***\n");
	      			printCard(card, "cloze");
	      			printSpacer("~", run);  
	      		}
	      });	
}