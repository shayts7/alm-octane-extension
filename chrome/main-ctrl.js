var mainApp = angular.module('mainApp', [], function() {
});

angular.module('mainApp').controller('mainCtrl', function mainCtrl($scope) {

  $scope.model = {
    title: 'ALM Octane Extension',
    tabs: [
      {title1: 'General', title2: 'Settings', id: 'general'},
      {title1: 'Natural Language', title2: 'Testing', id: 'artemis'},
      {title1: 'Exploratory', title2: 'Testing', id: 'prism'}
    ]
  };

  loadSettingsFromLocalStorage();

  function loadSettingsFromLocalStorage() {
    let str = localStorage.getItem('almOctaneSettings');
    if (str) {
      let data = JSON.parse(str);
      if (data.currentTab) {
        $scope.model.activeTabId = data.currentTab;
      }
    } else {
      $scope.model.activeTabId = $scope.model.tabs[0].id;
    }
  }

  $scope.onTabClick = function onTabClick(id) {
    $scope.model.activeTabId = id;
    let data = {currentTab: $scope.model.activeTabId};
    localStorage.setItem('almOctaneSettings', JSON.stringify(data));
  }

  $scope.onCloseClick = function onCloseClick() {
    window.close();
  }

});