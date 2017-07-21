angular
    .module('setyear',[])
    .service('setYear', function() {
         var year = {}
         function set(data) {
            console.log('setting data in setSevice' + data);
           year.selected = data;
         }
         function get() {
             console.log('returning data in setSevice' + year.selected);
          return year;
         }

    return {
         set: set,
         get: get
         }

    });