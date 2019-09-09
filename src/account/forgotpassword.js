$(document).ready(()=>{

});

$("#proceedButton").click(()=>{

    ui.input.disable();
    var em = $("#email").val();

    if(!em){
        ui.input.enable();
        ui.message.show("Please enter your email");
    } else {

        $.ajax({
            type:"POST",
            url:data.url.forgotPassword,
            success: res=>{
                console.log(res);
            }
        }).fail((e)=>{
            ui.input.enable();
            ui.message.show("Please check your connection");
            console.log({from:"submit email",content:e});
        });

    }

});