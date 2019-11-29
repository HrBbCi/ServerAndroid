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
					var CustomerId = "" ;
					if(TypeO === "All" ){
						CustomerId = "";
						TypeO  = "All";
					}else{
						CustomerId = TypeO;
						TypeO  = "1";
					}
                    var notify = {
                        CustomerId: CustomerId,
                        Notify: $("#Notify").val(),
                        TypeO: TypeO,
                        Key: $("#Key").val()
                    };

                    updateNotify(notify);
                } else {
                    alert("Fail UPDATE Notify");
                }
            });
			$('#typep').change(function () {
				

			});
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
								var vall  = $('#idcategory').val();
				
								if(vall === item.Id){
									//Select All
									$('<option selected="true">', {
											value: item.Id,
										}).html(item.Id).appendTo("#typep");
								}else{
									$('<option>', {
										value: item.Id,
									}).html(item.Id).appendTo("#typep");
								}
							})
							
							
							
							
						},
						error: function (event) {
							alert("Error Get Category");
						}

					});

			}
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
	
            function updateNotify(notify) {
                $.ajax({
                    type: "PUT",
                    contentType: "application/json",
                    url: base_url + "notify",
                    data: JSON.stringify(notify),
                    dataType: "json",
                    success: function (result) {
                        alert("UPDATE Success")
                        window.location.href = "../../notification";
                    },
                    error: function (event) {
						alert("UPDATE Fail")
                        console.log("Save Fail" + event);
                    }
                });
            }
        });