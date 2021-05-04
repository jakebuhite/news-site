$(document).ready(function(){
    $("body").css("display", "none");
    $("body").fadeIn(400); 
    $('a').click(function(e){
        redirect = $(this).attr('href');
        e.preventDefault();
        $('body').fadeOut(400, function(){
            document.location.href = redirect
        });
    });
})