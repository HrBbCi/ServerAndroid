$(document)
    .ready(
        function () {
            const base_url = "http://localhost:3000/api/";
            loadTable();

            function loadTable() {
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url + "employee",
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $
                                .each(
                                    result,
                                    function (index, item) {
                                       
                                        html += "<tr>";
                                        html += "<td>" +
                                            (index + 1) +
                                            "</td>";
                                        html += "<td> " +
                                            item.Fullname +
                                            "</td>";
                                        html += "<td> " +
                                            item.StartWork +
                                            "</td>";
                                        html += "<td> " +
                                            item.Email +
                                            "</td>";
                                        html += "<td> " +
                                            item.Phone +
                                            "</td>";
                                        html += "<td> " +
                                            item.Salary +
                                            "</td>";
                                        if(item.Image === null || item.Image === "null" || item.Image.trim().length ===0|| item.Image.length ===''|| item.Image.length ===' '){
                                            html += '<td>'  + '</td>';
                                        }else{
                                            html += '<td><img width="50" height="50" src="http://localhost:3000/static/images/'+ item.Image + '"></td>';
                                        }
										if(item.Status === 1){
											html += "<td>Đang làm việc</td>";   
											html += "<td>";
											html += '<button type="button" id = "btnEdit_' + item.Id + '" class="btn btn-info btn-success">' +
												'<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
											html += '</td>'											
										}
										else if(item.Status === 0){
											html += "<td>Nghỉ việc</td>";  
											html += "<td>";
											html += '<button type="button" id = "btnEditS_' + item.Id + '" class="btn btn-info btn-success">' +
												'<i class = "glyphicon glyphicon-edit"></i>Update</button>';
											html += '</td>'													
										}
                                             
                                        
                                        html += '<td>' +
                                            '<button id = "btnDelete_' + item.Id +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
										html += "<script>";
                                        $(document).ready(function () {
											$('#btnEdit_' + item.Id).click(function (event) {
                                                event.preventDefault();
                                                window.location.href = "./employee/edit/"+item.Id;
                                            });
											$('#btnEditS_' + item.Id).click(function (event) {
                                                event.preventDefault();
                                                //Activate
												
												var x = confirm("Are you sure that you want to activate?");
                                                if (x) {
                                                    remove(item.Id,1);
                                                } else {
                                                    return false;
                                                }
                                            });
											$('#btnDelete_' + item.Id).click(function (event) {
											
                                                event.preventDefault();
												//Deactivate
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.Id,0);
                                                } else {
                                                    return false;
                                                }
                                            });

                                            function remove(id,Enabled) {
												var email1 = findEmail(id);
												var email = email1[0].Email;
												
												var emailx = {
													Username: email,
													Enabled : Enabled
												}
												console.log(emailx)
                                                $.ajax({
                                                    type: "PUT",
                                                    url: base_url+"employee",
													data: emailx,
                                                    success: function (result) {
														if(emailx.Enabled === 1){
															alert("Activate Success");
														}else{
															alert("Delete Success");
															
														}
                                                        
                                                        window.location.href = "./employee";
                                                    },
                                                    error: function (event) {
                                                        alert("Error Delete");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }
											//Get Price
											function findEmail(id) {
												var jqXHR = $
													.ajax({
														type: "GET",
														contentType: "application/json",
														url: base_url + "employee/findEmail/" + id,
														dataType: "json",
														async: false,
														success: function (resultPrice) {},
														error: function (event) {
															alert("Error Get");
														}
													});
												// console.log(jqXHR)
												return jqXHR.responseJSON;
											}
                                           
                                        });
                                        html += "</script>";
                                        html += '</td>'
										
                                        html += "</tr>";
                                        index++;
                                    })
                            $("#tbodyContent").html(html);
                            $('#example1').DataTable({
                                'paging': true,
                                'lengthChange': true,
                                'searching': true,
                                'ordering': true,
                                'info': true,
                                'autoWidth': true,
                                'destroy': true
                            });

                        },
                        error: function (event) {
                            alert("Error Get");
                        }
                    });
            }

            $('#btnAdd').click(function (event) {
                event.preventDefault();
                window.location.href = "./employee/save";
            });
        });