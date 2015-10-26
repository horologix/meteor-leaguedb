Session.set("API_URL", "https://na.api.pvp.net/api/lol/static-data/na/v1.2/");
Session.set("API_KEY", "api_key=87d97aa6-ad56-4ed5-9b99-5c2db0a1c724");

Session.set("ROUTE_LOADED", false);
Session.set("VERSION", null);
Session.set("CHAMPIONS", null);
Session.set("CHAMPIONS_LOADED", false);

var url = Session.get("API_URL")+"champion?champData=image&"+Session.get("API_KEY");
HTTP.call("GET", url, function(err, res) {
    var arr = _.map(res.data.data, function(v) {return v;});
    arr.sort(function(a,b) {return a.name>b.name?1:-1;});
    Session.set("VERSION", res.data.version);
    Session.set("CHAMPIONS", arr);
    Session.set("CHAMPIONS_LOADED", true);
    console.log("champ data loaded");
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
