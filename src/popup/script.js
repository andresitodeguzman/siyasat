var siteTitle = "Untitled";
var siteUrl = "https://google.com";

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var activeTab = tabs[0];
	var activeTabId = activeTab.id; // or do whatever you need
    siteTitle = activeTab.title;
    siteUrl = activeTab.url;
	$(".title").html(activeTab.title);
	$(".url").html(activeTab.url);
});

$(document).ready(()=>{
    $(".activity").hide();
    $("#factCheck").show();
    var browser = null;
    try {
		if (chrome) browser = chrome;
    	if (firefox) browser = firefox;
    } catch(e){
        console.log('cannot get browser');
    }

    browser.storage.local.get(['local-organization'],res=>{
        if(res['local-organization']){
            res['local-organization'].forEach(obj=>{
                var tpl = `
                    <a href="${obj.url}${encodeURIComponent(siteTitle)}" target="_blank" class="btn" style="width=100%; background-color: ${obj.color}; color:${obj.text_color};">
                        ${obj.name}
                    </a>                    
                `;
                $("#c1").append(tpl);
            });
        }
    });

});

$("#reportSiteButton").click(()=>{
    $(".activity").hide();
    $("#reportUrl").fadeIn();
});