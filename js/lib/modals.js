var modalsApp = angular.module('modalsApp', ['ui.bootstrap']),
	templatesFolfer = 'templates';

modalsApp.factory('modalMessage', ['$uibModal', function ($uibModal) {
    'use strict';

    var settings = {
        title: 'System message',
        size: 'md',
        closeButtonText: 'Close'
    };

    function show(text, options) {
        angular.extend(settings, options);

        $uibModal.open({
            animation: true,
            templateUrl: templatesFolfer + '/modals/message.html?timestamp=' + (new Date()), // DEV - Timestamp
            controller: ['$scope', '$uibModalInstance', 'content', function ($scope, $uibModalInstance, content) {
                var $ctrl = this;

                $scope.content = content;

                $ctrl.close = function () {
                    $uibModalInstance.dismiss('cancel');
                }
            }],
            controllerAs: '$ctrl',
            size: settings.size,
            backdrop: 'static',
            resolve: {
                content: function () {
                    return {
                        text: text,
                        title: settings.title,
                        closeButtonText: settings.closeButtonText
                    };
                }
            }
        });
    }

    return {
        show: show
    }
}]);

modalsApp.factory('modalLoader', ['$uibModal', function ($uibModal) {
    'use strict';

    var _isLoading = false,
        _modalInstance;

    function start() {
        _isLoading = true;

        _modalInstance = $uibModal.open({
            animation: true,
            templateUrl: templatesFolfer + '/modals/loader.html?timestamp=' + (new Date()), // DEV - Timestamp
            size: 'md',
            backdrop: 'static'
        });
    }

    function stop() {
        _isLoading = false;
        _modalInstance.dismiss('cancel');
    }

    function isLoading() {
        return _isLoading;
    }

    return {
        start: start,
        stop: stop,
        isLoading: isLoading
    };
}]);