/*global location */
(function() {

  angular
    .module('octoDatacenter')
    .config(config);

  /** @ngInject */

  function config($logProvider, RestangularProvider, env, formlyConfigProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
    
    RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + ':3000/' + env.apiUrl);
    
    if (env.authToken) {
      RestangularProvider.setDefaultHeaders(
        {Authorization: env.authToken}
      );
    }


    formlyConfigProvider.setWrapper([
      {
        template: [
          '<div class="formly-template-wrapper form-group"',
          'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
          '<formly-transclude></formly-transclude>',
          '<div class="validation"',
          'ng-if="options.validation.errorExistsAndShouldBeVisible"',
          'ng-messages="options.formControl.$error">',
          '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
          '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
          '</div>',
          '</div>',
          '</div>'
        ].join(' ')
      },
      {
        template: [
          '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
          '<label for="{{::id}}">',
          '<formly-transclude></formly-transclude>',
          '</label>',
          '</div>'
        ].join(' '),
        types: 'checkbox'
      }
    ]);


  }

})();
