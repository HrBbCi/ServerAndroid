$(document).ready(function () {
	const base_url = "http://localhost:3000/api/";
	$('#btnSubmit').click(function (event) {
		event.preventDefault();
		if (validate()) {
			var file = $('#form-upload')[0];
			var data = new FormData(file);
			var fileList = document.getElementById("upload").files;

			//Up to server
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: "http://localhost:3000/multiple-upload",
				data: data,
				processData: false,
				contentType: false,
				cache: false,
				timeout: 1000000,
				success: function (result) {
					console.log("Save done");
				},
				error: function (event) {
					console.log("Save Fail" + event);
				}
			});

			var dataImage = [];
			for (var i = 0; i < fileList.length; i++) {
				console.log(fileList.item(i).name)
				dataImage[i] = {
					ProductsId: $('#productid').val(),
					UrlImage: fileList.item(i).name
				};
				//Save Value Image
				saveValue(dataImage[i]);
			}

			//Insert Product
			var i = $('#typep option:selected').index();
			console.log(i + 1);
			//Radio
			var colorValue = $("input[name='editList']:checked").val();
			var sizeValue = $("input[name='sizeList']:checked").val();

			var dataProduct = {
				Id: $('#productid').val(),
				CategoryId: i + 1,
				Figure: $('#number').val(),
				Description: $('#description').val(),
				Material: $('#Material').val(),
				Type: $('#Type').val(),
				ColorId: colorValue,
				Size: sizeValue,
				Tittle: $('#Tittle').val(),
				CoverPrice: $('#CoverPrice').val(),
				OriginPrice: $('#OriginPrice').val()
			};
			console.log(dataProduct);
			saveProduct(dataProduct);
		} else {
			alert("Fail Save Product");
		}
	});

	function validate() {
		var file = $('#form-upload')[0];
		var data = new FormData(file);
		var fileList = document.getElementById("upload").files;
		var Id = $('#productid').val();
		var number = $('#number').val();
		var description = $('#description').val();
		var Material = $('#Material').val();
		var Type = $('#Type').val();
		var Tittle = $('#Tittle').val();
		var CoverPrice = $('#CoverPrice').val();
		var OriginPrice = $('#OriginPrice').val();
		var colorValue = $("input[name='editList']:checked").val();
		var sizeValue = $("input[name='sizeList']:checked").val();
		if (Id === null || Id.length === 0 || Id === "null") {
			alert("Incorrect Id");
			return false;
		}
		if (number === null || number.length === 0 || number === "null") {
			alert("Incorrect number");
			return false;
		}
		if (description === null || description.length === 0 || description === "null") {
			alert("Incorrect description");
			return false;
		}
		if (Material === null || Material.length === 0 || Material === "null") {
			alert("Incorrect Material");
			return false;
		}
		if (Type === null || Type.length === 0 || Type === "null") {
			alert("Incorrect Type");
			return false;
		}
		if (Tittle === null || Tittle.length === 0 || Tittle === "null") {
			alert("Incorrect Tittle");
			return false;
		}
		if (CoverPrice === null || CoverPrice.length === 0 || CoverPrice === "null" || CoverPrice <= 0) {
			alert("Incorrect CoverPrice");
			return false;
		}
		if (OriginPrice === null || OriginPrice.length === 0 || OriginPrice === "null" || OriginPrice <= 0) {
			alert("Incorrect OriginPrice");
			return false;
		}
		if (colorValue === null || colorValue.length === 0 || colorValue === "null" || colorValue === -1) {
			alert("Incorrect colorValue");
			return false;
		}
		if (sizeValue === null || sizeValue.length === 0 || sizeValue === "null" || sizeValue === -1) {
			alert("Incorrect sizeValue");
			return false;
		}
		if(fileList.length === 0){
			alert("Incorrect Image");
			return false;
		}
		return true;
	}

	function saveValue(dataImage) {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: base_url + "product/saveValue",
			data: JSON.stringify(dataImage),
			dataType: "json",
			success: function (result) {
				console.log("saveValue 1");
			},
			error: function (event) {
				console.log("Save Fail" + event);
			}
		});
	}

	function saveProduct(dataProduct) {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: base_url + "product",
			data: JSON.stringify(dataProduct),
			dataType: "json",
			success: function (result) {
				console.log("saveProduct 1");
				alert("Add success");
				var xy = confirm("Are you sure that you want to add product?");
				if (xy) {
					return false;
				} else {
					window.location.href = "../product";
				}
			},
			error: function (event) {
				alert("Save Fail" + event);
			}
		});
	}
	$('#btnBack').click(function (event) {
		event.preventDefault();
		window.location.href = "/admin/product";
	});

	loadOptionTypeProduct();

	function loadOptionTypeProduct() {

		$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "category",
				dataType: "json",
				success: function (result) {
					var html = "";
					getIDProductByName(result[0].Id);

					$.each(result, function (index, item) {
						$('<option>', {
							value: item.Name,
						}).html(item.Name).appendTo("#typep");
					})
				},
				error: function (event) {
					alert("Error Get Category");
				}

			});

	}


	$('#typep').change(function () {
		var i = $('#typep option:selected').index();
		$('#idcategory').val(i + 1);

		var idK = $('#typep').val();
		getIDProductByName(i + 1);

	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#picture')
					.attr('src', e.target.result)
					.width(150)
					.height(200);
			};

			reader.readAsDataURL(input.files[0]);
		}
	}

	let imagesPreview = function (input, placeToInsertImagePreview) {
		if (input.files) {
			let filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					$($.parseHTML("<img width = 50px height=50px>"))
						.attr("src", event.target.result)
						.appendTo(placeToInsertImagePreview);
				};
				reader.readAsDataURL(input.files[i]);
			}
		}
	};
	$("#upload").on("change", function () {
		imagesPreview(this, "div.preview-images");
	});

	function getIDProductByName(name) {
		$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "lastestId/" + name,
				dataType: "json",
				success: function (result) {
					console.log(result.mes)
					var strId = generateIdProduct(result.mes);
					$('#productid').val(strId);
					return result.mes;
				},
				error: function (event) {
					alert("Error Get lastestId");
				}

			});
	}

	function generateIdProduct(string) {
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