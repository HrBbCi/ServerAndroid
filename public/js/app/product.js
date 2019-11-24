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
						url: base_url + "product",
						dataType: "json",
						success: function (result) {
							var html = "";
							$
								.each(
									result,
									function (index, item) {
										console.log(item);
										html += "<tr>";
										html += "<td>" +
											(index + 1) +
											"</td>";
										html += "<td> " +
											item.product_id +
											"</td>";
										html += "<td> " +
											item.figure +
											"</td>";
										html += "<td> " +
											item.description +
											"</td>";
										html += "<td> " +
											item.rate +
											"</td>";
										html += '<td>' + item.material + '</td>';
										html += '<td>' + item.category.name + '</td>';
										html += "<td>" +
											'<button id = "' + item.product_id +
											'" class = "btn btn-info btn-success btk" data-toggle="modal" data-target="#myModal_' + item.product_id + '" >' +
											'<i class = "glyphicon glyphicon-new-window"></i>Detail' +
											'</button>';
										 html += " <div class=\"modal fade\" id=\"myModal_" + item.product_id + "\" role=\"dialog\"> ";
                                        html += " <div class=\"modal-dialog\"> ";
                                        html += "<div class= \"modal-content\"> ";
                                        html += " <div class=\"modal-header\"> ";
                                        html += " <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
                                        html += " <h4 class=\"modal-title\">Detail</h4>";
                                        html += " </div>";

                                        html += " <div class=\"modal-body\"> ";
                                        html += " <table class=\"table table-striped\" cellspacing=\"0\" width=\"100%\">";
                                        html += "<tr>";
                                        html += "<td><label>ID: </label></td>";
                                        html += "<td>";
                                        html += "<input type=\"text\" id=\"idForm\" readonly value =\"" + item.product_id + "\" class=\"form-control\" /> ";
                                        html += "</td> ";
                                        html += "</tr> ";

                                        html += "<tr>";
                                        html += "<td><label>Name: </label></td>";
                                        html += "<td>";
                                        html += "<input type=\"text\" id=\"nameForm\" value =\"" + item.description + "\" class=\"form-control\" /> ";
                                        html += "</td> ";
                                        html += "</tr> ";

                                        html += "</table>";
                                        html += " </div>";
                                        html += " <div class=\"modal-footer\"> ";
                                        html += " <button type=\"button\" id = \"btnClose" + item.product_id + "\" class=\"btn btn-default\"  data-dismiss=\"modal\">Close</button> ";
                                        html += " </div>";
                                        html += " </div>";
                                        html += " </div>";
                                        html += " </div>";
										
										html += '</td>'
										html += "<td>";
										html += '<button type="button" id = "btnEdit_' + item.product_id + '" class="btn btn-info btn-success">' +
											'<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
										html += '</td>'
										html += '<td>' +
											'<button id = "btnDelete' + item.product_id +
											'" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
										
										
										html += "<script>";
                                        $(document).ready(function () {
											$('body').on('click','#btnEdit_' + item.product_id, function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.product_id);
                                                } else {
                                                    return false;
                                                }
                                            });

											
                                            $('body').on('click','#btnDelete' + item.product_id, function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.product_id);
                                                } else {
                                                    return false;
                                                }
                                            });

                                            function remove(id) {
												var productId = {
													productId: id
												}
                                                $.ajax({
                                                    type: "DELETE",
                                                    url: base_url+"product",
													data: JSON.stringify(productId),
                                                    success: function (result) {
                                                        alert("Delete Success");
                                                        window.location.href = "./product";
                                                    },
                                                    error: function (event) {
                                                        alert("Error Delete");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }
                                        });
                                        html += "</script>";
										
										html += '</td>'						
										html += "</tr>";
										index++;
									})
							$("#tbodyContent1").html(html);
							$('#table_id').DataTable({
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
				window.location.href = "./product/save";
			});
		});