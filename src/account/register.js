$(document).ready(()=>{

});

$("#registerButton").click(()=>{
    ui.input.disable();
    var fn = $("#first_name").val();
    var ln = $("#last_name").val();
    var em = $("#email").val();
    var co = $("#country").val();
    var u = $("#username").val();
    var p = $("#password").val();
    var cp = $("#confirm_password").val();

    if(!fn){
        ui.input.enable();
        ui.message.show("First name is needed");
    } else {
        if(!ln){
            ui.input.enable();
            ui.message.show("Last name is needed");
        } else {
            if(!em){
                ui.input.enable();
                ui.message.show("Email is needed");
            } else {
                if(!co){
                    ui.input.enable();
                    ui.message.show("Country is needed");
                } else {
                    if(!u){
                        ui.input.enable();
                        ui.message.show("Username is required");
                    } else {
                        if(!p){
                            ui.input.enable();
                            ui.message.show("Password is required");
                        } else {
                            if(!cp){
                                ui.input.enable();
                                ui.message.show("Please confirm your password");
                            } else {
                                if(cp !== p){
                                    ui.input.enable();
                                    ui.message.show("Passwords doesn't match");
                                } else {

                                    $.ajax({
                                        type:"POST",
                                        url:data.url.register,
                                        data: {
                                            first_name:fn,
                                            last_name: ln,
                                            email: em,
                                            country: co,
                                            username: u,
                                            password: p
                                        },
                                        success: res=>{
                                            res = JSON.parse(res);
                                            if(res.result == true){
                                                s.browser.storage.local.set({'user':res.user},()=>{
                                                    window.location.replace("../settings/index.html");
                                                });
                                            } else {
                                                ui.input.enable();
                                                ui.message.show(res.message);
                                            }
                                        }
                                    }).fail(e=>{
                                        ui.input.enable();
                                        ui.message.show("An error occurred");
                                        console.error({from:"register Action", content:e});
                                    });

                                }
                            }
                        }
                    }
                }
            }
        }
    }


});