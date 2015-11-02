var REQUEST_LIMIT = 50;

// TODO: filter matches by ranking
function populateMatches() {
    Matches.remove({});
    var seed = "25850956";
    var visitedPlayers = {};
    var visitedMatches = {};
    var requestCount = 0;

    var visitPlayer = function(summonerId) {
        if(Object.keys(visitedPlayers).length >= REQUEST_LIMIT) return;
        if(summonerId in visitedPlayers) return;
        visitedPlayers[summonerId] = true;

        LeagueAPI.getRecentMatches(summonerId, function(err, res) {
            requestCount++;
            if(requestCount === REQUEST_LIMIT)
                onFinish();

            if(!res.data.games) return;
            var matches = res.data.games;
            matches.forEach(function(match) {
                if(match.gameId in visitedMatches) return;
                visitedMatches[match.gameId] = true;
                Matches.insert(match);
                match.fellowPlayers.forEach(function(player) {
                    visitPlayer(player.summonerId);
                });
            });
        });
    };

    visitPlayer(seed);

    function onFinish() {
        calculateWinrates();
    }
}

function Champion(championId) {
    this._id = ""+championId;
    this.wins = 0;
    this.losses = 0;
}

function calculateWinrates() {
    Champions.remove({});
    var champions = {};

    var matches = Matches.find();
    matches.forEach(function(match) {
        var blueTeamWin = (match.stats.teamId === 100) ^ !match.stats.win;
        match.fellowPlayers.forEach(function(player) {
            var win = blueTeamWin ^ (player.teamId === 200);
            champions[player.championId] = champions[player.championId] || new Champion(player.championId);
            if(win) {
                champions[player.championId].wins++;
            }
            else {
                champions[player.championId].losses++;
            }
        });
    });

    _.each(champions, function(champion) {
        champion.games = champion.wins+champion.losses;
        champion.winrate = champion.wins/champion.games;
        Champions.insert(champion);
    });

    console.log(JSON.stringify(champions,null,4));
}

Meteor.startup(populateMatches);
