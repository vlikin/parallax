'use strict';

var app = angular.module('parallax/ui', [
])

.controller('FrameController', function ($scope, $window) {
  $scope.greeting = 'HI, Hello from Viktor.';
  $scope.scroll = 'not set';

  angular.element(document).ready(function () {
    angular.element('.height-as-width').each(function(index, object) {
      var el = angular.element(object);
      el.height(el.width());
    });
  });

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
        var wScrollEnd = wScroll + window.height();
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
        var once_out = false;
        var post_1 = blog_posts.find('.post-1');
        var post_2 = blog_posts.find('.post-2');
        var post_3 = blog_posts.find('.post-3');
        if (
          wScrollEnd >= blog_posts.offset().top
          && wScrollEnd <= blog_posts.offset().top + blog_posts.height()
        ) {
          once_out = false;
          var s = (wScrollEnd - blog_posts.offset().top) / blog_posts.height();
          console.log(wScrollEnd);
          var ms = 1 - s;
          var shift_str = 'translate(-' + (ms * 33.3) + '%, 0)';
          console.log(shift_str);
          post_1.css('transform', shift_str);
          var shift_str = 'translate(' + (ms * 33.3) + '%, 0)';
          post_3.css('transform', shift_str);
        }
        else {
          if (!once_out && wScrollEnd > blog_posts.offset().top + blog_posts.height()) {
              post_1.css('transform', 'translate(0, 0)');
              post_3.css('transform', 'translate(0, 0)');
              once_out = true;
          }
        }
    }
  );
})

.run(function () {});