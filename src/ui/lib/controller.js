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

        var large_window = angular.element('.large-window');
        if (wScroll > large_window.offset().top - large_window.height()) {
          var shift = wScroll - large_window.offset().top;
          var shift_str = 'center -' + parseInt(shift) + 'px';
          large_window.css('background-position', shift_str);

          var window_tint = large_window.find('.window-tint');
          var promo_text = window_tint.find('.promo-text');
          var opacity = (1 - (large_window.offset().top - wScroll) / large_window.height());
          opacity = opacity <= 1 || opacity >= 0 ? opacity : 1;
          promo_text.css('opacity', opacity); 
        }

        var blog_posts = angular.element('.blog-posts');
        var post_1 = blog_posts.find('.post-1');
        var post_2 = blog_posts.find('.post-2');
        var post_3 = blog_posts.find('.post-3');
        if (wScroll > blog_posts.offset().top - window.height()) {
          var offset = wScroll - blog_posts.offset().top + window.height() - 200;
          offset = Math.abs(offset);
          post_1.css('transform', 'translate(' + offset + 'px, 20px)')
          post_3.css('transform', 'translate(' + -offset + 'px, 20px)')
        }
    }
  );
})
