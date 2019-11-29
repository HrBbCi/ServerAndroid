$(document)
    .ready(
        function () {
            //Load 
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
						if(res[3].length ===0||res[3]===null|| res[3] ==="null"){
							res[3] = "icon_avatar.png";
						}
                        $("#avatar_1").attr("src", base_url_image + res[3]);
                        $("#avatar_2").attr("src", base_url_image + res[3]);
                        $("#avatar_3").attr("src", base_url_image + res[3]);
                        $("#name_admin").text(res[4]);
                        $("#name_admin_2").text(res[4]);
                        $("#name_admin_3").text(res[4]);

                        if (res[2] === "admin") {
                            admin(res[0], res[1]);
                        } else {
                            user(res[0], res[1]);
                        }

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

            $('#btnSubmit').click(function (event) {
                event.preventDefault();

                if (validate()) {
                    var TypeO = $('#typep').val();
                    //Get Date now
                    var d = new Date();
                    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
                        " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
                    var notify = {
                        CustomerId: $("#CustomerId").val(),
                        Notify: $("#Notify").val(),
                        TypeO: TypeO,
                        Date: datestring
                    };

                    addNotify(notify);

                } else {
                    alert("Fail Save Notify");
                }
            });

            function validate() {               
                var Notify = $('#Notify').val();
                // var Date = $('#Date').val();
               
                if (Notify === null || Notify.length === 0 || Notify === "null") {
                    alert("Incorrect Notify");
                    return false;
                }
                // if (Date === null || Date.length === 0 || Date === "null") {
                    // alert("Incorrect Date");
                    // return false;
                // }
                
                return true;
            }
			loadOption();

			function loadOption() {

				$
					.ajax({
						type: "GET",
						contentType: "application/json",
						url: base_url + "customer/listID",
						dataType: "json",
						success: function (result) {
							var html = "";
							$("#typep").append('<option value="All" selected="true">All</option>');
							$.each(result, function (index, item) {
								$('<option>', {
									value: item.Id,
								}).html(item.Id).appendTo("#typep");
							})
						},
						error: function (event) {
							alert("Error Get Category");
						}

					});

			}

            function addNotify(notify) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: base_url + "notify",
                    data: JSON.stringify(notify),
                    dataType: "json",
                    success: function (result) {
                        alert("Add Success")
                        var xy = confirm("Are you sure that you want to add notify?");
                        if (xy) {
                            return false;
                        } else {
                            window.location.href = "../notification";
                        }
                    },
                    error: function (event) {
                        console.log("Save Fail" + event);
                    }
                });
            }
        });