
//game functionality
let validateButton = document.createElement("button");
let count = 0;
let isOpponentTurn = false;

//game states
let isFirstTrade = true;
let isCommitting = false;
let isTaking = false;
let player1 = 0;
let cpuPlayer = 1;
let playerTurn = player1;

//game decks and arrays
let deck = [];
let player1Deck = [];
let cpuDeck = [];
let commitArray = [];
let currCard;
let currCardImg;
let firstCard;

//html document ids
let commitButton = document.getElementById("commit");
let takeCardButton = document.getElementById("takeCard");
let buttonsContainer = document.getElementById("buttonsContainer");
let opponentTurn = document.getElementById("opponentTurn");

//real code begins
window.onload = () => {

	buildDeck();
	shuffleDeck();
	startGame();
}

function startGame() {

	isFirstTrade = true;

	for (let i = 0; i < 8; i++) {
		let cpuCard = deck.pop();
		console.log(cpuCard);
		cpuDeck[i] = cpuCard;
		let cpuCardImg= document.createElement("img");
		cpuCardImg.id = cpuCard;
		cpuCardImg.class = "card";
		cpuCardImg.src = "./cards/BACK.png";
		document.getElementById("opponentContainer").appendChild(cpuCardImg);
	}

	for (let i = 0; i < 8; i++) {
		let playerCard = deck.pop();
		player1Deck[i] = playerCard;
		let playerCardImg = document.createElement("img");
		playerCardImg.id = playerCard;
		playerCardImg.src = `./cards/${playerCard}.png`
		playerCardImg.class = "card";
		document.getElementById("playerContainer").appendChild(playerCardImg);
		playerCardImg.addEventListener("click", cardFunctionality);
	}

	//put the card in the middle homie g biscuit
	currCardImg = document.createElement("img");
	currCardImg.id = deck.pop();
	currCardImg.src = `./cards/${currCardImg.id}.png`;
	document.getElementById("currCard").appendChild(currCardImg);

}

function cardFunctionality() {

	if (isFirstTrade) {
		let randInt = Math.floor(Math.random() * cpuDeck.length);
		let index = player1Deck.indexOf(this.id);
		
		//grab the first element to avoid putting in the commitArray when using takeCardButton
		this.id = firstCard;
		
		let chosenCard = cpuDeck[randInt];
		let opponentDivElement = document.getElementById(chosenCard);
		cpuDeck[randInt] = player1Deck[index];
		player1Deck[index] = chosenCard;

		opponentDivElement.id = cpuDeck[randInt];
		
		this.id = chosenCard;
		this.src = `./cards/${player1Deck[index]}.png`;		
		console.log(index);
		
		isFirstTrade = false;
		
		//commit button activation
		commitButton.addEventListener("click", () => {
			if (!isOpponentTurn) {
				commitArray = [];
				isCommitting = true;
			}
		});	
		
		//take button activation
		takeCardButton.addEventListener("click", () => {
			if (!isCommitting && !isFirstTrade && !isOpponentTurn) {
				//resert commit array
				commitArray = [];

				//push currcard in
				commitArray.push(currCardImg.id);
				console.log(commitArray);


				//set the booleans to dictate behavior update count
				isCommitting = true;
				isTaking = true;
				count++;
			}
		});

		//if its opponent turn click the button
		opponentTurn.addEventListener("click", () => {
			isOpponentTurn = false;
			setTimeout(opponentPlay, 1500);
		})
	}	
	else if (!isFirstTrade && isCommitting && !isOpponentTurn) {
		commitFunction(this);
	}
}

function opponentPlay() {

	let splitCard = currCardImg.id.split("-");
	let currValue = getCardValue(splitCard[0]);
	let currType = splitCard[1];

	console.log(currValue);

	let cpuValues = [];
	let cpuTypes = [];
	let sameNumbersFound = [];

	let optionArray = [];

	sortCards(cpuDeck, cpuValues, cpuTypes);

	sameNumbersFound = checkOpponentSequence(cpuValues, cpuTypes, sameNumbersFound);
	optionArray = getOppSeqPlay(currValue, currType, sameNumbersFound, optionArray);

	console.log(optionArray)

	if (optionArray.length > 0) {
		removeOppElements(optionArray[0]);
	}

}

function removeOppElements(array) {

	let container = document.getElementById("oppCommits");	
	console.log(array);
	for (let i = 0; i < array.length; i++) {
		
		if (array[i] != currCardImg.id) {
			let cardID = array[i];
			let cardIMG = document.getElementById(cardID);
			cardIMG.src = `./cards/${cardID}.png`;
			console.log(cardIMG);
			container.appendChild(cardIMG);
		}
		else {
			let tempContainer = document.createElement("img");
			tempContainer.id = array[i];  
			tempContainer.src = `./cards/${array[i]}.png`; 
			tempContainer.className = "commit";
			container.appendChild(tempContainer);
			
			currCardImg.id = deck.pop();
			currCardImg.src = `./cards/${currCardImg.id}`;
			return;
		}
	}

	let card = deck.pop();
	currCardImg.id = card;
	currCardImg.src = `./cards/${card}.png`;

}


function getOppSeqPlay(currValue, currType, sortedArray, optionArray) {

	console.log(sortedArray)
	for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray.length[i] > 1) {
            let card = sortedArray[i][0].split("-");
            let val = card[0];
			console.log(val);
            if (currValue == val) {
				let newVal = getCardValue(val);
                sortedArray[i].push(`${val}-${currType}`);
				console.log(sortedArray[i]);
            }
        }
        if (sortedArray[i].length > 2) {
            optionArray.push(sortedArray[i]);
        }
    }

    return optionArray;
}

function getCardValue(value) {
	if (value == 'K') {
		return 12;
	}
	else if (value == 'Q') {
		return 11;
	}
	else if (value == 'A') {
		return 1;
	}
	else if (value == 12) {
		return 'K';
	}
	else if (value == 11) {
		return 'Q';
	}
	else if (value == 1) {
		return 'A';
	}
	else {
		return parseInt(value);
	}
}

function checkOpponentSequence(val, typ, array) {
	
	let count = 0;
	let matches = [];

	for (let i = 0; i < val.length; i++) {
		if (count == 0) {
			matches.push(`${val[i]}-${typ[i]}`);
		}

		if ( (i != (val.length - 1)) && (val[i] == val[i + 1]) ) {
			matches.push(`${val[i]}-${typ[i + 1]}`);
			count++;
		}
		else {
			if (count > 0) {
				array.push(matches);
			}
			count = 0;
			matches = [];
		}
	}	
	return array;
}

function sortCards(array, values, types) {
	
	for (let i = 0; i < array.length; i++) {
		let splitValues = array[i].split("-");
		// console.log(splitValues);

		let value = getCardValue(splitValues[0]);
		let type = splitValues[1];

		values.push(value);
		types.push(type);
	}	

	//sort the values in sequential order
	for (let i = 0; i < values.length; i++) {
	    let currMin = values[i];
	    let index = i;
	    for (let j = i; j < values.length; j++) {
	        if (values[j] < currMin) {
	            currMin = values[j];
	            index = j;
	        }
	    }
	    let temp = values[i];
	    values[i] = currMin;
	    values[index] = temp;

		let typeTemp = types[i];
		types[i] = types[index];
		types[index] = typeTemp;

	}

	console.log(values);
	console.log(types);
}

function validateCards() {

	isCommitting = false;
	let values = [];
	let types = [];
	
	sortCards(commitArray, values, types);
	console.log(values);
	console.log(types);
	
	let isSameNum = checkIfIsSameNumber(values);
	let isInOrder;

	//check results and shame the player for bad input
	if (!isSameNum) {
		isInOrder = checkIfIsInOrder(values, types);
	}

	//remove the button and reset count to zero for future validations
	buttonsContainer.removeChild(validateButton);
	count = 0;

	console.log(isInOrder);
	console.log(isSameNum);

	if (isInOrder || isSameNum) {
		removeElements(values, types);
		if (isTaking) {
			let newCard = deck.pop();
			currCardImg.id = newCard;
			currCardImg.src = `./cards/${newCard}.png`;
			isTaking = false;
		}
		isOpponentTurn = true;
	}

}

function removeElements(values, types) {
	//update player array deck

	if (!isOpponentTurn) {
		for (let i = 0; i < commitArray.length; i++) {

			let index = player1Deck.indexOf(commitArray[i]);
			console.log(commitArray[i]);
			let divId = document.getElementById(commitArray[i]);

			values[i] = getCardValue(values[i]);

			let commits = document.getElementById("playerCommits");
			let cardImg = document.createElement("img");
			cardImg.id = `${values[i]}-${types[i]}`;
			cardImg.src = `./cards/${cardImg.id}.png`;
			commits.appendChild(cardImg);
			console.log(divId);
			if (index != -1) {
				document.getElementById("playerContainer").removeChild(divId);
				player1Deck.splice(index, 1);
			}
		}
		commitArray = [];
	}
}

function checkIfIsInOrder(values, types) {

	//check if they are even the same type
	let type1 = types[0];
	for (let i = 0; i < types.length; i++) {
		if (type1 != types[i]) {
			console.log("Not same types");
			return false;
		}
	}

	//check if the numbers chosen are actually in order
	for (let i = 0; i < values.length - 1; i++) {
		console.log(`${values[i]} -> ${values[i + 1]}`);
		
		//check if they chose 7 to skip to 10
		if (values[i] == 7 && values[i + 1] == 10) {
			continue;
		}
		else if ( (values[i] + 1) != values[i + 1] ) {
			console.log("Not in order");
			return false;
		}	
	}
	console.log("These are in order bruv");
	return true;
}

function checkIfIsSameNumber(arr) {

	let firstNum = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (firstNum != arr[i]) {
			return false;
		}
	}
	console.log("These are the same number");
	return true;
}

function commitFunction(card) {

	if (commitArray.indexOf(card.id) == -1) {
		commitArray.push(card.id);
		console.log(commitArray);
		count += 1;		
	}
	if (count == 3) {
		validateButton.id = "validate";
		validateButton.innerText = "Validate";
		buttonsContainer.appendChild(validateButton);

		validateButton.addEventListener("click", validateCards);
	}
}

function buildDeck() {

	let types = ['H', 'S', 'D', 'C'];
	let values = ['A', '2', '3', '4', '5', '6', '7', '10', 'Q', 'K'];

	for (let i = 0; i < types.length; i++) {
		for (let j = 0; j < values.length; j++) {
			deck.push(`${values[j]}-${types[i]}`);
		}
	}
}

function shuffleDeck() {

	for (let i = 0; i < deck.length; i++) {
		let j = Math.floor(Math.random() * deck.length);
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
}

