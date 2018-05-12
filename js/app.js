/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const cardDeck=document.querySelector(".deck");
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

window.addEventListener("load",function(){
	startGame();
});
function shuffle(array) {
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

function startGame()
{
	cardArray=shuffle(cardArray);
	let tempArray=[];
	for(i=0;i<starCount.length;i++)
	{
		starCount[i].style.visibility="visible";
	}
	tilesFlipped=0;
	moves=0;
	openCardsArray=[];


	for(let i=0;i<cardArray.length;i++)
	{
		cardDeck.innerHTML=" ";
		tempArray.forEach.call(cardArray,function(item){cardDeck.appendChild(item);});
		cardArray[i].classList.toggle("open");
		cardArray[i].classList.toggle("show");

		setTimeout(function(){
			for(let i=0;i<cardArray.length;i++)
			{
				cardArray[i].classList.remove("show","open","match");
			}
		},700);			
	}

	for(i=0;i<cardArray.length;i++)
	{
		cardArray[i].addEventListener("click",function(event){
			openCard(event);
		});
	}
}

function openCard(event)
{
	let clsLs=event.target.classList;
	if(clsLs.length>=3)
	{
		if(clsLs.length===3)
		{
			alert("Card already opened choose other to match");
		}
		else if(clsLs.length===4)
		{
			alert("You already mateched this card");
		}
	}

	else
	{
		if(openCardsArray.length===0)
		{
			event.target.classList.toggle("open");
			event.target.classList.toggle("show");
			openCardsArray.push(event.target);

		}
		else if(openCardsArray.length===1)
		{
			event.target.classList.toggle("open");
			event.target.classList.toggle("show");
			moves+=1;
			moveDisplay.innerHTML=moves;
			checkMove();
			setTimeout(function()
				{
					openCardsArray.push(event.target);
					if(openCardsArray[0].innerHTML===openCardsArray[1].innerHTML)
					{
						//alert("Matches");
						tilesFlipped+=2;
						openCardsArray[0].classList.toggle("match");
						openCardsArray[1].classList.toggle("match");
						openCardsArray=[];
					}
					else
					{
						//alert("Dismatch");
						openCardsArray[0].style.background="red";
						openCardsArray[1].style.background="red";
						setTimeout(function(){
							openCardsArray[0].style.background="";
							openCardsArray[1].style.background="";
							openCardsArray[0].classList.remove('show','open');
							openCardsArray[1].classList.remove('show','open');
							openCardsArray=[];
						},500);
					}

				},500);

		}

	}
}

function checkMove()
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
