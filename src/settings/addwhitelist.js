$(document).ready(()=>{

});

$("#addButton").click(()=>{
    var u = $("#url").val();
    if(!u){
        ui.message.show("URL is required");
    } else {
        actions.whitelist.local.add({url:u}).then(()=>{
            $("#url").val("");
            ui.message.show(`The URL "${u}" has been added`);
        });
    }

});