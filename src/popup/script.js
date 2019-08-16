const s1 = [
    {
        id:"fc1",
        title:"Vera Files",
        color:"#115671",
        textColor:"",
        url:"https://verafiles.org/results?query="
    },
    {
        id:"fc2",
        title:"Rappler",
        color:"#E76229",
        textColor:"",
        url:"https://www.rappler.com/?option=com_rappler&task=search&language=english&q="
    },
    {
        id:"fc3",
        title:"Snopes",
        color:"#FBD440",
        textColor:"",
        url:"https://www.snopes.com/?s="
    }
];
const s2 = [
    {
        id:"fc4",
        title:"Associated Press",
        color:"#FF322E",
        textColor:"",
        url:"https://www.ap.org/en-us/search?q="
    },
    {
        id:"fc5",
        title:"FactCheck.org",
        color:"#AA2229",
        textColor:"",
        url:"https://www.factcheck.org/search/?q="
    },
    {
        id:"fc6",
        title:"PolitiFact",
        color:"#496DA5",
        textColor:"",
        url:"https://www.politifact.com/search/?q="
    }
];

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
    s1.forEach(obj=>{
       var tpl = `
		<a href="${obj.url}${encodeURIComponent(siteTitle)}" target="_blank" class="btn" style="width:100%; background-color: ${obj.color}; color:white;">
         	${obj.title}
		</a>
	   `; 
        $("#c1").append(tpl);
    });
    s2.forEach(obj=>{
        var tpl = `
		<a href="${obj.url}${encodeURIComponent(siteTitle)}" target="_blank" class="btn" style="width:100%; background-color: ${obj.color}; color:white;">
         	${obj.title}
		</a>
	   `; 
        $("#c2").append(tpl);
    });
});

$("#reportSiteButton").click(()=>{
    $(".activity").hide();
    $("#reportUrl").fadeIn();
});