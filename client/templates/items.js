var items = new ReactiveVar([]);

Template.items.onCreated(function() {
    LeagueAPI.getItems(function(err, res) {
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
        return LeagueAPI.getItemIcon(this.id+".png");
    },
    splash: "/img/items_splash.jpg"
});
