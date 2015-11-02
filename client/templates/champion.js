var champ = new ReactiveVar({});

Template.champion.onCreated(function() {
    LeagueAPI.getChampion(this.data._id, function(err, res) {
        res.data.lore = _.map(res.data.lore.split("<br>"), function(v) {return {text:v};});
        champ.set(res.data);
        Session.set("ROUTE_LOADED", true);
    });
});

Template.champion.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.champion.helpers({
    champ: function() {
        return champ.get();
    },
    psprite: function() {
        return LeagueAPI.getPassiveIcon(this.image.full);
    },
    ssprite: function() {
        return LeagueAPI.getSkillIcon(this.image.full);
    },
    skin: function() {
        return LeagueAPI.getChampionPortrait(champ.get().key, this.num);
    },
    splash: function() {
        return LeagueAPI.getChampionSplash(champ.get().key);
    }
});
