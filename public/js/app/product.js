$(document)
	.ready(
		function () {
			const base_url = "http://localhost:3000/api/product";
			loadTable();

			function loadTable() {
				$
					.ajax({
						type: "GET",
						contentType: "application/json",
						url: base_url,
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
											item.name +
											"</td>";
										html += "<td> " +
											item.origin_price +
											"</td>";
										html += "<td> " +
											item.cover_price +
											"</td>";
										html += '<td>' + item.figure + '</td>';
										html += "<td>" +
											'<button id = "' + item.product_id +
											'" class = "btn btn-info btn-success btk" data-toggle="modal" data-target="#myModal_' + item.product_id + '" >' +
											'<i class = "glyphicon glyphicon-new-window"></i>Detail' +
											'</button>';
										html += '</td>'
										html += "<td>";
										html += '<button type="button" id = "btnEdit_' + item.product_id + '" class="btn btn-info btn-success">' +
											'<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
										html += '</td>'
										html += '<td>'+
											'<button id = "btnDelete' + item.product_id +
											'" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
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