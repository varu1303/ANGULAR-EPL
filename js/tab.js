angular
        .module('tabinfo',[])
        .controller('t15Ctrl',t15Ctrl);




function t15Ctrl(setYear,getData){
    var vm= this;
    vm.year = setYear.get();
    vm.pyear = vm.year.selected[0]+vm.year.selected[1]+vm.year.selected[2]+(vm.year.selected[3]-1)+
                   vm.year.selected[4]+vm.year.selected[5]+(vm.year.selected[6]-1);
    vm.nyear = vm.year.selected[0]+vm.year.selected[1]+vm.year.selected[2]+(vm.year.selected[3]-(-1))+
                   vm.year.selected[4]+vm.year.selected[5]+(vm.year.selected[6]-(-1));
    vm.prevYear = function(){
        var x = setYear.get();
        console.log('in service the year1 - ' + x.selected);
        vm.nyear = vm.year.selected;
        var x = setYear.get();
        console.log('in service the year2 - ' + x.selected);
        vm.year.selected = vm.pyear;
        var x = setYear.get();
        console.log('in service the year3 - ' + x.selected);
        vm.pyear = vm.pyear[0]+vm.pyear[1]+vm.pyear[2]+(vm.pyear[3]-1)+
                   vm.pyear[4]+vm.pyear[5]+(vm.pyear[6]-1);
        console.log('prev year got ' + vm.pyear);
        console.log('next year got ' + vm.nyear);
        var x = setYear.get();
        console.log('in service the year4 - ' + x.selected);
        console.log('curr year ' + vm.year.selected);
        getData.matchDetails(vm.year.selected).then(function (details) {
          // success
                console.log('successin tab15');
                vm.standings = buildTab(details.data.rounds);
                
            
            }, function (reason) {
          // error
                alert(reason);
        });  
    }
    vm.nextYear = function(){
        vm.pyear = vm.year.selected;
        vm.year.selected = vm.nyear;
        vm.nyear = vm.nyear[0]+vm.nyear[1]+vm.nyear[2]+(vm.nyear[3]-(-1))+
                   vm.nyear[4]+vm.nyear[5]+(vm.nyear[6]-(-1));
        console.log('prev year got ' + vm.pyear);
        console.log('next year got ' + vm.nyear);
        
        getData.matchDetails(vm.year.selected).then(function (details) {
          // success
                console.log('successin tab15');
                vm.standings = buildTab(details.data.rounds);
                
            
            }, function (reason) {
          // error
                alert(reason);
        });  
    }
    getData.matchDetails(vm.year.selected).then(function (details) {
          // success
                console.log('successin tab15');
                vm.standings = buildTab(details.data.rounds);
                
            
            }, function (reason) {
          // error
                alert(reason);
        });  
}

//Function to build array of objects which will show in view of Points table

function buildTab(rounds){
    
//    console.log('got it ' + rounds.length);
    
    var allTeams = [];
    var result = [];
    
    
    for(day in rounds){
        for(match in rounds[day].matches){
            if (allTeams.indexOf(rounds[day].matches[match].team1.code) == -1){
                allTeams.push(rounds[day].matches[match].team1.code);
    //          console.log('got pushed' + rounds[day].matches[match].team1.code);
            }
              
            }
        }
    



    for (var i in allTeams){
        var obj ={win:0,
                 loss:0,
                 draw:0,
                 gfi:0,
                 gfo:0,
                 gai:0,
                 gao:0
                 };
        obj.code = allTeams[i];
       for(day in rounds){
            for(match in rounds[day].matches){
                    if(rounds[day].matches[match].score1 == null || rounds[day].matches[match].score2 == null){
      //                  console.log('skipping iteration');
                        continue;
                    }
      //              console.log('objcode '+ obj.code + ' ' + rounds[day].matches[match].team1.code);
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
        
            }
            obj.gdo = obj.gfo - obj.gao;
            obj.point = (3 * obj.win) + (obj.draw);
   //         console.log('pushed object ' + obj);
            result.push(obj);
        }
                            
                            
       console.log('length of result ' + result.length);
        result.sort(function(a,b){
            if (a.point == b.point)
                return -(a.gdo - b.gdo);
            else
                return -(a.point - b.point);
            
        });
   //     console.log(result);
        return result;
                            
}

//



