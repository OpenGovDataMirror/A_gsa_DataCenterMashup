(function() {

  angular
    .module('octoDatacenter')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular, errorHandler, formlyValidationMessages, formlyConfig) {
    Restangular.setErrorInterceptor(function(response) {
        if(response.status >= 400) {
            errorHandler.showErrorMessage(response);
            // error handled
            return false;
        }        
        // error not handled
        return true;
    });

    //formlyValidationMessages.addStringMessage('required', 'This field is required');

    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

    formlyValidationMessages.messages.required = function getRequiredMessage($viewValue, $modelValue, scope) { return scope.to.label + ' is required'; }

  }

})();
