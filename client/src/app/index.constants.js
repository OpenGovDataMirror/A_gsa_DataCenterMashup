/* global malarkey:false, moment:false, _:false */
(function() {

  angular
    .module('octoDatacenter')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('_', _)
    .constant('env', {
      "apiUrl": "api",
      "authToken": "Basic YWRtaW46YWRtaW4="
    });

})();
