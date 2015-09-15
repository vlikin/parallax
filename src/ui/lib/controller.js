.controller('FrameController', function ($scope, $window) {
  $scope.greeting = 'HI, Hello from Viktor.';
  $scope.scroll = 'not set';

  angular.element($window).bind("scroll",
    function() {
      $scope.scroll = this.pageYOffset;
      var wScroll = this.pageYOffset;
      $scope.$apply();

      // Header.
      angular.element('.bird-box .logo')
        .css('transform', 'translate(0px, ' + wScroll / 2 + 'px)');
      angular.element('.bird-box .back-bird')
        .css('transform', 'translate(0px, ' + wScroll / 2 + 'px)');
      angular.element('.bird-box .fore-bird')
        .css('transform', 'translate(0px, -' + wScroll / 6 + 'px)');

        // Clothes pics.
        var clothes_block = angular.element('.clothes-pics');
        var window = angular.element($window);
        if (wScroll > clothes_block.offset().top - (window.height() / 1.2)) {
          clothes_block.find('figure').each(function(index, value) {
              var el = angular.element(value);
              setTimeout(function(el) {
                el.addClass('is-showing');
              }, 500 * index, el);
          });
        }
    }
  );
})
