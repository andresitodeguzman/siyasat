$(document).ready(()=>{
    $(".card").hide();
    $("#card1").slideDown();
});

$("#card1Button").click(()=>{
    $(".card").hide();
    $("#card2").fadeIn();
});
$("#card2Button").click(()=>{
    $(".card").hide();
    $("#card3").fadeIn();
});
$("#card2Button").click(()=>{
    window.location.replace('../settings/index.html');
});
