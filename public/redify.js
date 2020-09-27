const themes = {
    'live': {
        colors: {
            frame: "#CD3333"
        }
    }
};

browser.tabs.onHighlighted.addListener(event => update(event.tabIds[0]));
browser.tabs.onUpdated.addListener(tabId => update(tabId));

var currentTheme = null;

async function update(tabId) {
    let tab = await browser.tabs.get(tabId);

    if (tab.active == true && tab.highlighted == true) {
        let windowId = tab.windowId;
        var urlTab = tab.url;

        if (currentTheme == null) {
            currentTheme = await browser.theme.getCurrent();
        }

        var storedDomains = []
        browser.storage.sync.get(['domains'], function (result) {
            if ('domains' in result) {
                storedDomains = result.domains
            }

            console.log(storedDomains)

            var isLiveTab = false
            storedDomains.forEach(function (storedDomain) {
                if (urlTab.includes(storedDomain)) {
                    isLiveTab = true;
                }
            })

            if (isLiveTab) {
                browser.theme.update(windowId, themes.live);
            } else {
                browser.theme.update(windowId, currentTheme);
            }
        });





    }
}
  