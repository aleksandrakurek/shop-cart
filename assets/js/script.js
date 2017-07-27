$(document).ready(function () {
    var cart = {};
    cart.products = [];

    //check if there is anything from last time
    if (localStorage.getItem("cart") !== null) {
        $("#basketList").removeClass("hide");
        $(".basket-content h4").html("#List of selected products:");
        $("#basketList").removeClass("hide");
        $(".total-sum").removeClass("hide");

        var prevCart = JSON.parse(localStorage.getItem('cart'));
        products = prevCart.products;

        //add products from local storage
        $(products).each(function (i, el) {
            var prevProduct = {};
            prevProduct.name = el.name;
            prevProduct.quantity = el.quantity;
            prevProduct.price = el.price;
            prevProduct.totalprice = el.totalprice;

            var listItem = $("<li class='basket-item'><p class='item-name' data-name='" + prevProduct.name + "'>" + prevProduct.name + "</p><span class='item-count' data-qty='" + prevProduct.quantity + "'>" + prevProduct.quantity + " pcs</span><span class='item-total-cost' data-cost='" + prevProduct.totalprice + "'>" + prevProduct.totalprice + "$</span></li>");
            $("#basketList").append(listItem);
            addToCart(prevProduct);

            totalSum();
            totalAmount();
        });
    }


    function addToCart(product) {
        cart.products.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    $("#addBtn").click(function () {

        //show hidden elements
        $("#basketList").removeClass("hide");
        $(".basket-content h4").html("#List of selected products:");
        $("#basketList").removeClass("hide");
        $(".total-sum").removeClass("hide");

        var product = {};
        product.name = $("#itemName").val();
        product.quantity = $("#itemQty").val();
        product.price = $("#itemPrice").val();
        product.totalprice = product.quantity * product.price;

        var listItem = $("<li class='basket-item'><p class='item-name' data-name='" + product.name + "'>" + product.name + "</p><span class='item-count' data-qty='" + product.quantity + "'>" + product.quantity + " pcs</span><span class='item-total-cost' data-cost='" + product.totalprice + "'>" + product.totalprice + "$</span></li>");

        //add new product after click
        $("#basketList").append(listItem);

        //clear input after add product
        $('input').val("");

        totalSum();
        totalAmount();
        addToCart(product);
    });

    $("#deleteBtn").click(function () {
        localStorage.clear();
        $("#basketList").html("");
        $("#totalItems").html("no products");
        $("#totalSum").html("0");
        $("#totalCost").html("");
        $(".basket-content h4").html("# Add products to shopping cart");
        $("#basketList").hide();
        $("#basketList").hide();
        $(".total-sum").hide();
    });

    function totalSum() {
        //calculate total sum and put in sum & header after click
        var totalSum = 0;
        $(".item-total-cost").each(function () {
            var itemCost = (parseInt($(this).attr("data-cost")));
            totalSum += itemCost;
            $("#totalSum").html(totalSum + " $");
            $("#totalCost").html(totalSum + " $");
        });
    }

    function totalAmount() {
        //calculate total amount and put in header after click
        var totalAmount = 0;
        $(".item-count").each(function () {
            var itemAmount = (parseInt($(this).attr("data-qty")));
            totalAmount += itemAmount;
            $("#totalItems").html(totalAmount + " psc/");
        });
    }
});