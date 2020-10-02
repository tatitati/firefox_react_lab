/* global browser */

class ServiceStorage {

    save() {

    }

    read(){
        if (typeof browser !== 'undefined') {
            browser.storage.sync.get(['domains'], function(domainsInStorage) {
                if('domains' in domainsInStorage){
                    return domainsInStorage.domains
                }
            });
        }
    }

}

export default ServiceStorage;