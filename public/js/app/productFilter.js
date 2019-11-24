$(document).ready(function () {
	const base_url = "http://localhost:3000/api/";
	loadOption();

	function loadOption() {
		$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "category",
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
	function loadTable2() {
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
								html += '</td>'
								html += "<td>";
								html += '<button type="button" id = "btnEdit_' + item.product_id + '" class="btn btn-info btn-success">' +
									'<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
								html += '</td>'
								html += '<td>' +
									'<button id = "btnDelete' + item.product_id +
									'" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
								html += '</td>'
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
	}
	$('#ddlRelationship').change(function () {
		var i = $('#ddlRelationship option:selected').index();
		if(i === 0){
			loadTable2();
		}else{
			$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "product/category/"+(i),
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
								html += '<td>' +
									'<button id = "btnDelete' + item.product_id +
									'" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
								html += '</td>'
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
		}
		

	});
})