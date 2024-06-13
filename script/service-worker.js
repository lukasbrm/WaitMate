chrome.webNavigation.onCompleted.addListener((details) => 
{
    chrome.scripting.executeScript(
        {
            target: {tabId: details.tabId},
            files: ['script/timer.js']
        }
    );
});