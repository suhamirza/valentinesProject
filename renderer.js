// titlebar 
document.getElementById("minimize-btn").addEventListener("click", () => {
    window.electron.send("window-minimize");
});

document.getElementById("exit-btn").addEventListener("click", () => {
    window.electron.send("window-close");
});



// navigations
function navigateToStart() {
    if (window.electron && window.electron.navigate) {
        window.electron.navigate('index.html');
    } else {
        console.error("Electron API not available");
    }
}
function navigateToReasons() {
    if (window.electron && window.electron.navigate) {
        window.electron.navigate('reasons.html');
    } else {
        console.error("Electron API not available");
    }
}
function navigateToProposal() {
    if (window.electron && window.electron.navigate) {
        window.electron.navigate('proposal.html');
    } else {
        console.error("Electron API not available");
    }
}
// sound function 

function playSoundAndDo(soundId, action) {
    let sound = document.getElementById(soundId);
    
    if (!sound) {
        console.error("Sound not found!");
        action(); // Just do the action if no sound
        return;
    }

    sound.currentTime = 0;
    sound.volume = 1.0;

    let playPromise = sound.play();

    if (playPromise !== undefined) {
        playPromise.then(() => setTimeout(action, 300)).catch(() => action());
    } else {
        action();
    }
}

// reasons page
const reasons = [
    "Place your text here",
    "Place your text here place your text here",
    "Place your text here",
    "Place your text here",
    "Place your text here place your text here",
    "Place your text here place your text here place your text here",
    "Place your text here",
    "Place your text here",
    "Place your text here place your text here"
];


let typingTimeout; // For typing effect
let closeTimeout; // For closing the speech bubble
let currentIndex = 0;
let isTyping = false;

function showReason(index) {
    const speechBubbleContainer = document.getElementById("speech-bubble-container");
    const speechBubble = document.getElementById("speech-bubble");
    const text = reasons[index - 1]; // Get text to display
    const typingSpeed = 50; // Speed of typing (ms per letter)

    // Stop any existing timeouts to prevent overlapping
    clearTimeout(typingTimeout);
    clearTimeout(closeTimeout);
    currentIndex = 0;
    isTyping = false;

    // Reset text before starting the effect
    speechBubble.textContent = "";

    function typeText() {
        if (currentIndex < text.length) {
            speechBubble.textContent += text[currentIndex];
            currentIndex++;

            // **Restart the sound manually if it stops playing**
            let sound = document.getElementById("typingSound");
            if (sound && sound.paused) {
                sound.currentTime = 0; // Restart sound
                sound.play().catch((error) => console.warn("Sound play issue:", error));
            }

            typingTimeout = setTimeout(typeText, typingSpeed);
        } else {
            isTyping = false;

            // **Stop typing sound once text is fully typed**
            let sound = document.getElementById("typingSound");
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }

            // Close speech bubble after 2 seconds *only* after typing ends
            closeTimeout = setTimeout(() => {
                speechBubbleContainer.classList.remove("visible");
            }, 2000);
        }
    }

    function startTyping() {
        isTyping = true;

        // **Start typing sound loop before typing begins**
        let sound = document.getElementById("typingSound");
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch((error) => console.warn("Sound play issue:", error));
        }

        typeText();
    }

    // **Use playSoundAndDo() to start sound, then start typing**
    playSoundAndDo("typingSound", startTyping);

    // Show speech bubble
    speechBubbleContainer.classList.add("visible");

    // Calculate total typing duration and set close timeout safely
    const totalTypingTime = text.length * typingSpeed + 1000; // Extra 1s delay
    closeTimeout = setTimeout(() => {
        if (!isTyping) {
            speechBubbleContainer.classList.remove("visible");
        }
    }, totalTypingTime);
}

// proposal page

function moveNo() {
    const myNo = document.getElementById("myNo");
    const myYes = document.getElementById("myYes");
    myNo.style.position = "absolute";
    myNo.style.position = "fixed";
    myNo.style.left = `${Math.random() * 80 + 10}%`;
    myNo.style.top = `${Math.random() * 80 + 10}%`;
}

// hearts animation

// Function to create a falling heart
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💜"; // Heart emoji
    heart.style.left = `${Math.random() * 100}%`; // Random horizontal position
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
    document.getElementById("hearts-container").appendChild(heart);
  
    // Remove the heart after it falls
    setTimeout(() => {
      heart.remove();
    }, 5000); // Match the animation duration
  }
  
  // Function to start the falling hearts
  function startHearts() {
    setInterval(createHeart, 300); // Create a new heart every 300ms
  }
  
  const kekoSpeaking = document.getElementById("kekoSpeaking");
  // Trigger falling hearts when "Yes" is clicked
  function sayYes() {
    startHearts();
    kekoSpeaking.src = "pictures/yay.gif";
  }
