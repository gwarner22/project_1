/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
   document.body.classList.toggle("dark-mode");
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
// and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);





/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here


const rsvpButton = document.getElementById("rsvp-button");
let count = 3;


    // Step 2: Write your code to manipulate the DOM here
      
    // Add the new participant
    
   const addParticipant = (person) => {
  // Add the new participant
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🎟️ ${person.name} from ${person.state} (${person.email}) has RSVP'd.`;

    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    // Replace the old counter with an updated one
    const rsvpCount = document.getElementById("rsvp-count");
    rsvpCount.remove();

    count = count + 1;

    const newCount = document.createElement("p");
    newCount.id = "rsvp-count";
    newCount.textContent = "⭐ " + count + " people have RSVP'd to this event!";

    participantsDiv.appendChild(newCount);
}

// Step 3: Add a click event listener to the submit RSVP button here








/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value,
    state: rsvpInputs[1].value,
    email: rsvpInputs[2].value
  };

  // Name
  if (person.name.trim().length < 2) {
    containsErrors = true;
    rsvpInputs[0].classList.add("error");
  } else {
    rsvpInputs[0].classList.remove("error");
  }

  // State
  if (person.state.trim().length < 2) {
    containsErrors = true;
    rsvpInputs[1].classList.add("error");
  } else {
    rsvpInputs[1].classList.remove("error");
  }

  // Email (at least 2 characters and an @)
  if (person.email.trim().length < 2 || !person.email.includes("@")) {
    containsErrors = true;
    rsvpInputs[2].classList.add("error");
  } else {
    rsvpInputs[2].classList.remove("error");
  }

  // If no errors, add the participant and clear the fields
  if (containsErrors == false) {
    addParticipant(person);
     toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
}

rsvpButton.addEventListener('click', validateForm);
  

/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            revealableContainers[i].classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            revealableContainers[i].classList.remove('active');
        }
    }
}

const reduceMotionButton = document.getElementById('reduce-motion-button');

const reduceMotion = () => {
    document.body.classList.toggle('reduce-motion');
};
reduceMotionButton.addEventListener('click', reduceMotion);
reveal();
// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', reveal);

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
  let intervalId = setInterval(animateImage, 500);
    let modal = document.getElementById("success-modal");
    let modalContent = document.getElementById("modal-text");

    modal.style.display = "flex";

    modalContent.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;

    // Set modal timeout to 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}

// 2. Close button code goes HERE, outside toggleModal
const closeModalButton = document.getElementById("close-modal-button");

const closeModal = () => {
    document.getElementById("success-modal").style.display = "none";
}

closeModalButton.addEventListener("click", closeModal);

// 3. Animation code

let rotateFactor = 0;

const animateImage = () => {
    let modalImage = document.getElementById("modal-img");

    // If Reduce Motion is on, keep the image still and skip the animation
    if (document.body.classList.contains("reduce-motion")) {
        modalImage.style.transform = "none";
        return;
    }
    // Alternate between 0 and -10 degrees
    if (rotateFactor == 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
// apply the angle to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

