chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "downloadBookmarks") {
        chrome.downloads.download({
            url: message.dataUrl,
            filename: 'bookmarks.txt',
            saveAs: true
        }, (downloadId) => {
            sendResponse({ success: true });
        });
        return true; // Indicates the response will be sent asynchronously
    }
});