// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var user = "02David03";

$("#user-form").submit(function(event){
    user = $("input").val();
    localStorage.setItem("login",user);
    alert("Transferido para os repositorios do úsuario " + user );
    location.reload();
    event.preventDefault();
});


if(localStorage.getItem("login"));
else localStorage.setItem("login",user);