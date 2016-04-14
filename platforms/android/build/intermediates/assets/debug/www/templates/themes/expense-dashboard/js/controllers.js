// Controller of expense dashboard page.
appControllers.controller('expenseDashboardCtrl', function ($scope, $state, $timeout,$cordovaSplashscreen, $ionicHistory, $mdBottomSheet, $stateParams, $cordovaOauth, $http, localStorage, $mdToast) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	// doSomeThing is for do something when user click on a button
    $scope.doSomeThing = function () {
    	// You can put any function here.
    } // End doSomeThing.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.expenseSetting");
    };// End goToSetting.

    $scope.showGridBottomSheet = function ($event) {
        $mdBottomSheet.show({
            templateUrl: 'ui-grid-bottom-sheet-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    };
    $scope.showListBottomSheet1 = function ($event1) {
        $mdBottomSheet.show({
            templateUrl: 'ui-list-bottom-sheet-template1',
            targetEvent: $event1,
            scope: $scope.$new(false),
        });
    };// End of showListBottomSheet

  });// End of controller expense dashboard.


// Controller of expense dashboard setting.
appControllers.controller('expenseDashboardSettingCtrl', function ($scope, $state,$ionicHistory,$ionicViewSwitcher) {

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');

            $state.go(stateName, {
                isAnimated: objectData,
            });
        }
    }; // End of navigateTo.
}); // End of controller expense dashboard setting.

appControllers.controller('kenyataanCtrl', function ($scope, $timeout, $state, $http) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.productList is the variable that store user product data.
        $scope.productList = [];

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#article-list-loading-progress').show();
            }
            else {
                jQuery('#article-list-loading-progress').fadeIn(700);
            }
        }, 400);

        $timeout(function () {
            //get product list from json  at paht: www/app-data/product-list.json
            //url for json  http://www.pkns.gov.my/json/desc_content.json

            $http.get('http://www.sprm.gov.my/index.php/my/?option=com_jsonexport&table=kenyataan_media')
                .success(function (productList) {
                    // Success retrieve data.
                        // Store user data to $scope.productList.
                    for (var product = 0; product < productList.length; product++) {
                        $scope.productList.push(productList[product]);
                    }
                    // To stop loading progress.
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }, 2000);


        $timeout(function () {
            jQuery('#article-list-loading-progress').hide();
            jQuery('#article-list-content').fadeIn();
        }, 4000);// End loading progress.
    };// End initialForm.

    // navigateTo is for navigate to other page.
    // by using targetPage to be the destination page
    // and send object to the destination page.
    // Parameter :
    // targetPage = destination page.
    // objectData = object data that sent to destination page.
    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            product: objectData
        });
    };// End navigateTo.

    // loadMore is for loadMore product list.
    $scope.loadMore = function () {
        $timeout(function () {
            //get product list from json  at paht: www/app-data/product-list.json
            //url for json  http://www.pkns.gov.my/json/desc_content.json

            $http.get('http://www.sprm.gov.my/index.php/my/?option=com_jsonexport&table=kenyataan_media')
                .success(function (productList) {
                    // Success retrieve data.
                        // Store user data to $scope.productList.
                    for (var product = 0; product < productList.length; product++) {
                        $scope.productList.push(productList[product]);
                    }
                    // To stop loading progress.
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }, 2000);
    };// End loadMore.

    $scope.initialForm();

});// End of product list controller.

// Controller of product Detail Page.
appControllers.controller('detailKenyataanCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.product is product detail
        // $stateParams.product is the object that pass from product list page.
        $scope.product = $stateParams.product;

        var content = $stateParams.product['introtext'];
        content=content.replace(/height=\"[0-9]*"/i,"");
        content=content.replace(/width=\"[0-9]*\"/i,"");
        content = content.replace('src="images/','width="100%" src="http://www.sprm.gov.my/images/');

          //console.log(content);

        $scope.ProductList = content;
          //console.log($scope.Productlist);

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#article-detail-loading-progress').show();
            }
            else {
                jQuery('#article-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#article-detail-loading-progress').hide();
            jQuery('#article-detail-content').fadeIn();
        }, 3000);// End loading progress.
    };// End initialForm.
    $scope.initialForm();
});// End of product list controller.

appControllers.controller('contractUsCtrl', function ($scope, $cordovaSocialSharing, $cordovaSms) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.contractInfo is store contract us data
        $scope.contractInfo = {
            telephone: "1-800-88-6000",
            sms:"+6019-6000 696",
            fax:"+603-8889 4329",
            email: "info@sprm.gov.my"
        };
        $scope.destinationLocation = " 3.070378,101.517234";
    };// End initialForm.

    // sentSms is for send message by calling $cordovaSms
    // Parameter :
    // phoneNumber = number of sending message
    $scope.sentSms = function (phoneNumber) {
        //config options to sent message
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default.
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging.
                //intent: '' // send SMS without open any other app.
            }
        };
        // calling $cordovaSms to sent message
        $cordovaSms.send(phoneNumber, " ", options);
    } // End sentSms.

    // sentEmail is for send email by calling $cordovaSocialSharing.
    // Parameter :
    // email = email of receiver
    $scope.sentEmail = function (email) {
        $cordovaSocialSharing.shareViaEmail("", "", email, "", "", "");
        // format of sent email by using $cordovaSocialSharing is :
        //$cordovaSocialSharing.shareViaEmail(message, subject, toArr, ccArr, bccArr,file)
        // toArr, ccArr and bccArr must be an array, file can be either null, string or array.
    } // End sentEmail.

    // callTo is for using mobile calling.
    // Parameter :
    // number = number that going to call.
    $scope.callTo = function (number) {
        window.open("tel:" + number);
    }// End callTo.

    $scope.initialForm();

});// End of contract us controller.
