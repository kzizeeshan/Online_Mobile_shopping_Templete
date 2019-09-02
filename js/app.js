var app = angular.module('myApp', ['ui.bootstrap']);



app.controller('myCtrl', function($scope, $http, $modal) {

    $scope.search = [];
    $scope.cart = [];
    
    
    $http.get('https://api.myjson.com/bins/4xc0c').success(
        function(response) {
            $scope.products = response.products;
        });
    
    $scope.addCart=function(product){

    	var found=false;
    	$scope.cart.forEach(function(item)
    	{
    		if (item.id==product.id)
    		 {
    			item.quantity++;
    			found=true;
    		}

    		});
    		    if(!found)
    		{
                  $scope.cart.push(angular.extend({quantity:1},product));
    		}
    		console.log($scope.cart);
    	};

    	$scope.totalPrice=function(){
    		var total=0;
    		$scope.cart.forEach(function(product)
    		{
    			total=total+(product.price*product.quantity);
    		});
    		return total;
    	};
    	$scope.cartPrice=function()
    	{
    		var total=$scope.cart;
    		return total;
    	}

    	$scope.removeOne=function(product){
                 var found = false;
        $scope.cart.forEach(function(item) {
            if (item.id === product.id) {
                item.quantity--;
                found = true;
            }
        });
        if (!found) {
            $scope.cart.push(angular.extend({
                quantity: 1
            }, product));
        }
    };

    $scope.removeAll=function(cart)
    {
    	$scope.cart.splice(cart,1);
    };

    $scope.remove=function(cart)
    {
    	if ($scope.cart.length==0) {
    		alert(" The cart is Empty");
    	}
    	else{

    		$scope.cart=[];
    	}
     };

    $scope.cartf = function(){
    	$modal.open({
            templateUrl: 'cart.html',
            controller: 'CheckoutCtrl',
            resolve: {
                totalAmount: $scope.CartPrice
            }
        });
    }
     
});
app.controller("Checkoutctrl",function($scope,totalAmount)
{
      $scope.cartdetail=totalAmount;
      $scope.totalAmount=totalAmount;
});