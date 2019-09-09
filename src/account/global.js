var data = {
    url: {
        login:"https://google.com",
        forgotPassword:"https://google.com"
    }
};

var ui = {
    message: {
        show(msg){
            $("#messageBoxContent").html(msg);
            $("#messageBox").slideDown();        
        }
    },

    input: {
        disable(){
            $("input").prop("disabled", true);
            $("#withContent").hide();
            $(".card-action").hide();
            $(".btn").fadeOut();
            $("#loader").fadeIn();
        },
        enable(){
            $("input").prop("disabled", false);
            $("#loader").hide();
            $(".card-action").fadeIn();
            $("#withContent").fadeIn();
            $(".btn").fadeIn();
        }
    }
};

$(document).ready(()=>{
    $("#messageBox").hide();
    $(".container").slideDown();
});
