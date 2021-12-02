// url validator
function ValidURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    $(".short_link").html("Please enter valid URL.");
    $(".result-box").css("display", "flex");
    $(".result-box").css("justify-content", "center");
    $(".result-box").css("background", "orange");
    $(".fa-copy").hide();
    $(".linkInput").val("");
    $(".qrlcode").html("");
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
                        if($(".show-msg")){
                            $(".show-msg").remove();
                        }
                        $(".short_link").html(response["short_link"]);
                        $(".result-box-short_link").css("display", "flex");
                        $(".result-box").css("background", "#6cac09");
                        $(".result-box").css("justify-content", "space-between");
                        $(".fa-copy").show();
                        linkInput.val("");
                        $(".qrlcode").html("");
                        $(".qrlcode").append(response["svg"]);

                    }else if(response["msg"]){
                        $(".short_link").html(response["msg"]);
                        $(".result-box").css("display", "flex");
                        $(".result-box").css("justify-content", "center");
                        $(".result-box").css("background", "red");
                        $(".fa-copy").hide();
                        linkInput.val("");
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
if(localStorage.getItem("theme") === null){
    localStorage.setItem("theme", "white");
}
if(localStorage.getItem("theme") === "dark"){
    $("header .navigation nav ul li a").addClass("dark");
    $("body").addClass("dark");
}
if(localStorage.getItem("theme") === "white"){
    $("header .navigation nav ul li a").removeClass("dark");
    $("body").removeClass("dark");
}
$(document).ready(function(){
    $(".dark-toggle-btn").on("click", function(){
        if(localStorage.getItem("theme") === "dark"){
            localStorage.setItem("theme", "white");
            $("header .navigation nav ul li a").removeClass("dark");
            $("body").removeClass("dark");
        }else{
            localStorage.setItem("theme", "dark");
            $("header .navigation nav ul li a").addClass("dark");
            $("body").addClass("dark");
        }
    });
});


// copy link in clipboard
$(document).ready(function(){
    $(".fa-copy").click(function(){
        let link = $(".short_link").text();
        console.log(link);
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