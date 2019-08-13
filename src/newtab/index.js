$(document).ready(()=>{
    var d = new Date();
    var time = d.getHours();

    if(time < 12){
        // morning
        $("#homeGreet").html("Good Morning");
    } else {
        if(time == 12){
            // noon
            $("#homeGreet").html("Good Day");
        } else {
            if(time <= 18){
                // afternoon
                $("#homeGreet").html("Good Afternoon");
            } else {
                //evening
                $("#homeGreet").html("Good Evening");
            } // <6
        }// == 12
    } // < 12
    
    setTime(); 
	setInterval(()=>{ setTime(); },1000);
    howToSpot.forEach(obj=>{
       var tpl = `<div class="card"><div class="card-content"><h5><b>${obj.title}</b></h5><p>${obj.content}</p></div></div>`;
       $("#howToContainer").append(tpl); 
    });
});

var setTime = ()=>{
	$("#time").html((new Date()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));    
}


chrome.topSites.get(items=>{
    //items.pop();
    items.forEach(item=>{
        var tpl = `
			<a href="${item.url}" class="topSite">
				${item.title}
			</a>
		`;
        $("#topSitesContainer").append(tpl);
    });
});
