var runes = new ReactiveVar([]);

Template.runes.onCreated(function() {
    LeagueAPI.getRunes(function(err, res) {
        runes.set(_.map(res.data.data, function(v) {return v;}).reverse());
        Session.set("ROUTE_LOADED", true);
    });
});

Template.runes.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.runes.helpers({
    runes: function() {
        return runes.get();
    },
    icon: function() {
        return LeagueAPI.getRuneIcon(this.image.full);
    },
    splash: "/img/runes_splash.jpg"
});
