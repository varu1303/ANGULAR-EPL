angular
        .module('tabtoteam', [])
        .controller('tabteamCtrl',tabteamCtrl)
;


function tabteamCtrl(getData,teamService){
    var vm = this;
    console.log('tabteam executed');
    vm.team = teamService.get();
    vm.gamelist = [];
    console.log('tabteam ' + vm.team.year);

    getData.matchDetails(vm.team.year).then(function (details) {
          // success
                console.log('success');
                vm.gamelist = matchList(details.data.rounds,vm.team.code);
            
            }, function (reason) {
          // error
                alert(reason);
        }); 
}


function matchList(rounds,code){
    var game = {};
    var gamelist = [];
    for (round in rounds){
        for(match in rounds[round].matches){
            if(rounds[round].matches[match].team1.code == code || rounds[round].matches[match].team2.code == code){
               game = rounds[round].matches[match]; 
               gamelist.push(game);
            }
        }
    }
    
    console.log('length of game list ' + gamelist.length);
    return gamelist;
        
    
}