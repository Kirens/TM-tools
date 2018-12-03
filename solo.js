if(window.location.href.indexOf("majk") > -1) {
  majk = true;
} else {majk = false;}

var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};

var configMajk = {
  apiKey: "AIzaSyCMbA6dyAirKhUznhfMlw2qxLVb5NnqPA8",
  authDomain: "majks-games.firebaseapp.com",
  databaseURL: "https://majks-games.firebaseio.com/",
  projectId: "majks-games",
  storageBucket: "majks-games.appspot.com",
  messagingSenderId: "163248462443"
};

app = firebase.initializeApp(config, "app");
appMajk = firebase.initializeApp(configMajk, "appMajk");

// Reference Games collection
if (majk) {
  appMajk.database().ref("majks-games").on('value', function(snapshot) {
      GAMES_ALL = snapshotToArray(snapshot);
      GAMES_ALL_JSON = JSON.stringify(snapshot)
      games = snapshotToArray(snapshot);
      pushData();
  });
} else {
  app.database().ref("games-solo").on('value', function(snapshot) {
      GAMES_ALL = snapshotToArray(snapshot);
      GAMES_ALL_JSON = JSON.stringify(snapshot)
      games = snapshotToArray(snapshot);
      pushData();
  });
}

$("#form").keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
/////////////////////////////////////////////////////////////////////////////////////
outcome = "";
function checkForm () {
  //code executed when "submit" is clicked

  enableSubmit = true;
  //if corporation is not selected
  if (document.querySelectorAll("select[class='drop-down3 change-colours2']").length < 1) {
    enableSubmit = false;
    document.getElementById("corporation").classList.add("red-outline");
   };
   //if map is not selected
  if (document.querySelectorAll("input[name='map']:checked").length < 1 ) {
     x = document.querySelectorAll(".map");
     for (i = 0; i < x.length; i++) {
       x[i].classList.add("red-outline");
     }
     enableSubmit = false;
   }

   //if mode is not selected
  if (document.querySelectorAll("input[name='mode']:checked").length < 1 ) {
     x = document.querySelectorAll(".mode");
     for (i = 0; i < x.length; i++) {
       x[i].classList.add("red-outline");
     }
     enableSubmit = false;
   }
   //if win/loss are not selected
   if (outcome.length < 1){
     document.getElementById("winLabel").classList.add("red-outline");
     document.getElementById("lossLabel").classList.add("red-outline");
     enableSubmit = false;
   }
   //if loss is selected but not steps
   if (outcome == "loss" && document.querySelectorAll(".drop-down2.change-colours2").length <1) {
     document.getElementById("steps").classList.add("red-outline");
     enableSubmit = false;
   }
   //if win is selected but no score
   if (outcome == "win" && document.querySelectorAll(".corporation-score.change-colours2").length <1) {
     document.getElementById("corporation-score").classList.add("red-outline");
     enableSubmit = false;
   }


  //generates the modal text
  if (enableSubmit) {
    document.getElementById("confirm").style.display = "block";
    } else { document.getElementById("submit").disabled = true;}

  //remove the red outlines after 3 seconds
  setTimeout(function(){
    x = document.querySelectorAll(".red-outline");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("red-outline");
    }
    document.getElementById("submit").disabled = false;
  }, 500);
}

/////////////////////////////////////////////////////////////////////////////////////

function changeColours2 (id) {
  document.getElementById(id).classList.add("change-colours2");
  document.getElementById(id).classList.remove("not-filled");
}

function changeColours2a (id) {
  if (document.getElementById(id).value < 20 || document.getElementById(id).value > 200) {
    document.getElementById(id).classList.remove("change-colours2");
  }
  else {
    document.getElementById(id).classList.add("change-colours2");
  }
}

function generateConfirmationText () {

  var corporation = document.getElementById("corporation").value;
  var expansions = arrayExpansions();
  var map = document.querySelector('input[name="map"]:checked').value;
  var result = outcome.toUpperCase();
  var mode = document.querySelector('input[name="mode"]:checked').value;


  if (outcome == "win") {
    result = outcome.toUpperCase() + " - " + document.getElementById("corporation-score").value;
  } else {
    result = outcome.toUpperCase() + " by " + document.getElementById("steps").value + " STEPS";
  }


  document.getElementById("modalResult").innerHTML = result;
  document.getElementById("modalCorporation").innerHTML = corporation;
  document.getElementById("modalMap").innerHTML = map;
  document.getElementById("modalMode").innerHTML = mode;
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
}

function animateTakeOff() {
  console.log("hi")
  el = document.getElementById("submit-container")
  el.style.transform = "scale(0)";

  setTimeout(function(){
  el.style.transform = "scale(1)";
  },1000)
}

function resetAll () {
  //clear the selected colour
  setTimeout(function(){
  outcome = "";

  x = document.querySelectorAll(".change-colours2");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours2");
  }
  y = document.querySelectorAll(".change-colours3");
  for (j=0; j < y.length; j++) {
    y[j].classList.remove("change-colours3");
  }
    document.getElementById("winSection").style.backgroundPosition = "250px 0px";
    document.getElementById("winSection").style.width = "177px";
    document.getElementById("winLabel").innerHTML = "WIN";

    document.getElementById("lossSection").style.backgroundPosition = "-120px -9px";
    document.getElementById("lossSection").style.width = "177px";
    document.getElementById("lossLabel").innerHTML = "LOSS";

    document.getElementById("corporation-score").style.display = "none";
    document.getElementById("corporation-score").style.transform = "scale(0)";
    document.getElementById("steps").style.display = "none";
    document.getElementById("steps").style.transform = "scale(0)";

    document.getElementById("confirm").style.display = "none";
  }, 500)
}

function activateWin(id) {
  outcome ="win";
  el = document.getElementById(id);
  el2 = document.getElementById("lossSection");


  el.classList.add("change-colours3");
  document.getElementById("winLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "145px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "-120px";
  el2.classList.remove("change-colours3");
  document.getElementById("lossLabel").innerHTML = "LOSS";
  document.getElementById("steps").style.display ="none";
  document.getElementById("steps").style.transform = "scale(0)";
  document.getElementById("corporation-score").style.display = "block";
  setTimeout(function() {
    document.getElementById("corporation-score").style.transform = "scale(1)";
  }, 100)
}


function activateLoss(id) {
  outcome = "loss";
  el = document.getElementById(id);
  el2 = document.getElementById("winSection");


  el.classList.add("change-colours3");
  document.getElementById("lossLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "-15px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "250px";
  el2.classList.remove("change-colours3");
  document.getElementById("winLabel").innerHTML = "WIN";
  document.getElementById("steps").style.display ="block";
  document.getElementById("corporation-score").style.display = "none";
  document.getElementById("corporation-score").style.transform = "scale(0)";
  setTimeout(function() {
    document.getElementById("steps").style.transform = "scale(1)";
  }, 100)
}


function filterFunction(id) {

  // getting the constant GAMES_ALL
  // filter games from it and return/create new array "games"
  //toggling active buttons state
  games = GAMES_ALL;

  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}

  //filtering by Maps
  btnMap = document.querySelectorAll(".btn-map.active");
  if (btnMap.length == 1 ) {
    games = games.filter(function(el) {
      return el.map == btnMap[0].id;
    });
  } else if (btnMap.length == 2 ){
    games = games.filter(function(el) {
      return el.map == btnMap[0].id || el.map == btnMap[1].id;
    });
  } else if (btnMap.length == 3 ){
    games = games.filter(function(el) {
      return el.map == btnMap[0].id || el.map == btnMap[1].id || el.map == btnMap[2].id;
    });
  }

  //filter by corporation
  selectedCorporation = document.querySelectorAll(".drop-down.change-colours2")
  if (selectedCorporation.length > 0) {
    games = games.filter(function(el) {
      return el.corporation.indexOf(selectedCorporation[0].value) > -1 ;
    });
  }

  //filter by expansions
  btnExpansion = document.querySelectorAll(".btn-expansion.active");

  if (btnExpansion.length == 2 ){
    games = games.filter(function(el) {
      return el.expansions != undefined &&
       el.expansions.indexOf(btnExpansion[1].id) > -1 && el.expansions.length == 1
    });
  } else if (btnExpansion.length == 3 ){
    games = games.filter(function(el) {
      return el.expansions != undefined &&
        el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions.indexOf(btnExpansion[2].id) > -1 && el.expansions.length == 2
    });
  } else if (btnExpansion.length == 4 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&
        el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions.indexOf(btnExpansion[2].id) > -1 &&
        el.expansions.indexOf(btnExpansion[3].id) > -1 && el.expansions.length == 3
    });
  }

  //pushing the new filtered data
  pushData();
}

function pushData() {
  setTimeout(function() {pushGeneralStats()}, 500); //for smoother animation
  pushHistory();
  pushCorporationsData();
  histogram();
}

function pushGeneralStats() {
  //total games
  document.getElementById("total_games").innerHTML = games.length;
}

function pushHistory() {
  //clear the sections
  var x = document.querySelectorAll(".flag-div,.history-section-time-value2, .history-section-corporation2, .history-section-score2, .history-section-generation2, .history-section-expansions2")
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history2");

  for(i=0; i < gameSections.length && i < games.length; i++) {

    //display the flag
    try {country =  games[games.length-1-i]["country"];}
    catch (err) {}
    if (country != undefined && country.length > 1) {
      countryDivContent = '<img class="flag" src="flags/'+country+'.png" title="'+country+'">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    } else {
      countryDivContent = '<img class="flag" src="flags/EU.png" title="EU">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    }

    //game timestamp in seconds
    try {
      timestamp = games[games.length-1-i]["timestamp"];
      time = now - timestamp;
      gameSections[i].querySelector(".history-section-time-value2").innerHTML = compareTime(time);
    } catch (err) {}


    //the corporations array
    try {
      corporationsSection = gameSections[i].querySelector(".history-section-corporation2");
      scoreSection = gameSections[i].querySelector(".history-section-score2");
      corporationsSection.innerHTML = games[games.length-1-i]["corporation"];}
    catch (err) {}

    try {result = games[games.length-1-i]["result"];
    if (result > 20) {scoreSection.innerHTML = result}
    else {scoreSection.innerHTML = "<span class='failed-number'>"+result+"</span>"}}
    catch (err) {}


    //the expansions
    var expansionsHTML = "";
    try {
      expansionsArray = games[games.length-1-i]["expansions"];
      if (expansionsArray == undefined) {expansionsArray = []}
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon corporate-era-icon icon-align2"></div></div>'
      if (expansionsArray.indexOf("VENUS") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon venus-icon icon-align2"></div></div>'
      }
      if (expansionsArray.indexOf("PRELUDE") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon prelude-icon icon-align2"></div></div>'
      }
      if (expansionsArray.indexOf("COLONIES") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon colonies-icon icon-align2"></div></div>'
      }
      gameSections[i].querySelector(".history-section-expansions2").innerHTML = expansionsHTML;
    }   catch (err) {}

  }
}



function changeColours (id) {
  menu = document.getElementById(id);
  if (document.querySelector("option[value='NOT SELECTED']").selected) {menu.classList.remove("change-colours");}
  else {menu.classList.add("change-colours");}
}

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
};

function compareTime(time) {
  if (time >= 0 && time < 120) {return "now"}
  if (time >= 120 && time < 7200) {return Math.floor(time/60) + " mins"}
  if (time >= 7200 && time < 172800) {return Math.floor(time/3600) + " hours"}
  if (time >= 172800) {return Math.floor(time/86400) + " days"}
}

function download(data, filename, json) {
    var file = new Blob([GAMES_ALL_JSON], {type: "text/plain;charset=utf-8"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "Solo Games - " + GAMES_ALL.length;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function corporationWinrate(corporationGamesArray) {
  wins = 0;
  if (corporationGamesArray.length > 0) {
    for (i=0; i < corporationGamesArray.length; i++) {
      result = parseInt(corporationGamesArray[i]["result"]);
      if (result > 20) {wins++}
    }
  return Math.round(wins*100/corporationGamesArray.length) + "<span style='font-size:12px'>%</span>"
  }
  else return 0 + "<span style='font-size:12px'>%</span>"
}

function corporationScore(corporationGamesArray) {
  var corp_score = 0;
  var corp_games = 0;
  if (corporationGamesArray.length > 0) {
    for (i=0; i < corporationGamesArray.length; i++) {
      result = parseInt(corporationGamesArray[i]["result"]);
      if (result > 20) {
        corp_score = corp_score + result;
        corp_games++;
      }
    }
    if (corp_score > 0) {return Math.round(corp_score/corp_games)}
    else return 0
  }
  else return 0
}

function resetFilters() {
  var x = document.querySelectorAll(".active");
  for (i = 0; i < x.length; i++) {
    if (x[i].id != "CORPORATE") {
      x[i].classList.remove("active")
    }
  }
  y = document.querySelectorAll(".change-colours");
  if (y.length > 0) {
    for (i = 0; i < y.length; i++) {
    y[i].classList.remove("change-colours");
    }
  }
  filterFunction();
}

function pushCorporationsData(corporation) {

  games_credicor = games.filter(function(el) {return el.corporation == "CREDICOR"});
  document.getElementById("games-credicor").innerHTML = games_credicor.length;
  document.getElementById("winrate-credicor").innerHTML =  corporationWinrate(games_credicor);
  document.getElementById("score-credicor").innerHTML =  corporationScore(games_credicor);

  games_ecoline = games.filter(function(el) {return el.corporation == "ECOLINE"});
  document.getElementById("games-ecoline").innerHTML = games_ecoline.length;
  document.getElementById("winrate-ecoline").innerHTML =  corporationWinrate(games_ecoline);
  document.getElementById("score-ecoline").innerHTML =  corporationScore(games_ecoline);

  games_helion = games.filter(function(el) {return el.corporation == "HELION"});
  document.getElementById("games-helion").innerHTML = games_helion.length;
  document.getElementById("winrate-helion").innerHTML =  corporationWinrate(games_helion);
  document.getElementById("score-helion").innerHTML =  corporationScore(games_helion);

  games_mining = games.filter(function(el) {return el.corporation == "MINING GUILD"});
  document.getElementById("games-mining").innerHTML = games_mining.length;
  document.getElementById("winrate-mining").innerHTML =  corporationWinrate(games_mining);
  document.getElementById("score-mining").innerHTML =  corporationScore(games_mining);

  games_interplan = games.filter(function(el) {return el.corporation == "INTERPLAN. CINEMATICS"});
  document.getElementById("games-interplan").innerHTML = games_interplan.length;
  document.getElementById("winrate-interplan").innerHTML =  corporationWinrate(games_interplan);
  document.getElementById("score-interplan").innerHTML =  corporationScore(games_interplan);

  games_inventrix = games.filter(function(el) {return el.corporation == "INVENTRIX"});
  document.getElementById("games-inventrix").innerHTML = games_inventrix.length;
  document.getElementById("winrate-inventrix").innerHTML =  corporationWinrate(games_inventrix);
  document.getElementById("score-inventrix").innerHTML =  corporationScore(games_inventrix);

  games_phobolog = games.filter(function(el) {return el.corporation == "PHOBOLOG"});
  document.getElementById("games-phobolog").innerHTML = games_phobolog.length;
  document.getElementById("winrate-phobolog").innerHTML =  corporationWinrate(games_phobolog);
  document.getElementById("score-phobolog").innerHTML =  corporationScore(games_phobolog);

  games_tharsis = games.filter(function(el) {return el.corporation == "THARSIS REPUBLIC"});
  document.getElementById("games-tharsis").innerHTML = games_tharsis.length;
  document.getElementById("winrate-tharsis").innerHTML =  corporationWinrate(games_tharsis);
  document.getElementById("score-tharsis").innerHTML =  corporationScore(games_tharsis);

  games_thorgate = games.filter(function(el) {return el.corporation == "THORGATE"});
  document.getElementById("games-thorgate").innerHTML = games_thorgate.length;
  document.getElementById("winrate-thorgate").innerHTML =  corporationWinrate(games_thorgate);
  document.getElementById("score-thorgate").innerHTML =  corporationScore(games_thorgate);

  games_unmi = games.filter(function(el) {return el.corporation == "UNMI"});
  document.getElementById("games-unmi").innerHTML = games_unmi.length;
  document.getElementById("winrate-unmi").innerHTML =  corporationWinrate(games_unmi);
  document.getElementById("score-unmi").innerHTML =  corporationScore(games_unmi);

  games_teractor = games.filter(function(el) {return el.corporation == "TERACTOR"});
  document.getElementById("games-teractor").innerHTML = games_teractor.length;
  document.getElementById("winrate-teractor").innerHTML =  corporationWinrate(games_teractor);
  document.getElementById("score-teractor").innerHTML =  corporationScore(games_teractor);

  games_saturn = games.filter(function(el) {return el.corporation == "SATURN SYSTEMS"});
  document.getElementById("games-saturn").innerHTML = games_saturn.length;
  document.getElementById("winrate-saturn").innerHTML =  corporationWinrate(games_saturn);
  document.getElementById("score-saturn").innerHTML =  corporationScore(games_saturn);

  games_aphrodite = games.filter(function(el) {return el.corporation == "APHRODITE"});
  document.getElementById("games-aphrodite").innerHTML = games_aphrodite.length;
  document.getElementById("winrate-aphrodite").innerHTML =  corporationWinrate(games_aphrodite);
  document.getElementById("score-aphrodite").innerHTML =  corporationScore(games_aphrodite);

  games_celestic = games.filter(function(el) {return el.corporation == "CELESTIC"});
  document.getElementById("games-celestic").innerHTML = games_celestic.length;
  document.getElementById("winrate-celestic").innerHTML =  corporationWinrate(games_celestic);
  document.getElementById("score-celestic").innerHTML =  corporationScore(games_celestic);

  games_manutech = games.filter(function(el) {return el.corporation == "MANUTECH"});
  document.getElementById("games-manutech").innerHTML = games_manutech.length;
  document.getElementById("winrate-manutech").innerHTML =  corporationWinrate(games_manutech);
  document.getElementById("score-manutech").innerHTML =  corporationScore(games_manutech);

  games_morning = games.filter(function(el) {return el.corporation == "MORNING STAR"});
  document.getElementById("games-morning").innerHTML = games_morning.length;
  document.getElementById("winrate-morning").innerHTML =  corporationWinrate(games_morning);
  document.getElementById("score-morning").innerHTML =  corporationScore(games_morning);

  games_viron = games.filter(function(el) {return el.corporation == "VIRON"});
  document.getElementById("games-viron").innerHTML = games_viron.length;
  document.getElementById("winrate-viron").innerHTML =  corporationWinrate(games_viron);
  document.getElementById("score-viron").innerHTML =  corporationScore(games_viron);

  games_cheung = games.filter(function(el) {return el.corporation == "CHEUNG SHING MARS"});
  document.getElementById("games-cheung").innerHTML = games_cheung.length;
  document.getElementById("winrate-cheung").innerHTML =  corporationWinrate(games_cheung);
  document.getElementById("score-cheung").innerHTML =  corporationScore(games_cheung);

  games_point = games.filter(function(el) {return el.corporation == "POINT LUNA"});
  document.getElementById("games-point").innerHTML = games_point.length;
  document.getElementById("winrate-point").innerHTML =  corporationWinrate(games_point);
  document.getElementById("score-point").innerHTML =  corporationScore(games_point);

  games_robinson = games.filter(function(el) {return el.corporation == "ROBINSON INDUSTRIES"});
  document.getElementById("games-robinson").innerHTML = games_robinson.length;
  document.getElementById("winrate-robinson").innerHTML =  corporationWinrate(games_robinson);
  document.getElementById("score-robinson").innerHTML =  corporationScore(games_robinson);

  games_valley = games.filter(function(el) {return el.corporation == "VALLEY TRUST"});
  document.getElementById("games-valley").innerHTML = games_valley.length;
  document.getElementById("winrate-valley").innerHTML =  corporationWinrate(games_valley);
  document.getElementById("score-valley").innerHTML =  corporationScore(games_valley);

  games_vitor = games.filter(function(el) {return el.corporation == "VITOR"});
  document.getElementById("games-vitor").innerHTML = games_vitor.length;
  document.getElementById("winrate-vitor").innerHTML =  corporationWinrate(games_vitor);
  document.getElementById("score-vitor").innerHTML =  corporationScore(games_vitor);

  games_aridor = games.filter(function(el) {return el.corporation == "ARIDOR"});
  document.getElementById("games-aridor").innerHTML = games_aridor.length;
  document.getElementById("winrate-aridor").innerHTML =  corporationWinrate(games_aridor);
  document.getElementById("score-aridor").innerHTML =  corporationScore(games_aridor);

  games_arklight = games.filter(function(el) {return el.corporation == "ARKLIGHT"});
  document.getElementById("games-arklight").innerHTML = games_arklight.length;
  document.getElementById("winrate-arklight").innerHTML =  corporationWinrate(games_arklight);
  document.getElementById("score-arklight").innerHTML =  corporationScore(games_arklight);

  games_polyphemos = games.filter(function(el) {return el.corporation == "POLYPHEMOS"});
  document.getElementById("games-polyphemos").innerHTML = games_polyphemos.length;
  document.getElementById("winrate-polyphemos").innerHTML =  corporationWinrate(games_polyphemos);
  document.getElementById("score-polyphemos").innerHTML =  corporationScore(games_polyphemos);

  games_poseidon = games.filter(function(el) {return el.corporation == "POSEIDON"});
  document.getElementById("games-poseidon").innerHTML = games_poseidon.length;
  document.getElementById("winrate-poseidon").innerHTML =  corporationWinrate(games_poseidon);
  document.getElementById("score-poseidon").innerHTML =  corporationScore(games_poseidon);

  games_stormcraft = games.filter(function(el) {return el.corporation == "STORMCRAFT"});
  document.getElementById("games-stormcraft").innerHTML = games_stormcraft.length;
  document.getElementById("winrate-stormcraft").innerHTML =  corporationWinrate(games_stormcraft);
  document.getElementById("score-stormcraft").innerHTML =  corporationScore(games_stormcraft);

  games_arcadian = games.filter(function(el) {return el.corporation == "ARCADIAN COMMUNITIES"});
  document.getElementById("games-arcadian").innerHTML = games_arcadian.length;
  document.getElementById("winrate-arcadian").innerHTML =  corporationWinrate(games_arcadian);
  document.getElementById("score-arcadian").innerHTML =  corporationScore(games_arcadian);

  games_recyclon = games.filter(function(el) {return el.corporation == "RECYCLON"});
  document.getElementById("games-recyclon").innerHTML = games_recyclon.length;
  document.getElementById("winrate-recyclon").innerHTML =  corporationWinrate(games_recyclon);
  document.getElementById("score-recyclon").innerHTML =  corporationScore(games_recyclon);

  games_splice = games.filter(function(el) {return el.corporation == "SPLICE"});
  document.getElementById("games-splice").innerHTML = games_splice.length;
  document.getElementById("winrate-splice").innerHTML =  corporationWinrate(games_splice);
  document.getElementById("score-splice").innerHTML =  corporationScore(games_splice);
}

function histogram () {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(generateScoresArray());
    var options = {
      animation: {"startup": true},
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444", },
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 0}, maxValue:100 },
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 10, minValue: 80, maxValue: 140}
    };
    var chart = new google.visualization.Histogram(document.getElementById('histogram'));
    chart.draw(data, options);
  }
}

function generateScoresArray () {
  //average scores calculation for the chart headers
  var totalScores = 0
  //Generating the array for the Google histograms
  var scores = [['Corporation', 'Score']];

  for (i = 0; i < games.length; i++) {
    var score = games[i]["result"];
    var corporation = games[i]["corporation"];
    //['Ecoline', 88]
    var arr = [corporation, parseInt(score)];
    if (parseInt(score) > 20) {scores.push(arr);}
    if (parseInt(score) > 20 && parseInt(score) < 60) {console.log(games[i]["key"])}

    totalScores = totalScores + score;
  }
  return scores;
}
