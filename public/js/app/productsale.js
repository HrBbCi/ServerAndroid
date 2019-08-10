$(document)
    .ready(
        function() {

	        loadProductSale();
	        function loadProductSale() {
		        $
		            .ajax({
		              type : "GET",
		              contentType : "application/json",
		              url : "https://localhost:8443/serverptit/product/api/limit/",
		              dataType : "json",
		              success : function(result) {
			              var html = "";
			              $
			                  .each(
			                      result,
			                      function(index, item) {
				                      html += "<div class=\"item\">";
				                      html += "<div class=\"bd-product-sold\">";
				                      html += "<a id=\"flash"
				                          + index
				                          + "\" href=\"./single?id="+index+ "\"><img style=\"width: 150px; height:150px\" src=\"http://localhost/image/"+ item.filename+ "\" alt=\"\"></a>";
				                      html += "<p class=\"gia\">"+item.product.price+"$</p>";
				                      html += "</div>";
				                      html += "</div>";
			                      })
			              $("#flash-sale-list").html(html);
			              $('.owl-carousel').owlCarousel({
			                items: '7',
			                rtl: true,
			                refreshClass: 'owl-refresh',
			                loadedClass: 'owl-loaded',
			                loadingClass: 'owl-loading',
			                rtlClass: 'owl-rtl',
			                responsiveClass: 'owl-responsive',
			                dragClass: 'owl-drag',
			                itemClass: 'owl-item',
			                stageClass: 'owl-stage',
			                stageOuterClass: 'owl-stage-outer',
			                grabClass: 'owl-grab',
			                autoHeightClass: 'owl-height',
			                navContainerClass: 'owl-nav',
			                navClass: [ 'owl-prev', 'owl-next' ],
			                slideBy: 1,
			                dotClass: 'owl-dot',
			                dotsClass: 'owl-dots'
			            })
		              },
		              error : function(event) {
			              alert("Error Get");
		              }

		            });
	        }
	      	$('#btnSearch').click(function(event) {
	      		var name = $("#searchN").val();
	      		window.location.href = "./search?nameN="+name;
	      	});

        });
