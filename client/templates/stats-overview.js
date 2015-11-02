Template.statsOverview.onCreated(function() {
    Session.set("ROUTE_LOADED", true);
});

Template.statsOverview.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.statsOverview.helpers({
    popularity: function() {
        return Champions.find({}, {sort: {games:-1}});
    },
    winrates: function() {
        return Champions.find({}, {sort: {winrate:-1}});
    },
    championName: function() {
        var championsMap = Session.get("CHAMPIONS_DICT");
        return championsMap[this._id].name;
    }
});
