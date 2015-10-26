Template.champions.onCreated(function() {
    Session.set("ROUTE_LOADED", true);
});

Template.champions.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.champions.helpers({
    splash: "http://na.leagueoflegends.com/sites/default/files/upload/art/teambuilder-wallpaper.jpg",
    champs: function() {
        return Session.get("CHAMPIONS");
    },
    portrait: function() {
        return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+this.key+"_0.jpg";
    }
});
