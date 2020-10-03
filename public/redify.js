const themes = {
    'live': {
        colors: {
            frame: "#CD3333"
        }
    }
};

browser.tabs.onUpdated.addListener(handleUpdatedTab);

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

async function reopentTabInLiveContainerIfNeeded(windowid, tab, isChangeToLive){
    if(isChangeToLive && tab.cookieStoreId != "firefox-container-6") {
        await browser.tabs.remove(tab.id)
        await browser.tabs.create({
            cookieStoreId: "firefox-container-6",
            url: tab.url,
            index: tab.index
        })
    } else if(!isChangeToLive && tab.cookieStoreId == "firefox-container-6"){
        await browser.tabs.remove(tab.id)
        await browser.tabs.create({
            cookieStoreId: "firefox-default",
            url: tab.url,
            index: tab.index
        })
    }
}

// async function handleUpdatedTab(tabId, changeInfo, tab) {
//     let windowId = tab.windowId;
//
//     await readOriginalTheme()
//
//     if (changeInfo.hasOwnProperty('url')) {
//         let isChangeToLive = await checkIfLive(changeInfo.url)
//         await reopentTabInLiveContainerIfNeeded(windowId, tab, isChangeToLive)
//         updateTheme(windowId, isChangeToLive)
//     } else {
//         let isLiveTab = await checkIfLive(tab.url)
//         updateTheme(windowId, isLiveTab)
//     }
//
//
// }

async function handleUpdatedTab(tabId, changeInfo, tab) {
    let windowId = tab.windowId;

    await readOriginalTheme()
    
    let isLiveTab = await checkIfLive(tab.url)
    updateTheme(windowId, isLiveTab)
}
  