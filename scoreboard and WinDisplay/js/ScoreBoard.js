
window.onload=init;                               // When the window finishes loading, the init function is executed



function init(){              // Main initialization function

      // Set initial startup flag
    var startup=true;

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
    
        // Start the live data fetch process
    function startlive(){

    

        fetch("./StreamControl/streamcontrol.json")            //Using the fetch() API to Read local JSON file from steamcontrol(JSON parsing)
        .then(response => response.json())             // Parse the JSON response
        .then(data => showInfo(data));        // Call showInfo with the parsed data           
        
        
            function showInfo(data) {


                 // Extract relevant data from the fetched JSON
                var p1Name = data.p1Name;
                var p2Name = data.p2Name;
                var p1Team = data.p1Team;
                var p2Team = data.p2Team;
                var p1Score = data.p1Score;
                var p2Score = data.p2Score;
                var round = data.round;

                
                
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
                
                    resizeTextToFitround(roundwrap);    // Adjust text size to fit the available space
                    resizeTextToFitpname(p1textwrapper);
                    resizeTextToFitpname(p2textwrapper);
                    
                    startupanmiation();    // Trigger animation for the first load
                    startup=false;          // Set the startup flag to false to indicate it's no longer the first load
                    
            
                }
                else{      // For subsequent updates after the first load               
                        
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
                                resizeTextToFitpname(p1textwrapper); // Resize text after updating
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
                                resizeTextToFitpname(p2textwrapper);
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
                                resizeTextToFitround(roundwrap);  // Resize round text after updating
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
                                p1scoreelement.innerHTML=p1Score; // Update score
                                
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
                                p2scoreelement.innerHTML=p2Score; // Update score
                                
                            }
                        })
                        

                        gsap.to("#P2score",{
                            opacity: 1,
                            duration: 1,
                            delay:0.2,
                            ease: "power1.out"
                        })

                    }
                }
                
            
            }

       
        

    }

 startlive();   // Start live updates for the game state
 setInterval(startlive,500);  // Set interval to repeatedly fetch and update the game state every 500ms
 logoloop();  // Call the logo loop animation function

 

}

function startupanmiation(){      // Function to handle startup animations for various elements
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

    // Function to resize text to fit inside a given container player name
function resizeTextToFitpname(element) {

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

 // Function to resize text to fit inside a given container player name
function resizeTextToFitpnameround(element) {

      element.style.fontSize = `25px`;   //defaut fontsize of round
      
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
