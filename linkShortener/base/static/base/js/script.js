// url validator
function ValidURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    $(".short_link").html("Please enter valid URL.");
    $(".result-box").css("display", "flex");
    $(".result-box").css("justify-content", "center");
    $(".result-box").css("background", "orange");
    $(".fa-copy").hide();
    return false;
  } else {
    return true;
  }
}


// boom
$(document).ready(function(){
    $(".drop").on("click", function(event){
        event.preventDefault();
        
        let linkInput = $(".linkInput");
        const myForm = $(".myform");
        const csrf = document.getElementsByName('csrfmiddlewaretoken');


        if (ValidURL(linkInput.val())){
            $.ajax({
                url : myForm.attr("action"),
                method : 'POST',
                data : {
                    "link" : linkInput.val(),
                    "csrfmiddlewaretoken" : csrf[0].value,
                },
                success : function(response){
                    if(response["short_link"]){
                        $(".short_link").html(response["short_link"]);
                        $(".result-box-short_link").css("display", "flex");
                        $(".result-box").css("background", "#6cac09");
                        $(".result-box").css("justify-content", "space-between");
                        $(".fa-copy").show();
                        
                    }else if(response["msg"]){
                        $(".short_link").html(response["msg"]);
                        $(".result-box").css("display", "flex");
                        $(".result-box").css("justify-content", "center");
                        $(".result-box").css("background", "red");
                        $(".fa-copy").hide();
                    }
                    
                },
                error : function(error){
                    alert("Error!");
                },
            })
        }
    });
});


// dark mode handler
$(document).ready(function(){
    $(".dark-toggle-btn").on("click", function(){
        $("header .navigation nav ul li a").toggleClass("dark");
        $(".slim-first-section .content").toggleClass("dark");
    });
});


// copy link in clipboard
$(document).ready(function(){
    $(".fa-copy").on("click", function(){
        let link = $(".short_link").text();

        navigator.clipboard.writeText(link).then(
            function(){
                $(".copy-msg").addClass("copy-msg-set");   
                setTimeout(function(){
                    $(".copy-msg").removeClass("copy-msg-set");
                }, 3000);
            }
        )
    });
});