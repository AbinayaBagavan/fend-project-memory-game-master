/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const cardDeck=document.querySelector(".deck"); //selecting the board
cardDeck.addEventListener("click",function(event){    //add event listener to the board
	let list=event.target.className.split();
	let confirm=0;
	for(let i=0;i<list.length;i++)
	{
		if(list[i]==="card")  
		{
			confirm=1;
		}
	}
	if(confirm===1)
	{
		openCard(event);	//card get opened only when the user clicks on the card 
							//function call ignored when the user clicks on somewhere else (ie board)
	}
	//else
	//{
	//	alert("You are clicking on the board not on the card");
	//}
});
let card=document.querySelectorAll(".card");
let cardArray=[...card];
let openCardsArray=[];
let tilesFlipped=0;
let moves=0;
let moveDisplay=document.querySelector(".moves");
let starCount=document.querySelectorAll(".fa-star");
let time=document.querySelector("time");
let seconds=0;
let minutes=0;
let hours=0;
let t;
let page=document.querySelector(".page-container");
let winner=document.querySelector(".winner");
let playAgain=document.querySelector(".play-again");
playAgain.addEventListener("click",function(){restart();}); //Play again 
window.addEventListener("load",function(){
	startGame();
}); 														//starting game on loading window
function shuffle(array) 									//cards shuffling function 
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame()  										//game start and play again function
{
	alert("LETS MATCH!!!!!");
	cardArray=shuffle(cardArray); 
	page.classList.remove("hidden");
	winner.classList.add("hidden");
	let tempArray=[];
	for(let i=0;i<starCount.length;i++)
	{
		starCount[i].style.visibility="visible";
	}
	tilesFlipped=0;
	moves=0;
	openCardsArray=[];
	clearTimer();
	timer();

	for(let i=0;i<cardArray.length;i++)
	{
		cardDeck.innerHTML=" ";
		tempArray.forEach.call(cardArray,function(item){cardDeck.appendChild(item);});      //display all the cards to memorize for less a second
		cardArray[i].classList.toggle("open");
		cardArray[i].classList.toggle("show");

		setTimeout(function(){
			for(let i=0;i<cardArray.length;i++)
			{
				cardArray[i].classList.remove("show","open","match");                   //close all the cards after displaying them
			}
		},700);			
	}

	/*for(i=0;i<cardArray.length;i++)
	{
		cardArray[i].addEventListener("click",function(event){
			openCard(event);
		});
	}*/
}
//let bug;
function openCard(event)						//function called when card is clicked
{
	let clsLs=event.target.classList.length;
	//alert("The card selected is"+event.target.innerHTML);
	//alert("The length is"+clsLs);
	if(clsLs>=2)
	{
		alert("Card already opened");			//check whether the card is already opened
		return;
	}

	else
	{
		//alert("Ok card perfect");
		if(openCardsArray.length===0)				//pushing first card into array
		{
			event.target.classList.toggle("open");
			event.target.classList.toggle("show");
			openCardsArray.push(event.target);

		}
		else if(openCardsArray.length===1)		//pushing second card into array and check the cards for matching
		{
			event.target.classList.toggle("open");
			event.target.classList.toggle("show");
			moves+=1;
			moveDisplay.innerHTML=moves;
			checkMove();
			setTimeout(function()
				{
					openCardsArray.push(event.target);
					if(openCardsArray[0].innerHTML===openCardsArray[1].innerHTML)    //card matches 
					{
						//alert("Matches");
						tilesFlipped+=2;											//increment the total flipped cards 
						checkEnd();													// function call to check the game end 
						openCardsArray[0].classList.toggle("match");
						openCardsArray[1].classList.toggle("match");				//match the cards
						openCardsArray=[];
					}
					else 															//card dismatches
					{
						//alert("Dismatch");
						openCardsArray[0].style.background="red";					// turn the dismatched cards red
						openCardsArray[1].style.background="red";
						setTimeout(function(){
							openCardsArray[0].style.background="";
							openCardsArray[1].style.background="";
							openCardsArray[0].classList.remove('show','open');		// turn the dismatched cards to normal and close them back
							openCardsArray[1].classList.remove('show','open');
							openCardsArray=[];
						},500);
					}

				},500);

		}

	}
}

function checkMove()												//function to change the star rating
{
	if(moves>16&&moves<=25)
	{
		starCount[2].style.visibility="collapse";
	}
	else if(moves>26)
	{
		starCount[1].style.visibility="collapse";
	}
}

function checkEnd()												//function to check the game end
{
	//alert("Tile flipped"+tilesFlipped);
	if(tilesFlipped===16)
	{
		//alert("Game Over");
		setTimeout(function(){								//winner declaration when the game ends

		let star=document.querySelector(".stars");
		page.classList.toggle("hidden");
		winner.classList.toggle("hidden");
		document.querySelector(".final-time").innerText="Time: "+time.innerText;
		document.querySelector(".final-moves").innerText="Moves: "+moves;
		let fstar=document.querySelector(".fstars");
		fstar.innerHTML=star.innerHTML;

		tilesFlipped=0;
		moves=0;
		moveDisplay.innerText=moves;

		},500);
		
	}
}

//reset button 
let reset=document.querySelector(".restart");
reset.addEventListener("click",function(){restart();});			//add event listener to restart button

//restart function
function restart()
{
	window.location.reload(); 									//load the window to restart again	
}

function timer()												//game timer function
{
	t=setTimeout(add,1000);
}
	function add()
	{
		seconds++;
		if(seconds>=60)
		{
			seconds=0;
			minutes++;
			if(minutes>=60)
			{
				minutes=0;
				hours++;
			}
		}

time.textContent=(hours ?(hours > 9 ? hours:"0"+hours) :"00")+":"+(minutes ? (minutes > 9? minutes:"0"+minutes):"00")+":"+(seconds>9?seconds:"0"+seconds);
		timer();
	}

function clearTimer()							//game timer clearing function
{
	seconds=0;
	minutes=0;
	hours=0;
	time.innerText="00:00:00";
}
