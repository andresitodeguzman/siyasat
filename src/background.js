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

data.contextMenu = [{
        id: "report_link",
        title: "Report Link",
        contexts: ["link"],
        child: [
            {
                id: "report_link_a",
                title: "Misleading"
            },
            {
                id: "report_link_b",
                title: "Scam"
            }
        ]
	},
	{
    	id:"search_news",
        title:"",
        contexts:[""],
        child:[]
    },
    {
        id: "fact_check",
        title: "Fact Check",
        context: ["selection"],
        child: [

        ]
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
        if(protocol == "http") {
            s.browser.tabs.executeScript(tid, {
                file: 'banner/insecure.js'
            });
        }
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

s.browser.contextMenus.create({
    id: "search_news",
    title: "Search in News Sources",
    contexts: ["selection"]
});

var submenuCreation = (parent_id, contexts, array) => {
    array.map(obj => {
        obj.parentId = parent_id;
        obj.contexts = contexts;
        return obj;
    })
    array.forEach(obj => {
        s.browser.contextMenus.create(obj);
    })
}

submenuCreation("fact_check", ["selection"], [{
        id: "fact_check_verafiles",
        title: "Check with Vera Files",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://verafiles.org/results?query=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    },
    {
        id: "fact_check_mediabias",
        title: "Check with Media Bias/Fact Check",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://mediabiasfactcheck.com/?s=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    },
    {
        id: "fact_check_polygraph",
        title: "Check with Polygraph.info",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://www.polygraph.info/s?tab=all&pi=1&r=any&pp=10&k=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    },
    {
        id: "fact_check_politifact",
        title: "Check with PolitiFact",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://www.politifact.com/search/?q=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    },
    {
        id: "fact_check_factcheck",
        title: "Check with FactCheck.org",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://www.factcheck.org/search/?q=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    },
    {
        id: "fact_check_usafacts",
        title: "Check with USAFacts",
        onclick: (info, tab) => {
            s.browser.tabs.create({
                url: `https://usafacts.org/search?query=${encodeURIComponent(info.selectionText)}`,
                active: true
            })
        }
    }
]);

submenuCreation("search_news", ["selection"], [{
    id: "search_news_ap",
    title: "Search in Associated Press",
    onclick: (info, tab) => {
        s.browser.tabs.create({
            url: `https://www.ap.org/en-us/search?q=${encodeURIComponent(info.selectionText)}`,
            active: true
        })
    }
}]);