// Loading Timer
window.addEventListener('load', () =>
    {
        setTimeout(() =>
            {
                const [navigation] = performance.getEntriesByType('navigation');
                if(navigation)
                {
                    const loadTime = navigation.loadEventEnd - navigation.startTime;
                    console.log(loadTime);
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

            }, 100);    
    }
);