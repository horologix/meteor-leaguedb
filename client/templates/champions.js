Template.champions.onCreated(function() {
    Session.set("ROUTE_LOADED", true);
});

Template.champions.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.champions.helpers({
    splash: "/img/champions_splash.jpg",
    champs: function() {
        return Session.get("CHAMPIONS");
    },
    portrait: function() {
        return LeagueAPI.getChampionPortrait(this.key);
    }
});
