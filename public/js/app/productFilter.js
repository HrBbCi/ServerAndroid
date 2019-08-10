$(document).ready(function () {
	const base_url = "http://localhost:3000/api";
	loadOption();
	function loadOption() {
		$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "/category",
				dataType: "json",
				success: function (result) {
					var html = "";
					$("#ddlRelationship").append("<option value='All' selected=\"true\">All Category</option>");
					$.each(result, function (index, item) {
						$('<option>', {
							value: item.Name,
						}).html(item.Name).appendTo("#ddlRelationship");
					})
				},
				error: function (event) {
					alert("Error Get Category");
				}

			});
	}

	$('#ddlRelationship').change(function () {
		var idK = $('#ddlRelationship').val();
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: "https://localhost:8443/serverptit/product/api/filter/" + idK,
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
								item.product.name +
								"</td>";
							html += "<td> " +
								item.product.price +
								"</td>";
							html += "<td> " +
								item.product.stock +
								"</td>";
							html += "<td> " +
								item.product.ct.name +
								"</td>";
							html += "<td>" +
								"<button id = \"" + item.id +
								"\" class = \"btn btn-info btn-success btk\" data-toggle=\"modal\" data-target=\"#myModal_" + item.id + "_" + item.product.id + "_" + item.product.ct.name + "\" >" +
								"<i class = \"glyphicon glyphicon-new-window\">" + "</i>Detail" +
								"</button>";
							html += " <div class=\"modal fade\" id=\"myModal_" + item.id + "_" + item.product.id + "_" + item.product.ct.name + "\" role=\"dialog\"> ";
							html += " <div class=\"modal-dialog\"> ";
							html += "<div class= \"modal-content\"> ";
							html += " <div class=\"modal-header\"> ";
							html += " <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
							html += " <h4 class=\"modal-title\">View Product</h4>";
							html += " </div>";

							html += " <div class=\"modal-body\"> ";
							html += " <table class=\"table table-striped\" cellspacing=\"0\" width=\"100%\">";
							html += "<tr>";
							html += "<td><label>Image ID: </label></td>";
							html += "<td>";
							html += "<label>" + item.id + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Product ID: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.name + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Image: </label></td>";
							html += "<td>";
							html += "<img src = \"http://localhost/image/" + item.filename + " \" alt = \"Chưa có hình ảnh \" style=\"width : 50px; height: 50px \">";
							html += "</td> ";
							html += "</tr> ";


							html += "<tr>";
							html += "<td><label>Name Product: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.name + "</label> ";
							html += "</td> ";
							html += "</tr> ";


							html += "<tr>";
							html += "<td><label>Material: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.material + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Stock: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.stock + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Price: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.price + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Description: </label></td>";
							html += "<td>";

							var c = item.product.description;
							if (c == null) {
								html += "<label>Chưa có mô tả</label> "
							} else {
								html += "<label>" + item.product.description + "</label> "
							}

							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";
							html += "<td><label>Manufactory: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.manufactory.name + "</label> ";
							html += "</td> ";
							html += "</tr> ";

							html += "<tr>";

							html += "<td><label>Type Product: </label></td>";
							html += "<td>";
							html += "<label>" + item.product.ct.name + "</label> ";
							html += "</td> ";
							html += "</tr> ";


							html += "</table>";
							html += " </div>";
							html += " <div class=\"modal-footer\"> ";
							html += " <button type=\"button\" id = \"btnClose" + item.id + "\" class=\"btn btn-default\"  data-dismiss=\"modal\">Close</button> ";
							html += " </div>";
							html += " </div>";
							html += " </div>";
							html += " </div>";
							html += "</script>"; +
							"</td>";

							html += "<td>";
							html += " <button type=\"button\" id = \"btnEdit_" + item.id + "_" + item.product.id + "_" + item.product.ct.name + "\" class=\"btn btn-info btn-success\">" +
								"<i class = \"glyphicon glyphicon-edit\"></i>Edit</button> ";

							html += "<script>";
							$(document).ready(function () {
								$('body').on('click', '#btnEdit_' + item.id + "_" + item.product.id + "_" + item.product.ct.name, function (event) {
									event.preventDefault();
									window.location.href = "./product/update/" + item.id + "/" + item.product.id + "/" + item.product.ct.name;
								});
							});
							html += "</script>";
							html += "</td>";
							html += "<td>" +
								"<button" +
								"\" id = \"btnDelete" + item.id +
								"\" class = \"btn btn-danger\"><i class = \"glyphicon glyphicon-trash\"></i>Delete</button>";
							html += "<script>";
							$(document).ready(function () {

								$('body').on('click', '#btnDelete' + item.id, function (event) {
									event.preventDefault();
									var x = confirm("Are you sure you want to delete?");
									if (x) {
										remove(item.id);
									} else {
										return false;
									}


								});

								function remove(id) {
									$.ajax({
										type: "DELETE",
										url: "https://localhost:8443/serverptit/admin/product/api/delete/" + id,
										success: function (result) {
											alert("Delete Success");
											window.location.href = "https://localhost:8443/serverptit/admin/product";
										},
										error: function (event) {
											alert("Error Delete");
											console.log("Error : ", event);
										}
									});
								}

							});
							html += "</script>"; +
							"</td>";
							html += "</tr>";
							index++;
						})
				$("#tbodyContent1").html(html);
				var table = $('#table_id').html();
				$('#table_id_wrapper').before('<table id="table_id"  class="table table-striped" cellspacing="0" width="100%">' + table + '</table>');
				$('#table_id_wrapper').remove();
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
	});

});