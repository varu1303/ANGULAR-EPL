angular
    .module('teamData',[])
    .factory('teamService', function() {
         var teamData = {}
         function set(data) {
            console.log('setting data in teamSevice' + data);
           teamData = data;
         }
         function get() {
             console.log('returning data in teamSevice' + teamData);
          return teamData;
         }

         return {
          set: set,
          get: get
         }

    });