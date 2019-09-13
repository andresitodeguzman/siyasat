/* Sample mock data */
var data = {};
data.blocklist = [
    {
        url: ".blogspot.com",
        category: "blog"
    },
    {
        url: ".wordpress.com",
        category: "blog"
    },
    {
        url: "/opinion",
        category: "opinion"
    },
    {
        url: "/Opinion",
        category: "opinion"
    }
];

const s = {

    browser: chrome,
    data:{},

    setBrowser() {
        return new Promise((resolve, reject) => {
            try {
                if (chrome) this.browser = chrome;
                if (firefox) this.browser = firefox;
            } finally {
                resolve();
            }
        });
    },

    isBlackListed(url) {
        var is_b = {result: false};
        data.blocklist.forEach(obj => {
            if(url.includes(obj.url)) is_b = {obj:obj, result:true};
        });
        if (is_b.result == true) {
            if (url.includes("/search?")){
            	is_b.result = false;
				return is_b;
            }
            return is_b;
        } else {
            is_b.result = false;
            return is_b;
        }
    }

};


// Detect and set browser
s.setBrowser();
s.data = data;
// Do something when installed
s.browser.runtime.onInstalled.addListener(function() {});

s.browser.tabs.onUpdated.addListener((tid, ci, tab) => {
    var protocol = tab.url.split(":")[0];
    if(ci.status == "complete") {
        var is_b = s.isBlackListed(tab.url);
       /* if(protocol == "http") {
            s.browser.tabs.executeScript(tid, {
                file: 'banner/insecure.js'
            });
        }*/
        if(is_b.result == true) {
            if(is_b.obj.category == "blog") s.browser.tabs.executeScript(tid, { file: 'banner/blog.js' });
            if(is_b.obj.category == "opinion") s.browser.tabs.executeScript(tid, { file: 'banner/opinion.js' });
        }

    }
});

s.browser.contextMenus.create({
    id: "report_link",
    title: "Report link",
    contexts: ["link"]
});

s.browser.contextMenus.create({
    id: "fact_check",
    title: "Fact Check",
    contexts: ["selection"]
});


var submenuCreation = (parent_id, contexts, array) => {
    array.map(obj => {
        obj.title = obj.name;        
        obj.parentId = parent_id;
        obj.contexts = contexts;
        obj.onclick = (info,tab)=>{
            s.browser.tabs.create({
                url: `${obj.url}${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        };
        delete obj.short_name;
        delete obj.category;
        delete obj.color;
        delete obj.text_color;
        delete obj.timestamp_created;
        delete obj.timestamp_modified;
        delete obj.region;
        delete obj.icon;
        delete obj.name;
        delete obj.url;
        return obj;
    })
    array.forEach(obj => {
        try {
            s.browser.contextMenus.create(obj);
            console.log(obj);
        } catch(e){
            console.error(e);
        }
    })
}

s.browser.storage.local.get(['local-organization'],res=>{
    if(res['local-organization']){
        submenuCreation("fact_check", ["selection"],res['local-organization']);
    }
});


s.browser.storage.onChanged.addListener((changes,location)=>{
    if(location == "local"){
        s.browser.contextMenus.remove("fact_check");
        s.browser.contextMenus.create({
            id: "fact_check",
            title: "Fact Check",
            contexts: ["selection"]
        });
        s.browser.storage.local.get(['local-organization'],res=>{
            if(res['local-organization']){
                submenuCreation("fact_check", ["selection"],res['local-organization']);
            }
        })
    }
})