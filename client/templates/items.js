var items = new ReactiveVar([]);

Template.items.onCreated(function() {
    var url = Session.get("API_URL")+"item?"+Session.get("API_KEY");
    HTTP.call("GET", url, function(err, res) {
        items.set(_.map(res.data.data, function(v) {return v;}));
        console.log(items.get());
        Session.set("ROUTE_LOADED", true);
    });
});

Template.items.onDestroyed(function() {
    Session.set("ROUTE_LOADED", false);
});

Template.items.helpers({
    items: function() {
        return items.get();
    },
    icon: function() {
        return "http://ddragon.leagueoflegends.com/cdn/"+Session.get("VERSION")+"/img/item/"+this.id+".png";
    },
    splash: "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Heimerdinger_0.jpg"
});
