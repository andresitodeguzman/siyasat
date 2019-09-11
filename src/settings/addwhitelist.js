$(document).ready(()=>{

});

$("#addButton").click(()=>{
    var u = $("#url").val();
    if(!u){
        ui.message.show("URL is required");
    } else {
        actions.whitelist.local.add({url:u},()=>{
            ui.message.show("The URL has been added");
        });
    }
})