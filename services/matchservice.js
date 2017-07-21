angular
    .module('matchData',[])
    .factory('matchService', function() {
         var matchData = {}
         function set(data) {
            console.log('setting data in matchSevice' + data);
           matchData = data;
         }
         function get() {
             console.log('returning data in matchSevice' + matchData);
          return matchData;
         }

         return {
          set: set,
          get: get
         }

    });