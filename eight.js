


(function(){
	var sec=0;
	function setTime(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function () {
    document.getElementById("seconds").innerHTML = setTime(++sec % 60);
    document.getElementById("minutes").innerHTML = setTime(parseInt(sec / 60, 10));
}, 1000);




	var position = 1;
	var game = document.getElementById('game');

	answer(); 	// calls answered puzzle function

	
	
	game.addEventListener('click', function(e){ 	// when there is a click this function executes 

		if(position == 1){ // if next box is empty
			
			game.className = 'move'; //animates
			moveBox(e.target); //move boxs
		}
	});
	
	// listening when solve or shuffle button is clicked
	document.getElementById('answer').addEventListener('click', answer);
	document.getElementById('shuffle').addEventListener('click', shuffle);
  
	
	 // function to make a answer to the  puzzle
	function answer(){
		
		if(position == 0){
			return;
		}
		
		game.innerHTML = '';

		// j=col
		// i=row
		
		var k = 1;
		for(var i = 0; i <= 2; i++){  //for rows less than 4
			for(var j = 0; j <= 2; j++){ //for col less than 4
				var box = document.createElement('span'); //makes a box
				box.id = 'box-'+i+'-'+j;  //gives box an id
				box.style.left = (j*100+1*j+1)+'px'; //sets left position of box
				box.style.top = (i*100+1*i+1)+'px';  //sets top position of box
				

				//adds pic to every box 
				if(k <= 8){  
					box.classList.add('num');
					if(j==0 && i==0){
						box.classList.add('pic1');
					}

					if(j==1 && i==0){
						box.classList.add('pic2');
					}
					if(j==2 && i==0){
						box.classList.add('pic3');
					}
					if(j==3 && i==0){
						box.classList.add('pic4');
					}
					if(j==0 && i==1){
						box.classList.add('pic5');
					}
					if(j==1 && i==1){
						box.classList.add('pic6');
					}
					if(j==2 && i==1){
						box.classList.add('pic7');
					}
					if(j==3 && i==1){
						box.classList.add('pic8');
					}
					if(j==0 && i==2){
						box.classList.add('pic9');
					}
					if(j==1 && i==2){
						box.classList.add('pic10');
					}
					if(j==2 && i==2){
						box.classList.add('pic11');
					}
					if(j==3 && i==2){
						box.classList.add('pic12');
					}
					if(j==0 && i==3){
						box.classList.add('pic13');
					}
					if(j==1 && i==3){
						box.classList.add('pic14');
					}
					
                  
					
					box.innerHTML = (k++).toString(); //The toString() method converts a number to a string.
				} else {
					box.className = 'em_box'; 
				}
				
				game.appendChild(box); //attaches box to puzzle 
			}
		}
		
	}

	
	 // function to move box to an empty box 
	function moveBox(box){
		
		if(box.clasName != 'em_box'){  //if selected box is not empty (if box has a number)
			
			//getEmptyNextBox method tried to get empty box that is next to it
			var emptyBox = getEmptyNextBox(box);
			
			if(emptyBox){
				// Temporary data for an empty box
				var temp = {style: box.style.cssText, id: box.id};
				
				// Exchanges id and style values for the empty boxs
				box.style.cssText = emptyBox.style.cssText;
				box.id = emptyBox.id;
				emptyBox.style.cssText = temp.style;
				emptyBox.id = temp.id;
				
				if(position == 1){
					checkSequence(); //calls the method to check correct order
				}
			}
		}
		
	}

	
	 //function to get box by its row and col
	function getBox(rows, cols){
	
		return document.getElementById('box-'+rows+'-'+cols);
		
	}

	

	 //function to get a empty box
	function findEmptyBox(){
	
		return game.querySelector('.em_box');
			
	}
	
	

	 // function checks and gets empty neighbor box
	function getEmptyNextBox(box){
		
		var next = findNextBoxs(box); // Gets every next boxs

		
		//for loop to look for empty box
		for(var i = 0; i < next.length; i++){
			if(next[i].className == 'em_box'){
				return next[i];
			}
		}
		
		return false; //if empty box is not found returns false
		
	}

	
	 //function to get all neighboring boxs
	function findNextBoxs(box){
		
		var id = box.id.split('-');
		
		//The parseInt() function parses a string argument and returns an integer 
		//converts to Int to give position of index
		var rows = parseInt(id[1]);
		var cols = parseInt(id[2]);
		
		var next = [];
		
		// Gets every possible next boxs for each row and col
		if(rows < 2){
			next.push(getBox(rows+1, cols));
		}			
		if(rows > 0){
			next.push(getBox(rows-1, cols));
		}
		if(cols < 2){
			next.push(getBox(rows, cols+1));
		}
		if(cols > 0){
			next.push(getBox(rows, cols-1));
		}
		
		return next;
		
	}
	
	

	 // function to check if the boxs are in the correct order
	function checkSequence(){
		
		//position 3,3 is the bottom right box which must be empty
		//this if checks that condition
		if(getBox(2, 2).className != 'em_box'){
			return;
		}
	
		var k= 1;

		//checks number of all boxs
		for(var i = 0; i <= 2; i++){ 
			for(var j = 0; j <= 2; j++){
				if(k <= 8 && getBox(i, j).innerHTML != k.toString()){ //if postion(i,j) order does not equal string order
					// Order is incorrect
					return;
				}
				k++;
			}
		}
		
		// if the puzzle is solved then a msg pops up with thi msg
		//The confirm() method displays a dialog box with a specified message, along with an OK and a Cancel button
		if(confirm('Congratulation! You won!!!\nShuffle the puzzle?')){
			shuffle(); //if they clicked yes then shuffle function is called
		}
	
	}

	

	 //function to shuffle the puzzle
	function shuffle(){
	
		if(position == 0){ 
			return;
		}
		
		game.removeAttribute('category'); //Remove the class attribute from the puzzle
		position = 0;
		
		var prevBox;
		var i = 1;
		var stop = setInterval(function(){
			if(i <= 100){
				var next = findNextBoxs(findEmptyBox());
				if(prevBox){
					for(var j = next.length-1; j >= 0; j--){
						if(next[j].innerHTML == prevBox.innerHTML){
							next.splice(j, 1);
						}
					}
				}
				/*gets random next box and saves the box for the next loop*/
				prevBox = next[random(0, next.length-1)]; //gets random next box
				moveBox(prevBox); //saves position for the next loop
				i++;
			} else {
				clearInterval(stop);
				position = 1;
			}
		}, 5);
		
	}
	
	
	 //random number function
	function random(start, end){

		return Math.floor(Math.random() * (end - start + 1)) + start;

	}

}());