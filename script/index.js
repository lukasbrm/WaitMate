// Get HTML Elements
let homeDiv = document.getElementById("home");
let settingsDiv = document.getElementById("settings");
let button = document.getElementById("button");

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