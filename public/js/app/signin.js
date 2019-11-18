$(document).ready(function () {
    const base_url = "http://localhost:3000/api/";
    function write(note) {
        var note ={"note" : note};
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: base_url + "write",
            data: JSON.stringify(note),
            dataType: "json",
            success: function (result) {
                console.log("Success write");
                window.location.href = "/admin";
            },
            error: function (event) {
                console.log(JSON.stringify(note))
                console.log("Error write" + event.mes);
            }
        });
    }

    function getDetail(email) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: base_url + "employee/" + email,
            dataType: "json",
            success: function (result) {
                var id = result[0].Id;
                var name = result[0].Email;
                var role = result[0].Role;
                var image = result[0].Image;
                var fullname = result[0].Fullname;
                var note = id + ";" + name + ";" + role + ";" + image + ";"+fullname;
                write(note);
            },
            error: function (event) {
                alert("Error get employee");
            }
        });
    }
    $('#btnLogin').click(function (event) {
        event.preventDefault();
       
        var mes = {
            "Email": $("#email").val(),
            "Password": $("#password").val()
        };
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: base_url + "employee/check",
            data: JSON.stringify(mes),
            dataType: "json",
            success: function (result) {
                if (result.mes === "null") {
                    alert("Xin vui lòng kiểm tra tài khoản hoặc mật khẩu");
                    return;
                } else {
                    var email = $("#email").val();
                    getDetail(email);
                }
            },
            error: function (event) {
                alert("Error Login");
            }
        });
    });
});