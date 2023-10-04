document.getElementById('downloadBtn').addEventListener('click', function() {
    chrome.bookmarks.getTree(function(bookmarkTree) {
        let bookmarksText = "Title".padEnd(50, ' ') + "  URL\n";
        bookmarksText += "-".repeat(50) + "  " + "-".repeat(50) + "\n";
        bookmarksText += traverseBookmarks(bookmarkTree);
        let blob = new Blob([bookmarksText], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);
        
        chrome.runtime.sendMessage({ action: "downloadBookmarks", dataUrl: url }, (response) => {
            if (response && response.success) {
                console.log("Download initiated successfully.");
            }
            URL.revokeObjectURL(url); // Revoke the URL after the message is processed
        });
    });
});



  
function traverseBookmarks(bookmarkTree) {
    const maxTitleLength = 50;
    let result = '';

    for (let i = 0; i < bookmarkTree.length; i++) {
        if (bookmarkTree[i].url) {
            let title = bookmarkTree[i].title.substring(0, maxTitleLength);
            title = title.padEnd(maxTitleLength, ' ');
            result += `${title}  ${bookmarkTree[i].url}\n`;
        }
        if (bookmarkTree[i].children) {
            result += traverseBookmarks(bookmarkTree[i].children);
        }
    }
    return result;
}
