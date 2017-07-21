angular
        .module('bplapp', ['routemod','getinfo','tabinfo','matchData','teamData','setyear'])
        .controller('MainCtrl',MainCtrl)
        .controller('v15Ctrl',v15Ctrl)
        .controller('stat1Ctrl',stat1Ctrl)
        .controller('teamstat1Ctrl',teamstat1Ctrl)
;

function MainCtrl(setYear){
    this.year= '2012-13';
    this.var = "HI! We are now live";
    console.log('year ' + this.year);
    setYear.set(this.year);
    this.setVal = function(){
        console.log('ng-changed ');
        setYear.set(this.year);
    }
    
    
}

function v15Ctrl(setYear,getData,matchService,teamService){
    
    var vm= this;
    vm.filtering = false;
    vm.navbut = 0;
    vm.buttext= 'ONE MATCHDAY AT A TIME';
    
    vm.oneact = function (){
        if (vm.navbut == 0){
            vm.fromday = 0;
            vm.manyday = 1 ;  
            vm.navbut = 1;
        }
        else{
           vm.fromday = 0;
           vm.manyday = 39 ;  
           vm.navbut = 0; 
        }
        if(vm.navbut == 1){
            vm.buttext = 'SEE WHOLE LIST';
        }
        else{
            vm.buttext = 'ONE MATCHDAY AT A TIME';  
        }
        
    };
    
    vm.decr = function (){
        if (vm.fromday > 0)
            vm.fromday -=  1;  
    };
    vm.incr = function (){
        if (vm.fromday < 37)
            vm.fromday += 1;
    };
    
    
    var year = setYear.get();
    console.log('v15 year ' + year.selected);
    
    this.shareData = function (data){
        matchService.set(data);
    }
    this.shareTeam = function (data) {
        teamService.set(data);
    }
    
    getData.matchDetails(year.selected).then(function (details) {
          // success
                console.log('success');
                vm.title=(details.data.name);
                vm.count = (details.data.rounds.length);
                vm.rounds = (details.data.rounds);
                console.log('got vm count' + vm.count);
                console.log('got rounds' + vm.rounds);
            
            }, function (reason) {
          // error
                alert(reason);
        });  
    
    
    
    vm.filterbyName = function(match){
        
        var diff = Math.abs(match.score1 - match.score2);
        if (vm.vs == undefined || vm.vs == ''){
            if (vm.teamfind == undefined || vm.teamfind == '') {
                if(vm.gd == undefined || vm.gd == ''){
                    vm.filtering = false;
                    return true;
                }
               else if(vm.gd > diff){
                vm.filtering = true;
                return false;
               }
               else
                return true;
            }
            var t1name = match.team1.name.toLowerCase();
            var t2name = match.team2.name.toLowerCase();
            var tfind =  vm.teamfind.toLowerCase();
            console.log('check tfind ' + vm.teamfind);

           if (t1name.indexOf(tfind) != -1 || t2name.indexOf(tfind) != -1){
               if(vm.gd == undefined)
                return true;
               else if(vm.gd > diff){
                vm.filtering = true;
                return false;
               }
               else
                return true;
            }
            else{
                vm.filtering = true;
                return false;
            }
        }else{
            
            var t1name = match.team1.name.toLowerCase();
            var t2name = match.team2.name.toLowerCase();
            var tfind =  vm.teamfind.toLowerCase();
            var tfindvs =  vm.vs.toLowerCase();
            console.log('check tfind ' + vm.teamfind);

           if ((t1name.indexOf(tfindvs) != -1 || t2name.indexOf(tfindvs) != -1) && 
               (t1name.indexOf(tfind) != -1 || t2name.indexOf(tfind) != -1)){
               if(vm.gd == undefined)
                return true;
               else if(vm.gd > diff){
                vm.filtering = true;
                return false;
               }
               else
                return true;
            }
            else{
                vm.filtering = true;
                return false;
            }
        }
        
    };
    
}


//




function stat1Ctrl(matchService){
    console.log('statCtrl executed');
    this.match = matchService.get();
    console.log('this match' + this.match.score1);
}




function teamstat1Ctrl(setYear,getData,teamService){
    var vm = this;
    console.log('teamCtrl executed');
    this.team = teamService.get();
    var year = setYear.get();
    getData.matchDetails(year.selected).then(function (details) {
          // success
                console.log('success');
                vm.teamStat = buildTeam(details.data.rounds, vm.team);
            
            }, function (reason) {
          // error
                alert(reason);
        }); 
}


//

function buildTeam(rounds,team){
    
    var obj ={win:0,
              loss:0,
              draw:0,
              gfi:0,
              gfo:0,
              gai:0,
              gao:0
             };
    obj.name = team.name;
    obj.code = team.code;
    for(day in rounds){
        for(match in rounds[day].matches){
                if(rounds[day].matches[match].score1 == null || rounds[day].matches[match].score2 == null){
  //                  console.log('skipping iteration');
                    continue;
                }
 //               console.log('objcode '+ obj.code + ' ' + rounds[day].matches[match].team1.code);
                if (obj.code == rounds[day].matches[match].team1.code){
 //                       console.log('MAAAAAAAAAAAATCH');
 //                       console.log('1 ' + rounds[day].matches[match].score1);
 //                       console.log('2 ' + rounds[day].matches[match].score2);
                        obj.gfi = rounds[day].matches[match].score1;
                        obj.gai = rounds[day].matches[match].score2;  
                        obj.gfo += obj.gfi;
                        obj.gao += obj.gai;
                        if (obj.gfi > obj.gai) 
                            ++obj.win ;
                        if (obj.gfi < obj.gai)
                            ++obj.loss ;
                        if (obj.gfi == obj.gai)
                            ++obj.draw ;
                    }
                if (obj.code == rounds[day].matches[match].team2.code){
                        obj.gfi = rounds[day].matches[match].score2;
                        obj.gai = rounds[day].matches[match].score1;  
                        if (obj.gfi > obj.gai) 
                            ++obj.win ;
                        if (obj.gfi < obj.gai)
                            ++obj.loss ;
                        if (obj.gfi == obj.gai)
                            ++obj.draw ;
                        obj.gfo += obj.gfi;
                        obj.gao += obj.gai;
                        }
                }
        
            obj.gdo = obj.gfo - obj.gao;
            obj.point = (3 * obj.win) + (obj.draw);
   //         console.log('pushed object ' + obj);
        }
                            
                            
        return obj;
                            
}

//


