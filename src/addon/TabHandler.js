import React from 'react';
import ReactDOM from 'react-dom';

/* global browser */
export default async function handlerTab(tabId) {
        console.log("tabhandler: handling......")
        var currentTheme = null
        const themes = {
            'live': {
                colors: {
                    frame: "#CD3333"
                }
            }
        };
        var domains = []
        if (typeof browser !== 'undefined') {
            browser.storage.sync.get(['domains'], function (result) {
                if ('domains' in result) {
                    domains = result.domains
                }
            });

            console.log("tabHandler: tab activated")
            console.log(domains)
            if (currentTheme == null) {
                currentTheme = await browser.theme.getCurrent();
            }

            let tab = await browser.tabs.get(tabId);
            let windowId = tab.windowId;
            var url = tab.url;

            if (tab.active) {
                var isLiveTab = false
                domains.foreach(domain => function () {
                    if (domain.test(url)) {
                        isLiveTab = true;
                    }
                })

                if (isLiveTab) {
                    browser.theme.update(windowId, themes.live);
                } else {
                    browser.theme.update(windowId, currentTheme);
                }
            }
        }
}

// export default TabHandler;