/* function begin defines some objects we will use later*/
function begin(){
	objracket= new Object();
	objracket.speed=10;
	objracket.move0='no';
	objracket.move1='no';
	objracket.moving0='no';
	objracket.moving1='no';
	objracket.score0=0;
	objracket.score1=0;
	objborder=new Object();
	objborder.howlong=window.innerWidth;
	objborder.howtall=window.innerHeight;
	objracket['length0']=150;
	objracket['length1']=objracket['length0'];
	objracket['racket0']=objborder.howtall/2;
	objracket['racket0']-=objracket['length0']/2;
	objracket['racket0']=Math.floor(objracket['racket0']);
	objracket['racket0']=Math.floor(objracket['racket0']);
	objracket['racket1']=objracket['racket0'];
	objracket['canfire0']='yes';
	objracket['canfire1']='yes';
	objracket['canfirered0']='yes';
	objracket['canfirered1']='yes';
	objracket['redmunition0']=20;
	objracket['redmunition1']=20;
	objracket.activateshield0='no';
	objracket.activateshield1='no';
	objball=new Object();
	objball.xspeed=3;
	objball.yspeed=0;
	objball.moving='no';
	objball.move=Math.random();
	if (objball.move<1/2){
		objball.xspeed=-3;
	}
	objlaser= new Object();
	objlaser.red1move='no';
	objlaser.red0move='no';
	document.getElementById('Racket1').style.left=(objborder.howlong-120)+'px';
	document.getElementById('Racket1').style.top=objracket['racket1']+'px';
	document.getElementById('Racket0').style.top=objracket['racket0']+'px';
	document.getElementById('Ball').style.top=Math.floor((objborder.howtall-20)/2)+'px';
	document.getElementById('Ball').style.left=Math.floor((objborder.howlong-20)/2)+'px';
	document.getElementById('Data0').style.top=(objborder.howtall-40)+'px';
	document.getElementById('Data1').style.top=document.getElementById('Data0').style.top;
	document.getElementById('Data1').style.left=(objborder.howlong-130)+'px';
	writescore(0);
	writescore(1);
	writeredmunition(0);
	writeredmunition(1);
	document.addEventListener('keydown', function (event){
														  var key;
														  key=event.which || event.keyCode;
														  if (key==38 || key==40){
														  	event.preventDefault();
														  }
														});
}

/* function start is lunched when a key is pressed, it detects the pressed key and runs a different function depending
 * on the pressed key*/
function start(e){
	var key=e.which || e.keyCode;
	if (key==87){
		if (objracket.moving0=='no' || objracket.moving0=='down'){
			if (objracket.moving0=='down'){
				clearInterval(objracket.move0);
			}
			objracket.moving0='up';
			objracket.move0=setInterval(function(){move(-5,0);}, objracket.speed);
		}
		else{}
	}
	else if (key==83){
		if (objracket.moving0=='no' || objracket.moving0=='up'){
			if (objracket.moving0=='up'){
				clearInterval(objracket.move0);
			}
			objracket.moving0='down';
			objracket.move0=setInterval(function(){move(5,0);}, objracket.speed);
		}
		else{}
	}
	else if (key==38){
		if (objracket.moving1=='no' || objracket.moving1=='down'){
			if (objracket.moving1=='down'){
				clearInterval(objracket.move1);
			}
			objracket.moving1='up';
			objracket.move1=setInterval(function(){move(-5,1);}, objracket.speed);
		}
		else{}
	}
	else if (key==40){
		if (objracket.moving1=='no' || objracket.moving1=='up'){
			if (objracket.moving1=='up'){
				clearInterval(objracket.move1);
			}
			objracket.moving1='down';
			objracket.move1=setInterval(function(){move(5,1);}, objracket.speed);
		}
		else{}
	}
	else if (key==68){
		firegreenlaser(0);
	}
	else if (key==69){
		fireredlaser(0);
	}
	else if (key==37){
		firegreenlaser(1);
	}
	else if (key==32){
		fireredlaser(1);
	}
	else if (key==13){
		startstop();
	}
	else if (key==65){
		activateshield(0);
	}
	else if (key==39){
		activateshield(1);
	}
	else{
		console.log('Para d\'apretar tecles a saco i mira les instruccions.');
	}
}

/* function activateshield will activate a shield during 0.2 seconds and will permit to reactivate it every second,
 * activating it will also consume 1 redmunition point*/
function activateshield(racketnumber){
	if (objracket['activateshield'+racketnumber]=='no'){
		if (objracket['redmunition'+racketnumber]>0){
			objracket['redmunition'+racketnumber]--;
			writeredmunition(racketnumber);
			objracket['activateshield'+racketnumber]='yes';
			document.getElementById('Racket'+racketnumber).style.backgroundColor='#ff00ff';
			setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='#00ff00';
								  objracket['activateshield'+racketnumber]='charging';}, 200);
			setTimeout(function(){objracket['activateshield'+racketnumber]='no';}, 1000);
		}
	}
}

/* function move will allow the players to move the rackets up and down*/
function move(distance, racketnumber){
	objracket['racket'+racketnumber]+=distance;
	if (objracket['racket'+racketnumber]<0 && distance<0){
		objracket['racket'+racketnumber]=0;
	}
	else if (objracket['racket'+racketnumber]>(objborder.howtall-objracket['length'+racketnumber]) && distance>0){
		objracket['racket'+racketnumber]=(objborder.howtall-objracket['length'+racketnumber]);
	}
	document.getElementById('Racket'+racketnumber).style.top=objracket['racket'+racketnumber]+'px';
}

/* function stop is lunched when a key is pulled up, it detects the key and stops the function that the same key pressed
 * down run the first time*/
function stop(e){
	var key=e.which || e.keyCode;
	if (key==87){
		if (objracket.moving0=='down'){}
		else{
			clearInterval(objracket.move0);
			objracket.moving0='no'
		}
	}
	else if (key==83){
		if (objracket.moving0=='up'){}
		else{
			clearInterval(objracket.move0);
			objracket.moving0='no'
		}
	}
	else if (key==38){
		if (objracket.moving1=='down'){}
		else{
			clearInterval(objracket.move1);
			objracket.moving1='no'
		}
	}
	else if (key==40){
		if (objracket.moving1=='up'){}
		else{
			clearInterval(objracket.move1);
			objracket.moving1='no'
		}
	}
}

/* function startstop will set the ball moving or stop it*/
function startstop(){
	if (objball.moving=='no'){
		objball.move=setInterval(function(){moveball();} , 10);
		objball.moving='yes';
	}
	else{
		clearInterval(objball.move);
		objball.moving='no';	
	}
}

/* function moveball will read the speed attributes of the Ball object and move  the ball consequently
 * it will also make the ball bouce*/
function moveball(){
	var newleft, newtop, xlimit;
	xlimit=objborder.howlong-140;
	newleft=document.getElementById('Ball').style.left;
	newleft=newleft.slice(0,-2);
	newleft=parseInt(newleft);
	newtop=document.getElementById('Ball').style.top;
	newtop=newtop.slice(0,-2);
	newtop=parseInt(newtop);
	newleft+=Math.round(objball.xspeed);
	newtop+=Math.round(objball.yspeed);
	if (newtop<0 && objball.yspeed<0){
		newtop=0;
		objball.yspeed=-objball.yspeed;
	}
	else if (newtop>(objborder.howtall-20) && objball.yspeed>0){
		newtop=(objborder.howtall-20);
		objball.yspeed=-objball.yspeed;
	}
	/* if the ball hits one of the rckets we make it bounce and add 5 points to that racket*/
	if (newleft>xlimit && newleft<(xlimit+11) && newtop>(objracket['racket1']-20) && newtop<(objracket['racket1']+objracket['length1']) && objball.xspeed>0){
		objball.score1+=10;
		writescore(1);
		if (newtop>=(objracket['racket1']-10) && newtop<=(objracket['racket1']+objracket['length1']-10)){
			objball.xspeed=-objball.xspeed;
			objball.yspeed+=2*(newtop+10-objracket['racket1']-objracket['length1']/2)/objracket['length1'];
		}
		else{
			var x0, y0, newx, newy;
			if (newtop<(objracket['racket1']-10)){
				x0=Math.atan2((newtop+10-objracket['racket1']), (newleft-10-xlimit));
				y0=Math.sin(x0);
				x0=Math.cos(x0);
				newtop=objracket['racket1']-20;
			}
			else{
				x0=Math.atan2((newtop+10-objracket['length1']-objracket['racket1']), (newleft-10-xlimit));
				y0=Math.sin(x0);
				x0=Math.cos(x0);
				newtop=objracket['racket1']+objracket['length1'];
			}
			newx=x0*objball.xspeed+y0*objball.yspeed;
			newy=x0*objball.yspeed-y0*objball.xspeed;
			newx=-newx;
			objball.xspeed=Math.round(x0*newx-y0*newy);
			objball.yspeed=Math.round(y0*newx+x0*newy);
			if (objracket.moving1=='up'){
				objball.yspeed-=2;
			}
			else if (objracket.moving1=='down'){
				objball.yspeed+=2;
			}
		}
		newleft=xlimit;
	}
	else if (newleft<120 && newleft>109 && newtop>(objracket['racket0']-20) && newtop<(objracket['racket0']+objracket['length0']) && objball.xspeed<0){
		objball.score0+=10;
		writescore(0);
		if (newtop>=(objracket['racket0']-10) && newtop<=(objracket['racket0']+objracket['length0']-10)){
			objball.xspeed=-objball.xspeed;
			objball.yspeed+=2*(newtop+10-objracket['racket0']-objracket['length0']/2)/objracket['length0'];
		}
		else{
			var x0, y0, newx, newy;
			if (newtop<(objracket['racket0']-10)){
				x0=Math.atan2((newtop+10-objracket['racket0']), (newleft-110));
				y0=Math.sin(x0);
				x0=Math.cos(x0);
				newtop=objracket['racket0']-20;
			}
			else{
				x0=Math.atan2((newtop+10-objracket['length0']-objracket['racket0']), (newleft-110));
				y0=Math.sin(x0);
				x0=Math.cos(x0);
				newtop=objracket['racket0']+objracket['length0'];
			}
			newx=x0*objball.xspeed+y0*objball.yspeed;
			newy=x0*objball.yspeed-y0*objball.xspeed;
			newx=-newx;
			objball.xspeed=Math.round(x0*newx-y0*newy);
			objball.yspeed=Math.round(y0*newx+x0*newy);
			if (objracket.moving0=='up'){
				objball.yspeed-=2;
			}
			else if (objracket.moving0=='down'){
				objball.yspeed+=2;
			}
		}
		newleft=120;
	}
	else if (newleft>=(objborder.howlong-20)){
		startstop();
		newleft=objborder.howlong-20;
		autodestruction(1);
		objracket.score0+=500;
		writescore(0);
	}
	else if (newleft<=0){
		startstop();
		newleft=0;
		autodestruction(0);
		objracket.score1+=500;
		writescore(1);
	}
	document.getElementById('Ball').style.left=newleft+'px';
	document.getElementById('Ball').style.top=newtop+'px';
}

/* function autodestruction will change the color of the loser racket and delete it*/
function autodestruction(racketnumber){
	var time=0;
	time+=500;
	setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='red';}, time);
	time+=500;
	setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='blue';}, time);
	time+=500;
	setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='yellow';}, time);
	time+=500;
	setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='white';}, time);
	time+=500;
	setTimeout(function(){document.getElementById('Racket'+racketnumber).style.backgroundColor='#00FF00';}, time);
	time+=500;
	setTimeout(function(){document.body.removeChild(document.getElementById('Racket'+racketnumber));
						  //delete objracket;
	                     }, time);
}

/*function fireredlaser will fire the red laser from the center of the indicated racket*/
function fireredlaser(racketnumber){
	var laser;
	if (objracket['canfirered'+racketnumber]=='yes' && objracket['redmunition'+racketnumber]>0){
		objracket['redmunition'+racketnumber]--;
		writeredmunition(racketnumber);
		laser=document.createElement('div');
		document.body.appendChild(laser);
		laser.className='redlaser';
		laser.style.top=(objracket['racket'+racketnumber]+objracket['length'+racketnumber]/2-1)+'px';
		if (racketnumber==0){
			laser.style.left=100+'px';
			laser.speed=5;
		}
		else{
			laser.style.left=(objborder.howlong-120)+'px';
			laser.speed=-5;
		}
		moveredlaser(laser);
		objracket['canfirered'+racketnumber]='no';
		setTimeout(function(){objracket['canfirered'+racketnumber]='yes';}, 500);
	}
}

/* function moveredlaser will move the red laser until it hits the target, the ball or arrives to the bottom*/
function moveredlaser(laser){
	var newleft, actualtop, distance, xdistance;
	newleft=laser.style.left;
	newleft=newleft.slice(0, -2);
	newleft=parseInt(newleft);
	actualtop=laser.style.top;
	actualtop=actualtop.slice(0, -2);
	actualtop=parseInt(actualtop);
	newleft+=laser.speed;
	distance=parseInt(document.getElementById('Ball').style.top.slice(0,-2));
	distance+=10-actualtop;
	distance=distance*distance;
	xdistance=parseInt(document.getElementById('Ball').style.left.slice(0,-2));
	xdistance+=10-newleft;
	if (laser.speed>0){
		xdistance-=20;
	}
	xdistance=xdistance*xdistance;
	distance=distance+xdistance;
	if (newleft>(objborder.howlong-140) && newleft<(objborder.howlong-129) && actualtop>(objracket['racket1']-1) && actualtop<(objracket['racket1']+objracket['length1']-1) && laser.speed>0){
		if (objracket.activateshield1!='yes'){
			hittarget(1);
			document.body.removeChild(laser);
		}
		else{
			laser.style.left=(objborder.howlong-140)+'px';
			laser.speed=-laser.speed;
			setTimeout(function(){moveredlaser(laser);}, 10);
		}
	}
	else if (newleft<120 && newleft>109 && actualtop>(objracket['racket0']-1) && actualtop<(objracket['racket0']+objracket['length0']-1) && laser.speed<0){
		if (objracket.activateshield0!='yes'){
			hittarget(0);
			document.body.removeChild(laser);
		}
		else{
			laser.style.left=120+'px';
			laser.speed=-laser.speed;
			setTimeout(function(){moveredlaser(laser);}, 10);
		}
	}
	else if (newleft>(objborder.howlong-20) || newleft<0){
		document.body.removeChild(laser);
	}
	else if (distance<100){
		document.body.removeChild(laser);	
	}
	else{
		laser.style.left=newleft+'px';
		setTimeout(function(){moveredlaser(laser);}, 10);
	}
}

/* function firegreenlaser will creat a new element, append it to the body and set it moving on one
 * direction or the other depending on where it comes from*/
function firegreenlaser(racketnumber){
	var laser;
	if (objracket['canfire'+racketnumber]=='yes'){
		laser=document.createElement('div');
		document.body.appendChild(laser);
		laser.className='greenlaser';
		laser.style.top=(objracket['racket'+racketnumber]+objracket['length'+racketnumber]/2-1)+'px';
		if (racketnumber==0){
			laser.style.left=100+'px';
			laser.speed=5;
		}
		else{
			laser.style.left=(objborder.howlong-120)+'px';
			laser.speed=-5;
		}
		movegreenlaser(laser);
		objracket['canfire'+racketnumber]='no';
		setTimeout(function(){objracket['canfire'+racketnumber]='yes';}, 200);
	}
}

/* function movegreenlaser will move a green laser, make it disappear when arrived at the end of the screen, make
 * it bounce when it hits a racket and make it move the ball when it hits it*/
function movegreenlaser(laser){
	var newleft, actualtop, distance, xdistance;
	newleft=laser.style.left;
	newleft=newleft.slice(0, -2);
	newleft=parseInt(newleft);
	actualtop=laser.style.top;
	actualtop=actualtop.slice(0, -2);
	actualtop=parseInt(actualtop);
	newleft+=laser.speed;
	distance=parseInt(document.getElementById('Ball').style.top.slice(0,-2));
	distance+=10-actualtop;
	distance=distance*distance;
	xdistance=parseInt(document.getElementById('Ball').style.left.slice(0,-2));
	xdistance+=10-newleft;
	if (laser.speed>0){
		xdistance-=20;
	}
	xdistance=xdistance*xdistance;
	distance=distance+xdistance;
	/* whe the laser hits one of the rackets we add 1 point and 1 red laser to that racket and make the laser bounce*/
	if (newleft>(objborder.howlong-140) && newleft<(objborder.howlong-129) && actualtop>(objracket['racket1']-1) && actualtop<(objracket['racket1']+objracket['length1']-1) && laser.speed>0){
		laser.style.left=(objborder.howlong-140)+'px';
		laser.speed=-laser.speed;
		objracket.score1+=1;
		objracket.redmunition1+=1;
		writescore(1);
		writeredmunition(1);
		setTimeout(function(){movegreenlaser(laser);}, 10);
	}
	else if (newleft<120 && newleft>109 && actualtop>(objracket['racket0']-1) && actualtop<(objracket['racket0']+objracket['length0']-1) && laser.speed<0){
		laser.style.left=120+'px';
		laser.speed=-laser.speed;
		objracket.score0+=1;
		objracket.redmunition0+=1;
		writescore(0);
		writeredmunition(0);
		setTimeout(function(){movegreenlaser(laser);}, 10);
	}
	else if (newleft>(objborder.howlong-20) || newleft<0){
		document.body.removeChild(laser);
	}
	/* if the green laser hits the ball we add 10 points and 2 red lasers depending on the direction of the laser*/
	else if (distance<100){
		var x0, y0;
		x0=document.getElementById('Ball').style.left;
		x0=x0.slice(0,-2);
		x0=parseInt(x0);
		x0+=10;
		y0=document.getElementById('Ball').style.top;
		y0=y0.slice(0,-2);
		y0=parseInt(y0);
		y0+=10;
		x0-=newleft;
		y0-=actualtop+1;
		if (laser.speed>0){
			x0-=20;
			objracket.score0+=10;
			objracket.redmunition0+=2;
			writescore(0);
			writeredmunition(0);
		}
		else{
			objracket.score1+=10;
			objracket.redmunition1+=2;
			writescore(1);
			writeredmunition(1);	
		}
		x0=Math.atan2(y0, x0);
		y0=3*Math.sin(x0);
		x0=3*Math.cos(x0);
		y0=Math.round(y0);
		x0=Math.round(x0);
		objball.yspeed+=y0;
		objball.xspeed+=x0;
		/*we avoid the ball from being stopped*/
		if (Math.abs(objball.xspeed)<2){
			if (Math.abs(x0)>1){
				objball.xspeed+=x0;
			}
			else{
				objball.xspeed+=2*(2*Math.round(Math.random())-1);
			}
		}
		document.body.removeChild(laser);
	}
	else{
		laser.style.left=newleft+'px';
		setTimeout(function(){movegreenlaser(laser);}, 10);
	}
}

/* function hittarget will reduce by 10 the targets length and will augment by 5 the length of the attacker it will
 * also give to the target 2 extra red laser munition and 15 extra points to de attacker*/
function hittarget(target){
	var attacker;
	attacker=1-target;
	objracket['length'+attacker]+=5;
	document.getElementById('Racket'+attacker).style.height=objracket['length'+attacker]+'px';
	objracket['length'+target]-=10;
	document.getElementById('Racket'+target).style.height=objracket['length'+target]+'px';
	objracket['redmunition'+target]+=2;
	objracket['score'+attacker]+=15;
	writescore(attacker);
	writeredmunition(target);
}

/* function writescore will whrite the score of one or the other player*/
function writescore(player){
	var text='Puntuaci&oacute: ';
	text+=objracket['score'+player];
	document.getElementById('Score'+player).innerHTML=text;
}

/* function writeredmunition will write how much redmunition is left to one player or the other*/
function writeredmunition(player){
	var text='Munici&oacute: ';
	text+=objracket['redmunition'+player];
	document.getElementById('Redmunition'+player).innerHTML=text;
}
