// Main javascript entry point
// Should handle bootstrapping/starting application


// import jQuery from 'jquery';
import $ from 'jquery';
import jQuery from 'jquery';
import smoothState from 'smoothState';
import foundation from 'foundation';

$(document).foundation();

$(() => {
  console.log('main loaded');

  // smoothState
  var $page = $('#main'),
  options = {
    debug: true,
    prefetch: true,
    cacheLength: 2,
    onBefore: () => {
    },
    onStart: {
      duration: 900, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    onProgress: {
      duration: 0,
      render: function($container) {
        $container.addClass('is-loading');
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Inject the new content
        $container.html($newContent);
        $container.removeClass('is-exiting');
      }
    },
    onAfter: ($container) => {
      $container.removeClass('is-loading');
    }
  },
  smoothState = $page.smoothState(options).data('smoothState');
});
