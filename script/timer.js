// Loading Timer
window.addEventListener('load', () =>
    {
        setTimeout(() =>
            {
                // Get hostname
                chrome.storage.local.set({domain: window.location.hostname});

                // Check filters
                isInFilters().then((isAllowed) => 
                    {
                        // Abort, if hostname not in filters
                        if(!isAllowed)
                        {
                            return;
                        }

                        const [navigation] = performance.getEntriesByType('navigation');
                        if(navigation)
                        {
                            const loadTime = navigation.loadEventEnd - navigation.startTime;
                            chrome.storage.local.get({totalLoadTime: 0}, (result) =>
                                {
                                    const newTotalLoadTime = result.totalLoadTime + loadTime;
                                    chrome.storage.local.set({totalLoadTime: newTotalLoadTime}, () => {});
                                }
                            );
                        }else
                        {
                            console.log("Navigation API not reachable");
                        }
                    }
                );
            }, 100);    
    }
);

function isInFilters() 
{
    return new Promise((resolve) => 
    {
        chrome.storage.local.get({ includedDomainKeywords: "", domain: "" }, (result) =>
        {
            // If list is empty, allow all
            if (result.includedDomainKeywords == "") 
            {
                resolve(true);
                return;
            }

            let keywords = result.includedDomainKeywords.trim().replace(' ', '').split(",");
            for (let i = 0; i < keywords.length; i++) 
            {
                if (result.domain.includes(keywords[i])) 
                {
                    resolve(true);
                    return;
                }
            }
            resolve(false);
        });
    });
}