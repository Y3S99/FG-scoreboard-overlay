
window.onload=init;       // When the window finishes loading, the init function is executed


function init(){  
                  // Main initialization function
    const imgPath="./ImageBackground/character/";
    var p1Name;
    var p2Name;
    var p1Team;
    var p2Team;
    var p1Ch;
    var p2Ch;
    var round;
    var winflag;
     // Get references to various DOM elements to display data
    const p1element=document.getElementById("p1name");
    const p2element=document.getElementById("p2name");
    const p1teamelement=document.getElementById("p1team");
    const p2teamelement=document.getElementById("p2team");
    const rdelement=document.getElementById("round");
    const winnernameelemet=document.getElementById("winnername");
    const displaywrapperelement=document.getElementById("diplaywrapper"); 
    const characterimageelemet=document.getElementById("characterimg");
    const charactershadowelemet=document.getElementById("characterimgshadow");
    const chnameelement=document.getElementById("chname");
    var startup=true;        // Set initial startup flag



     startlive();      // Start live updates for the game state     
     setInterval(startlive,10);  // Set interval to repeatedly fetch and update the game state every 10ms
    function startlive(){            // Start the live data fetch process

        fetch("./StreamControl/streamcontrol.json")  //Using the fetch() API to Read local JSON file from steamcontrol(JSON parsing)
        .then(response => response.json())         // Parse the JSON response
        .then(data => showInfo(data));      // Call showInfo with the parsed data 
        
        
            function showInfo(data) {
                // Extract relevant data from the fetched JSON
                 p1Name = data.p1Name;
                 p2Name = data.p2Name;
                 p1Team = data.p1Team;
                 p2Team = data.p2Team;
                 p1Ch = data.p1character;
                 p2Ch = data.p2character;
                 round = data.round;
                 winflag = data.winnerflag;
                
                
                 p1teamelement.innerHTML=p1Team;
                 p2teamelement.innerHTML=p2Team;
                 p1element.innerHTML=p1Name;
                 p2element.innerHTML=p2Name;
                 rdelement.innerHTML=round;


                if(winflag=="off"){               //when windisplay is off
                    winnernameelemet.innerHTML="";    
                    startup=true;
                    displaywrapperelement.style.display="none";             //disable render of elements 
                    //reset style css
                    document.getElementById("characterimg").style.filter = "brightness(0%)";
                    document.getElementById("characterimgshadow").style.left="50%";
                    

                }

                 else if(winflag=="p1win" && startup==true){               //when player1 win
                    characterimageelemet.src=imgPath+p1Ch+".png";
                    charactershadowelemet.src=imgPath+p1Ch+".png";
                    winnernameelemet.innerHTML=p1Team+" "+p1Name;
                    temp=getinfo(p1Ch,"fullname");                   // to get character data from list(function module on character.js)
                    chnameelement.innerHTML=temp;                   
                    displaywrapperelement.style.display="block";        //render all element
                    
                    animate();                     //animate
                    startup=false;
                    
                 }
                 else if(winflag=="p2win" && startup==true)                  //when player2 win
                    {   characterimageelemet.src=imgPath+p2Ch+".png";
                        charactershadowelemet.src=imgPath+p2Ch+".png";
                        winnernameelemet.innerHTML=p2Team+" "+p2Name;
                        temp=getinfo(p2Ch,"fullname");              // to get character data from list(function module on character.js)
                        chnameelement.innerHTML=temp;                       
                        displaywrapperelement.style.display="block";       //render all element
                        
                        animate();                      //animate
                        startup=false;
                     }


                 
                
             }
            }
        } 


function animate(){         // Function to handle startup animations for various elements
    playvideo()               //play webm

    gsap.from("#diplaywrapper",1,{
        opacity:0,
        duration: 0.1,
        delay:0.5,
})



    
    gsap.from("#chname",{
        x:-90,
        y:-20,
        opacity:0,
       delay:2.5,
       duration: 1.2,
        ease: "power4.out"
    })
    
    gsap.from("#winnername",{
        x:-90,
        y:-20,
        opacity:0,
       delay:2.6,
       duration: 1,
        ease: "power4.out"
    })


    gsap.from("#characterimg",{
        scale:1.3,
       delay:0.5,
       duration: 2.5,
        ease: "power4.out"
    })

    gsap.from("#characterimgshadow",{

        scale:1.3,
       delay:0.5,
       duration: 2.5,
        ease: "power4.out"
    })
    
    gsap.to("#characterimgshadow",{
        left:-1,
       delay:2.5,
       duration: 1.8,
        ease: "power4.out"
    })

    gsap.to("#characterimg",{
        
        
       delay:2.5,
       duration: 1.8,
       filter:"brightness(1)",
        ease: "power4.out"
    })

   

    



}


function playvideo(){          //play webm video

    document.getElementById("winner").play();
    document.getElementById("frontpanel").play();
    document.getElementById("backpanel").play();
}


        
//----------github.com/Y3S99-------------

