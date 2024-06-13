// Get HTML Elements
let homeDiv = document.getElementById("home");
let settingsDiv = document.getElementById("settings");
let button = document.getElementById("button");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

// Display Wasted Time
chrome.storage.local.get({totalLoadTime: 0}, (result) =>
    {
        console.log(result.totalLoadTime);

        const timeSeconds = (result.totalLoadTime / 1000).toFixed(0);
        const timeMinutes = (timeSeconds / 60).toFixed(0);
        const timeHours = (timeMinutes / 60).toFixed(0);

        seconds.innerText = timeSeconds;
        minutes.innerText = timeMinutes;
        hours.innerText = timeHours;
    }
);


// Switch view from Settings to Home and back on Button click
document.getElementById("button").addEventListener("click", function()
{
    if(homeDiv.style.display == "none")
    {
        homeDiv.style.display = "block";
        settingsDiv.style.display = "none";
        button.innerText = "Settings";
    }else
    {
        homeDiv.style.display = "none";
        settingsDiv.style.display = "block";
        button.innerText = "Home";
    }
});

// Event Listener for Chrome messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
    {
        if(message.loadTime != null)
        {
            console.log(`Ladezeit: ${message.loadTime}`);
        }
    }
);