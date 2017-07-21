angular
        .module('getinfo',[])
        .service('getData',getData);

function getData($http){
    
    this.matchDetails = function(year){
        console.log('executing matchdetails');
        
      return ($http.get('https://raw.githubusercontent.com/openfootball/football.json/master/'+year+'/en.1.json'));
      
    };
}