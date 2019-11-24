$(document).ready(function () {
    const base_url = "http://localhost:3000/api/";
    const base_url_image = "http://localhost:3000/static/images/";
    read();
    function read() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: base_url + "read",
            dataType: "json",
            success: function (result) {
                var res = result.data.split(";");
                $("#avatar_1").attr("src",base_url_image + res[3]);
                $("#avatar_2").attr("src",base_url_image + res[3]);
                $("#avatar_3").attr("src",base_url_image + res[3]);
                $("#name_admin").text(res[4]);
                $("#name_admin_2").text(res[4]);
                $("#name_admin_3").text(res[4]);

                if(res[2] === "admin"){
                    admin(res[0],res[1]);
                }else{
                    user(res[0],res[1]);
                }
                $("#iddd").val(res[0]);
                
            },
            error: function (event) {
                console.log("Error read" + event);
            }
        });
    }

    function admin(id, email) {
        $("#category_sidebar").show();
        $("#home_category").show();
        $("#employee_sidebar").show();
        $("#home_employee").show();
        $("#statistical").show();
        $("#home_statistical").show();
    }

    function user(id, email) {
        $("#category_sidebar").hide();
        $("#home_category").hide();
        $("#employee_sidebar").hide();
        $("#home_employee").hide();
        $("#statistical").hide();
        $("#home_statistical").hide();
    }
});