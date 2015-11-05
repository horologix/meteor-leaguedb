var spells = new ReactiveVar([]);

Template.spells.onCreated(function() {
    LeagueAPI.getSpells(function(err, res) {
        spells.set(_.map(res.data.data, function(v) {return v;}));
        Session.set("ROUTE_LOADED", true);
    });
});

Template.spells.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.spells.helpers({
    spells: function() {
        return spells.get();
    },
    icon: function() {
        return LeagueAPI.getSpellIcon(this.image.full);
    },
    splash: "/img/spells_splash.jpg"
});
