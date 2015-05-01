'use strict';

var fluxApp = require('fluxapp');
var router = fluxApp.getRouter();

function isEnabled() {
  return !! (typeof window !== 'undefined' && window.history);
}

module.exports = {
  fluxappRouter: {
    init: function init(url, route) {
      route.url = url;

      return {
        route: route
      };
    },

    go: function go(id, meta) {
      var route = router.build(id, meta);
      var title;
      var state;

      if (! route) {
        throw new Error('fluxAppRouter:Go unable to locate route specified', route);
      }

      meta.url = route.url;

      state = {
        routeId: route.id,
        meta: meta,
      };

      if (isEnabled()) {
        title = route.title || meta.title || '';

        window.history.pushState(
          state,
          title,
          route.url
        );
      }

      return {
        state: state
      };
    },

    back: function back() {
      if (isEnabled) {
        window.history.back();
      }
    },

    forward: function forward() {
      if (isEnabled) {
        window.history.forward();
      }
    }
  }
}