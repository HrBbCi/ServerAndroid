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
					var role = $('#role option:selected').val()				
					var employee = {
						'Email': $('#Email').val(),
						'Password': '123456',
						'Fullname':$('#Fullname').val(),
						'StartWork':$('#StartWork').val(),
						'Role': role,
						'Phone':$('#Phone').val(),
						'Salary':$('#Salary').val(),
						'Image': '',
						'NumApartment': '', 
						'Ward':'', 
						'District':'',
						'City': ''
					};
					addEmployee(employee);
                } else {
                    alert("Fail Save Employee");
                }
            });

            function validate() {
                var Fullname = $('#Fullname').val();
                var StartWork = $('#StartWork').val();
                var Email = $('#Email').val();
				var Phone = $('#Phone').val();
				var Salary = $('#Salary').val();
                if (Fullname === null || Fullname.length === 0 || Fullname === "null") {
                    alert("Incorrect Fullname");
                    return false;
                }
                if (StartWork === null || StartWork.length === 0 || StartWork === "null") {
                    alert("Incorrect StartWork");
                    return false;
                }
                if (Email === null || Email.length === 0 || Email === "null") {
                    alert("Incorrect Email");
                    return false;
                }
				if (Phone === null || Phone.length === 0 || Phone === "null") {
                    alert("Incorrect Phone");
                    return false;
                }
				if (Salary === null || Salary.length === 0 || Salary === "null") {
                    alert("Incorrect Salary");
                    return false;
                }
              
                return true;
            }

            function addEmployee(employee) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: base_url + "employee",
                    data: JSON.stringify(employee),
                    dataType: "json",
                    success: function (result) {
                        alert("Add Success")
                        window.location.href = "../employee";
                    },
                    error: function (event) {
						alert("Add Fail")
                        console.log("Save Fail" + event);
                    }
                });
            }
			
			
			getIDEmployee();
			function getIDEmployee() {
			$
				.ajax({
					type: "GET",
					contentType: "application/json",
					url: base_url + "employee/findLast",
					dataType: "json",
					success: function (result) {
						
						var strId = generateId(result.mes);
						$('#emplid').val(strId);
						return result.mes;
					},
					error: function (event) {
						alert("Error Get lastestId");
					}

				});
			}

			function generateId(string) {
				var string2 = string;
				string = string.substring(2, string.length);
				var id = string2.substring(0, 2);
				var lent = string.length;
				var num = parseInt(string) + 1;
				var string_num = num + "";
				var lent2 = lent - string_num.length
				var result = id;
				if (lent2 < 0) {
					result += num;
				} else if (lent2 === 0) {
					result += num;
				} else {
					for (var i = 0; i < lent2; i++) {
						result += "0";
					}
					result += num;
				}
				return result;
			}
        });