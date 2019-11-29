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
                                                window.location.href = "./product/edit/"+item.product_id;
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