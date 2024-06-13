// Start of Loading
window.addEventListener("beforeunload", () =>
    {
        chrome.storage.local.set({startTime: new Date().getTime()}, () => {});
    }
);

// End of Loading
window.addEventListener('load', () =>
    {
        chrome.storage.local.set({endTime: new Date().getTime()}, () => {});

        chrome.storage.local.get({startTime: 0, endTime: 0}, (result) =>
            {
                const loadTime = result.endTime - result.startTime;
                chrome.storage.local.get({totalLoadTime: 0}, (result) =>
                    {
                        const newTotalLoadTime = result.totalLoadTime + loadTime;
                        chrome.storage.local.set({totalLoadTime: newTotalLoadTime}, () => {});
                    }
                );
            }
        );
    }
);