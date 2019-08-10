$(document)
    .ready(
        function() {
	        loadDetailProduct();
	        loadFeedback();
	        function loadDetailProduct() {
	        	var id = $("#idP").val();
		        $
		            .ajax({
		              type : "GET",
		              contentType : "application/json",
		              url : "https://localhost:8443/serverptit/product/api/findProductById/"+id,
		              dataType : "json",
		              success : function(result) {
		              	console.log(result);
		              	if(result.filename != null){
		              		$("#picture1").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture2").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture3").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture4").attr('src',"resources/imgs/img/"+result.filename);
		              	
		              		$("#picture5").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture6").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture7").attr('src',"resources/imgs/img/"+result.filename);
		              		$("#picture8").attr('src',"resources/imgs/img/"+result.filename);
		              	}else{
		              		$("#picture1").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture2").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture3").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture4").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture5").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture6").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture7").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              		$("#picture8").attr("src","https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg");
		              	}
		              	$('#tit').text(result.product.name);
		              	$('#price').text(result.product.price);
		              	$('#stock').text(result.product.stock);
		              	$('#detail').text(result.product.description);
		              	$('#category').text(result.product.ct.name);
		              	
		              },
		              error : function(event) {
			              alert("Error Get 1");
		              }

		            });
	        }
	        
	        function loadFeedback() {
	        	var id = $("#idP").val();
		        $
		            .ajax({
		              type : "GET",
		              contentType : "application/json",
		              url : "https://localhost:8443/serverptit/product/api/feedback/"+id,
		              dataType : "json",
		              success : function(result) {
		              	var html ="";
		              	 $.each(result,function(index, item) {
		              		 html += "<div class=\"row bl\">";
		              		 html += "<div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">";
		              		 html += "<div class=\"profile-rv\">"	;
		              		 html += "	<img src=\"https://media3.scdn.vn/img3/2019/3_1/u2025929059_simg_8b3ef4_40x40_maxb.jpg\" alt=\"\"> "	;
		              		 html += "<p>"+item.customer.fullname.firstname+" "+item.customer.fullname.lastname+"</p>"			;
		              		 html += "<small><a href=\"#\">12:21 4/02/2019</a></small>"	;		
		              		 html += "</div>"		;
		              		 html += "</div>"		;
		              		 html += "<div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 pull-right\">"	;
		              		 html += "<span class=\"sao\">"		;
		              		 html += "<p class=\"sao-i\">"		;
		              		 html += "<i class=\"fa fa-star\"></i> <i class=\"fa fa-star\"></i> <i class=\"fa fa-star\"></i> <i class=\"fa fa-star\"></i>"		;	
		              		 html += "<i class=\"glyphicon glyphicon-star-empty\"></i> "				;
		              		 html += "</p>"			;	
		              		 html += "</span>";
		              		 html += "</div>"		;
		              		 html += "<div class=\"clearfix\"></div>";
		              		 html += "<p>"+item.description+"</p>"	
		              		 html += "</div>";
		 								})
		 								$("#feedbackdetail").append(html);
		              },
		              error : function(event) {
			              alert("Error Get feedback");
		              }

		            });
	        }
	        
	        $('#btnAddtoCart').click(function(event) {
	        	saveCart();
	        	writeListCart();
	        	
	        });
	        
	        $('#btnNow').click(function(event) {
	        	saveCart();
	        	writeListCart();
	        	
	        });
	        
	        function saveCart(){
		        	var productcart ={
		        			id : $("#idP").val()
		      		};
			        $
			            .ajax({
			              type : "POST",
			              contentType : "application/json",
			              url : "https://localhost:8443/serverptit/product/api/saveCart/",
			              data : JSON.stringify(productcart),
			              dataType : "json",
			              success : function(result) {
			              	alert("Thêm thành công");
			              },
			              error : function(event) {
				              alert("Error Add");
				              console.log("Error Add",event);
			              }
	
			            });
	        }
	        function writeListCart(){
	        	var productcart ={
	        			id : $("#idP").val(),	  
	        			name: $('#tit').text(),
	        			price: $('#price').text(),
	        			number: $('#numberbox').val(),
	        			image: $('#picture1').attr('src')
	      		};
	        	console.log(JSON.stringify(productcart));
	        	$
            .ajax({
              type : "POST",
              contentType : "application/json",
              url : "https://localhost:8443/serverptit/api/writeListCart/",
              data : JSON.stringify(productcart),
              dataType : "json",
              success : function(result) {
              	writeCart();
              },
              error : function(event) {
	              console.log("Error List Cart Write",event);
              }

            });
	        }
	        $('#numberbox').keyup(function(){
	        	var stock = $("#stock").text();
	          if ($(this).val() > stock){
	            alert("No numbers above" +stock);
	            $(this).val(stock);
	          }
	        });
        
	        
        });
