$(document).ready(function () {
    $('#btnLogin').click(function (event) {
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:3000/api/admin/check" + email + "/" + password,
            dataType: "json",
            success: function (data) {
                var username  = data.response[0].username;
                if(username === "null"){
                    window.location.href = "./404";
                }else{
                    window.location.href = "./home";
                }
            },
            error: function (event) {
                window.location.href = "./404";
            },
            done: function (e) {
                window.location.href = "./405";
            }
        });

    });

});