
window.onload=init;         // When the window finishes loading, the init function is executed

function init(){        // Main initialization function
    
    var t1m1flag; var t1m2flag; var t1m3flag; var t2m1flag; var t2m2flag; var t2m3flag;
    // Set initial startup flag
    var startup=true;
    var tbstartup=true;

    // Get references to various DOM elements to display data
    const p1textwrapper = document.getElementById('P1wrapper');
    const p2textwrapper = document.getElementById('P2wrapper');
    const roundwrap = document.getElementById('round');
    const p1nameelement = document.getElementById('P1name');
    const p1teamelement = document.getElementById('P1teamname');
    const p2nameelement = document.getElementById('P2name')
    const p2teamelement = document.getElementById('P2teamname');
    const p1scoreelement = document.getElementById('P1score');
    const p2scoreelement = document.getElementById('P2score');
    const roundelement = document.getElementById('round');
    //Teambattle
    const tbwrapper = document.getElementById('TBwrapper');
    const t1m1element=document.getElementById('T1M1');
    const t1m2element=document.getElementById('T1M2');
    const t1m3element=document.getElementById('T1M3');
    const t2m1element=document.getElementById('T2M1');
    const t2m2element=document.getElementById('T2M2');
    const t2m3element=document.getElementById('T2M3');
    //teambattleflag
    const t1m1flagelement=document.getElementById('T1M1flag');
    const t1m2flagelement=document.getElementById('T1M2flag');
    const t1m3flagelement=document.getElementById('T1M3flag');
    const t2m1flagelement=document.getElementById('T2M1flag');
    const t2m2flagelement=document.getElementById('T2M2flag');
    const t2m3flagelement=document.getElementById('T2M3flag');




    tbwrapper.style.display="none";
    
       // Start the live data fetch process
    function startlive(){

    

        fetch("./StreamControl/streamcontrol.json")     //Using the fetch() API to Read local JSON file from steamcontrol(JSON parsing)
        .then(response => response.json())          // Parse the JSON response
        .then(data => showInfo(data));              // Call showInfo with the parsed data   
        
        
            function showInfo(data) {

                // Extract relevant data from the fetched JSON
                var p1Name = data.p1Name;
                var p2Name = data.p2Name;
                var p1Team = data.p1Team;
                var p2Team = data.p2Team;
                var p1Score = data.p1Score;
                var p2Score = data.p2Score;
                var round = data.round;
                var teambattleflag=data.teambattleflag;
                var t1m1=data.t1mem1name;
                var t1m2=data.t1mem2name;
                var t1m3=data.t1mem3name;
                var t2m1=data.t2mem1name;
                var t2m2=data.t2mem2name;
                var t2m3=data.t2mem3name;
                t1m1flag=data.t1mem1flag;
                t1m2flag=data.t1mem2flag;
                t1m3flag=data.t1mem3flag;
                t2m1flag=data.t2mem1flag;
                t2m2flag=data.t2mem2flag;
                t2m3flag=data.t2mem3flag;

                        // Check if it's the first time loading the data
                if(startup==true){
                                          // assing the elements with the fetched data
                    p1nameelement.innerHTML=p1Name;
                    p2nameelement.innerHTML=p2Name;
                    p1teamelement.innerHTML=p1Team;
                    p2teamelement.innerHTML=p2Team;
                    p1scoreelement.innerHTML=p1Score;
                    p2scoreelement.innerHTML=p2Score;
                    roundelement.innerHTML=round;
                
                    resizeTextToFit(roundwrap);    // Adjust text size to fit the available space
                    resizeTextToFit(p1textwrapper);
                    resizeTextToFit(p2textwrapper);
                    
                    startupanmiation();      // Trigger animation for the first load
                    startup=false;           // Set the startup flag to false to indicate it's no longer the first load

                    if(teambattleflag==1){               // Check if teambattle is on
                        tbwrapper.style.display="block";   //display elements
                        
                        t1m1element.innerHTML=t1m1;   // assing the elements with the fetched data
                        t1m2element.innerHTML=t1m2;
                        t1m3element.innerHTML=t1m3;
                        t2m1element.innerHTML=t2m1;
                        t2m2element.innerHTML=t2m2;
                        t2m3element.innerHTML=t2m3;

                        teammemberflagcheck();            //check for all member elemination status
                     
                        

                        teambattlestartupanimation();   // Trigger teambattle animation for the first load
                        tbstartup=false;         // Set the startup flag to false to indicate it's no longer the first load teambattle
                       }
                       else if(teambattleflag==0){           // Check if teambattle is off
                        tbwrapper.style.display="none";       //hide elements
                       }

                       
                       
                    
            
                }

                else{     // For subsequent updates after the first load
                     
                               
                       // Check if player 1's name or team has changed
                    if(p1nameelement.textContent != p1Name || p1teamelement.textContent!=p1Team ){
                        // Animate player 1's wrapper to transition to the new content
                        gsap.to("#P1wrapper",{
                            x:-30,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p1teamelement.innerHTML=p1Team;
                                p1nameelement.innerHTML=p1Name;
                                resizeTextToFit(p1textwrapper); // Resize text after updating
                            }
                        })
                        
                            // Animate player 1's wrapper to transition to the new content
                        gsap.to("#P1wrapper",{
                            x:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }
                            // Check if player 2's name or team has changed
                    if(p2nameelement.textContent != p2Name || p2teamelement.textContent!=p2Team ){
                        gsap.to("#P2wrapper",{
                            x:+30,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p2teamelement.innerHTML=p2Team;
                                p2nameelement.innerHTML=p2Name;
                                resizeTextToFit(p2textwrapper);
                            }
                        })
                        

                        gsap.to("#P2wrapper",{
                            x:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }
                         
                         // Check if the round has changed
                    if(roundelement.textContent != round ){
                        gsap.to("#round",{
                            y:-35,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.in",
                            onComplete:function(){
                                roundelement.innerHTML=round;
                                resizeTextToFit(roundwrap);  // Resize round text after updating
                            }
                        })
                        

                        gsap.to("#round",{
                            y:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }

                       // Check if player 1's score has changed
                    if(p1scoreelement.textContent != p1Score ){
                        gsap.to("#P1score",{
                            opacity: 0,
                            duration: 0.2,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p1scoreelement.innerHTML=p1Score;
                                
                            }
                        })
                        

                        gsap.to("#P1score",{
                            opacity: 1,
                            duration: 1,
                            delay:0.2,
                            ease: "power1.out"
                        })

                    }

                     // Check if player 2's score has changed
                    if(p2scoreelement.textContent != p2Score ){
                        gsap.to("#P2score",{
                            opacity: 0,
                            duration: 0.2,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p2scoreelement.innerHTML=p2Score;  // Update score
                                
                            }
                        })
                        

                        gsap.to("#P2score",{
                            opacity: 1,
                            duration: 1,
                            delay:0.2,
                            ease: "power1.out"
                        })
                    }


                             //teambattle

                        if(teambattleflag==0){                   // For subsequent updates after the first load  if teambattle is off
                            tbwrapper.style.display="none";
                            tbstartup=true;
                            
                           }
                        
                        if(teambattleflag==1){              // For subsequent updates after the first load  if teambattle is on
                            teammemberflagcheck();
                            tbwrapper.style.display="block";
                            
                            if(tbstartup==true){
                              t1m1element.innerHTML=t1m1;
                              t1m2element.innerHTML=t1m2;
                              t1m3element.innerHTML=t1m3;
                              t2m1element.innerHTML=t2m1;
                              t2m2element.innerHTML=t2m2;
                              t2m3element.innerHTML=t2m3;
                              teambattlestartupanimation();
                              tbstartup=false;}

                            else{                                                // For subsequent updates after the first load tembattle element
                                                
                                         // Check if team1name1 has changed
                                          if(t1m1element.textContent != t1m1){
                                                    gsap.to("#T1M1",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t1m1element.innerHTML=t1m1;
                                                            resizeTextToFitTB(t1m1element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T1M1",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }

                                          if(t1m2element.textContent != t1m2){
                                                    gsap.to("#T1M2",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t1m2element.innerHTML=t1m2;
                                                            resizeTextToFitTB(t1m2element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T1M2",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }

                                          if(t1m3element.textContent != t1m3){
                                                    gsap.to("#T1M3",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t1m3element.innerHTML=t1m3;
                                                            resizeTextToFitTB(t1m3element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T1M3",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }

                                          if(t2m1element.textContent != t2m1){
                                                    gsap.to("#T2M1",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t2m1element.innerHTML=t2m1;
                                                            resizeTextToFitTB(t2m1element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T2M1",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }

                                          if(t2m2element.textContent != t2m2){
                                                    gsap.to("#T2M2",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t2m2element.innerHTML=t2m2;
                                                            resizeTextToFitTB(t2m2element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T2M2",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }

                                          if(t2m3element.textContent != t2m3){
                                                    gsap.to("#T2M3",{
                                                        x:-30,
                                                        opacity: 0,
                                                        duration: 0.5,
                                                        delay: 0,
                                                        ease: "power1.out",
                                                        onComplete:function(){
                                                            
                                                            t2m3element.innerHTML=t2m3;
                                                            resizeTextToFitTB(t2m3element);
                                                        }
                                                    })
                                                    
                            
                                                    gsap.to("#T2M3",{
                                                        x:0,
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        delay:0.5,
                                                        ease: "power1.out"
                                                    })
                                          }
                                }
                        } 

                        

                    
                }
                
            
            }
        }

            function teammemberflagcheck(){        // team member elimination flag check
                if(t1m1flag==1){
                    t1m1flagelement.src="./ImageBackground/Teambattle/L1green.png"                //change singnal image
                    t1m1element.style.color = 'white';                                  //change text color
            
                }
                if(t1m1flag==0){
                    t1m1flagelement.src="./ImageBackground/Teambattle/L1red.png"
                    t1m1element.style.color = 'grey';
            
                }

                if(t1m2flag==1){
                    t1m2flagelement.src="./ImageBackground/Teambattle/L2green.png"
                    t1m2element.style.color = 'white';
            
                }
                if(t1m2flag==0){
                    t1m2flagelement.src="./ImageBackground/Teambattle/L2red.png"
                    t1m2element.style.color = 'grey';
            
                }

                if(t1m3flag==1){
                    t1m3flagelement.src="./ImageBackground/Teambattle/L3green.png"
                    t1m3element.style.color = 'white';
            
                }
                if(t1m3flag==0){
                    t1m3flagelement.src="./ImageBackground/Teambattle/L3red.png"
                    t1m3element.style.color = 'grey';
            
                }
                if(t2m1flag==1){
                    t2m1flagelement.src="./ImageBackground/Teambattle/R1green.png"
                    t2m3element.style.color = 'white';                                    //index/naming error
            
                }
                if(t2m1flag==0){
                    t2m1flagelement.src="./ImageBackground/Teambattle/R1red.png"
                    t2m3element.style.color = 'grey';                                     //index/naming error
            
                }

                if(t2m2flag==1){
                    t2m2flagelement.src="./ImageBackground/Teambattle/R2green.png"
                    t2m2element.style.color = 'white';
            
                }
                if(t2m2flag==0){
                    t2m2flagelement.src="./ImageBackground/Teambattle/R2red.png"
                    t2m2element.style.color = 'grey';
            
                }

                if(t2m3flag==1){
                    t2m3flagelement.src="./ImageBackground/Teambattle/R3green.png"
                    t2m1element.style.color = 'white';                                           //index/naming error
            
                }
                if(t2m3flag==0){
                    t2m3flagelement.src="./ImageBackground/Teambattle/R3red.png" 
                    t2m1element.style.color = 'grey';                                           //index/naming error
               
                }
            
               }    


       
        

    //}

 startlive();             // Start live updates for the game state
 setInterval(startlive,500);              // Set interval to repeatedly fetch and update the game state every 500ms
 logoloop();  // Call the logo loop animation function



 
 

}// init ends



//userfunction

function startupanmiation(){       // Function to handle startup animations for various elements
    gsap.from(".BG",{
        y:-35,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power3.out"
    })
    
    
    gsap.from("#roundBG",{
        y:-35,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    })
    
    gsap.from("#P1wrapper",{
        x:-30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    gsap.from("#P2wrapper",{
        x:+30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    
    gsap.from("#round",{
        y:-35,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    
    gsap.from(".score",{
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power1.out"
    })

    }

    // Function to resize text to fit inside a given container
function resizeTextToFit(element) {
   element.style.fontSize = `37px`;   //defaut fontsize of names


    const maxWidth = element.clientWidth;
    const maxHeight = element.clientHeight;
    const minFontSize = 8; // Minimum font size in pixels
    let fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
    let textFits = false;
 
    // Loop to gradually decrease font size until the text fits
    while (!textFits && fontSize > minFontSize) {
        element.style.fontSize = `${fontSize}px`;
        if (element.scrollWidth <= maxWidth && element.scrollHeight <= maxHeight) {
            textFits = true;
        } else {
            fontSize -= 1;
        }
    }

    // Apply the final font size
    element.style.fontSize = `${fontSize}px`;
}

 // Function to resize text to fit inside a given container exclusive for teambattle names
 function resizeTextToFitTB(element) {
    element.style.fontSize = `25px`;   //defaut fontsize of names
 
 
     const maxWidth = element.clientWidth;
     const maxHeight = element.clientHeight;
     const minFontSize = 8; // Minimum font size in pixels
     let fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
     let textFits = false;
  
     // Loop to gradually decrease font size until the text fits
     while (!textFits && fontSize > minFontSize) {
         element.style.fontSize = `${fontSize}px`;
         if (element.scrollWidth <= maxWidth && element.scrollHeight <= maxHeight) {
             textFits = true;
         } else {
             fontSize -= 1;
         }
     }
 
     // Apply the final font size
     element.style.fontSize = `${fontSize}px`;
 }
 


function teambattlestartupanimation(){   // Function to handle startup animations for teambattle elements

    gsap.from(".teambattleBG",{
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power1.out"})

    gsap.from("#leftTeam",{x:-30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"})
    
    gsap.from("#rightTeam",{
        x:+30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"})
}


// Function to handle the animation loop for logos
function logoloop(){
    var countlogo = document.getElementById( 
        'logowrapper').childElementCount; 

    
// If there is more than one logo
if(countlogo>1){
    const logoimg = document.getElementById('P1wrapper');
    var logo = gsap.timeline({repeat: -1, repeatDelay: 8});

     // Loop through each logo and animate its opacity
    for (var i = 1; i <= countlogo; i++) {
        idlogo="#logo" + i;


         // Animate logo appearance
        logo.from(idlogo, 
            {opacity: 0, 
            duration: 3,
            ease: "power1.in",
        });

        
            
// Animate logo disappearance after a delay
        logo.to(idlogo, 
    {opacity: 0, 
    duration: 3,
    delay:2,
    ease: "power1.out"});

    
      }




}
   

else{ // If there's only one logo

    
         // Animate single logo
        tloop.from("#logowrapper9", 
            {opacity: 0, 
            duration: 3,
            ease: "power1.in"});
            
 // Animate logo disappearance after a delay
        tloop.to("#logowrapper9", 
    {opacity: 0, 
    duration: 3,
    delay:2,
    ease: "power1.out"});

    }



}


//----------github.com/Y3S99-------------