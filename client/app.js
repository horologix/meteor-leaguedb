Session.set("CHAMPIONS", null);
Session.set("CHAMPIONS_DICT", null);
Session.set("CHAMPIONS_LOADED", false);
Session.set("ROUTE_LOADED", false);

LeagueAPI.getChampions(function(err, res) {
    var arr = _.map(res.data.data, function(v) {return v;});
    arr.sort(function(a,b) {return a.name>b.name?1:-1;});
    Session.set("CHAMPIONS", arr);

    var obj = {};
    _.each(res.data.data, function(v, k) {obj[""+v.id] = v;});
    Session.set("CHAMPIONS_DICT", obj);
    Session.set("CHAMPIONS_LOADED", true);
});

//--------------------------------------------------------------------------------

var loaded = function() {
    return Session.get("ROUTE_LOADED") && Session.get("CHAMPIONS_LOADED");
};

Template.app.helpers({
    loaded: function() {
        return loaded();
    },
    showLoaded: function() {
        return loaded()?"block":"none";
    }
});
