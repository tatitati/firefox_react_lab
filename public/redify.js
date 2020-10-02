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

async function handleThemeTab(tabId) {
    let tab = await browser.tabs.get(tabId);

    if (tab.active == true && tab.highlighted == true) {
        let windowId = tab.windowId;
        var urlTab = tab.url;

        if (originalTheme == null) {
            current = await browser.theme.getCurrent();
            if (current != themes.live) {
                originalTheme = current
            }
        }

        var storedDomains = []
        browser.storage.sync.get(['domains'], function (result) {
            if ('domains' in result) {
                storedDomains = result.domains
            }

            var isLiveTab = false
            storedDomains.forEach(function (storedDomain) {
                if (urlTab.includes(storedDomain)) {
                    isLiveTab = true;
                }
            })

            if (isLiveTab) {
                browser.theme.update(windowId, themes.live);
            } else {
                delete originalTheme.images // problem with images when restoring
                browser.theme.update(windowId, originalTheme);
            }
        });
    }
}
  