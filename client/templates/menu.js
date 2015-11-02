var links = [
    {name: "champions", text: "Champions", icon:"fa fa-fw fa-group"},
    {name: "items", text: "Items", icon:"fa fa-fw fa-flask"},
    {name: "stats-overview", text: "Stats", icon:"fa fa-fw fa-bar-chart"}
];

Template.menu.helpers({
    selected: function() {
        var name = Router.current().route.getName();
        return name===this.name||name+"s"===this.name?"selected":"";
    },
    links: links
});
