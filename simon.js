let gameseq=[];  // game jo v flash krega color uska sequense store hoga
let userseq=[]; // user jo v flash krega color uska sequense store hoga

let btns=['yellow','red','purple','green'];

let start =false;
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){// press any key to start the game 
    if(start==false){
        start=true;
        levelUp();
    }   
})

function gameFlash(btn){
    btn.classList.add("flash"); // adding flash to it
    setTimeout(function(){//removing flash after 1sec
        btn.classList.remove("flash")
    },250)
}


function userFlash(btn){// in this if user click the button flash color is different 
    btn.classList.add("userflash"); // adding flash to it
    setTimeout(function(){//removing flash after 1sec
        btn.classList.remove("userflash")
    },250)
}

function levelUp(){ // every time the sequence is complete level up is called
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randomIdx=Math.floor(Math.random()*3);// choosing random btn from the array
    let randomColor= btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`)


    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randombtn);
    gameseq.push(randomColor);
    console.log(gameseq);
    gameFlash(randombtn);
}

function checkans(idx){// checking is the user enter the right color
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
        
    }
    else{ // if user enter the wrong input 
        h2.innerHTML=`Game Over ! Your score was <b>${level}</b> <br> Press any key to restart `;
        document.body.style.backgroundColor="red";
        setTimeout(function(){
            document.body.style.backgroundColor="white";
        },150)
        reset();
    }
}

function btnPress(){ // the btn pressed by the user is stored and chek by  calling theabove check function
    let btn = this;
    userFlash(btn);
     
    usercolor=btn.getAttribute("id");// user pressed btn color
    userseq.push(usercolor);
    
    checkans(userseq.length-1);
    
}

let allbtn = document.querySelectorAll(".btn");

for(btn of allbtn){// add event listner to all btn
    btn.addEventListener("click",btnPress)
}

function reset(){// if game is over resetting all the values
    start=false;
    gameseq=[];
    userseq=[];
    level=0;
}