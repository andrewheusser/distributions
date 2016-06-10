angular.module('distributionsApp')
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .dark();
    })
    .component('gaussian', {
        templateUrl: 'components/gaussian/gaussian.html',
        controller: function ($timeout,$scope) {
            var $ctrl = this;
            var parameters = {
              a : 0,
              b : 1
            }

            $scope.parameters = parameters;

            $ctrl.thetas = linspace(-4,4,25);
            $ctrl.labels = $ctrl.thetas.map(function(theta){
              return theta % 1 === 0 ? theta : ''
            });
            $ctrl.data = [createGaussianModel(parameters.a,parameters.b,$ctrl.thetas)];
            // $ctrl.options = {
            //   scaleOverride : true,
            //   scaleSteps : 10,
            //   scaleStepWidth : .1,
            //   scaleStartValue : 0,
            // }

            $scope.$watch(() => parameters.a, function (newVal) {
              console.log('parameters.a: ' + newVal);
              $ctrl.data = [createGaussianModel(parameters.a,parameters.b,$ctrl.thetas)];
            });

            $scope.$watch(() => parameters.b, function (newVal) {
              console.log('parameters.b: ' + newVal);
              $ctrl.data = [createGaussianModel(parameters.a,parameters.b,$ctrl.thetas)];
            });



            function createGaussianModel(a,b,thetas){
              var params = thetas.map(function(theta){
                return (1/(b*Math.sqrt(2*Math.PI)))*Math.pow(Math.E,(-1/2)*Math.pow((theta-a)/b,2))
              });
              return params
            };

            // borrowed function from numeric.js
            function linspace(a,b,n) {
              if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
              if(n<2) { return n===1?[a]:[]; }
              var i,ret = Array(n);
              n--;
              for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
              return ret;
            };

    }
  });
