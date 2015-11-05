Router.configure({
    layoutTemplate: "app"
});

Router.route("champions", {
    path: "/"
});

Router.route("champion", {
    path: "/champion/:_id",
    data: function() {
        return {
            _id: this.params._id
        };
    }
});

Router.route("items", {
    path: "/items"
});

Router.route("runes", {
    path: "/runes"
});

Router.route("spells", {
    path: "/spells"
});

Router.route("stats-overview", {
    path: "/stats"
});
