var imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/";
var imgUrl2 = "http://ddragon.leagueoflegends.com/cdn/5.21.1/img/";
var champ = new ReactiveVar({
    
});

Template.champion.onCreated(function() {
    var url = Session.get("API_URL")+"champion/"+this.data._id+"?champData=all&"+Session.get("API_KEY");
    HTTP.call("GET", url, function(err, res) {
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
        return imgUrl2+"passive/"+this.image.full;
    },
    ssprite: function() {
        return imgUrl2+"spell/"+this.image.full;
    },
    skin: function() {
        return imgUrl+"loading/"+champ.get().key+"_"+this.num+".jpg";
    },
    splash: function() {
        return imgUrl+"splash/"+champ.get().key+"_0.jpg";
    }
});
