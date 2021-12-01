$(document).ready(function(){
    $(".dark-toggle-btn").on("click", function(){
        $("header .navigation nav ul li a").toggleClass("dark");
        $(".slim-first-section .content").toggleClass("dark");
    });
});