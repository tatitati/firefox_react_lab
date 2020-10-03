const themes = {
    'live': {
        colors: {
            frame: "#CD3333"
        }
    }
};

browser.tabs.onHighlighted.addListener(event => handleThemeTab(event.tabIds[0]));
browser.tabs.onUpdated.addListener(tabId => handleThemeTab(tabId));

var originalTheme = null;

async function readOriginalTheme(){
    if (originalTheme == null) {
        current = await browser.theme.getCurrent();
        if (current != themes.live) {
            originalTheme = current
        }
    }

}

async function checkIfLive(urlTab){
    let result = await browser.storage.sync.get(['domains'])
    if ('domains' in result) {
        storedDomains = result.domains
    }

    let isLiveTab = false
    storedDomains.forEach(function (storedDomain) {
        if (urlTab.includes(storedDomain)) {
            isLiveTab = true;
        }
    })

    return isLiveTab
}

function updateTheme(windowId, isLive){
    if (isLive) {
        browser.theme.update(windowId, themes.live);
    } else {
        delete originalTheme.images // problem with images when restoring
        browser.theme.update(windowId, originalTheme);
    }
}

async function handleThemeTab(tabId) {
    let tab = await browser.tabs.get(tabId);

    if (tab.active == true && tab.highlighted == true) {
        let windowId = tab.windowId;

        await readOriginalTheme()
        let isLiveTab = await checkIfLive(tab.url)
        updateTheme(windowId, isLiveTab)
    }
}

// async function handleUpdated(tabId, changeInfo, tab) {
//     if (changeInfo.hasOwnProperty('url')) {
//         let windowId = tab.windowId;
//
//         readOriginalTheme()
//
//         browser.storage.sync.get(['domains'], function (result) {
//             if ('domains' in result) {
//                 storedDomains = result.domains
//             }
//
//             isLiveTab = false;
//             if(tab.cookieStoreId != "firefox-container-6"){
//                 storedDomains.forEach(function (storedDomain) {
//                     if (tab.url.includes(storedDomain)) {
//                         isLiveTab = true;
//                     }
//                 })
//
//                 if (isLiveTab) {
//                     browser.tabs.remove(tab.id).then(function(){
//                         browser.tabs.create(
//                             {
//                                 cookieStoreId: "firefox-container-6",
//                                 url: tab.url
//                             }
//                         )
//
//                         console.log("upadting theme...")
//                         browser.theme.update(windowId, themes.live);
//                     })
//
//                 } else {
//                     delete originalTheme.images // problem with images when restoring
//                     browser.theme.update(windowId, originalTheme);
//                 }
//             }
//         });
//     }
// };

  