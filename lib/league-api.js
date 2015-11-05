var apiUrl = "https://na.api.pvp.net/api/lol";
var apiKey = "87d97aa6-ad56-4ed5-9b99-5c2db0a1c724";
var imgUrl = "http://ddragon.leagueoflegends.com/cdn";

LeagueAPI = function(region) {
    this.endpoints = {
        static: "/static-data/"+region+"/v1.2",
        recent: "/"+region+"/v1.3/game/by-summoner"
    };
    this.imageEndpoints = {
        splash: "/img/champion/splash",
        portrait: "/img/champion/loading",
        passive: "/5.21.1/img/passive",
        skill: "/5.21.1/img/spell",
        item: "/5.21.1/img/item",
        rune: "/5.21.1/img/rune",
        spell: "/5.21.1/img/spell"
    };
};

LeagueAPI.prototype.craftUrl = function(endpoint, path) {
    return apiUrl+this.endpoints[endpoint]+path+"api_key="+apiKey;
};

LeagueAPI.prototype.craftImgUrl = function(endpoint, path) {
    return imgUrl+this.imageEndpoints[endpoint]+path;
};

LeagueAPI.prototype.getRecentMatches = function(summonerId, callback) {
    var url = this.craftUrl("recent", "/"+summonerId+"/recent?");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getChampions = function(callback) {
    var url = this.craftUrl("static", "/champion?champData=image&");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getChampion = function(champId, callback) {
    var url = this.craftUrl("static", "/champion/"+champId+"?champData=all&");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getItems = function(callback) {
    var url = this.craftUrl("static", "/item?");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getRunes = function(callback) {
    var url = this.craftUrl("static", "/rune?runeListData=image&");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getSpells = function(callback) {
    var url = this.craftUrl("static", "/summoner-spell?spellData=image&");
    HTTP.call("GET", url, callback);
};

LeagueAPI.prototype.getChampionSplash = function(champId, n) {
    n = n || 0;
    return this.craftImgUrl("splash", "/"+champId+"_"+n+".jpg");
};

LeagueAPI.prototype.getChampionPortrait = function(champId, n) {
    n = n || 0;
    return this.craftImgUrl("portrait", "/"+champId+"_"+n+".jpg");
};

LeagueAPI.prototype.getPassiveIcon = function(path) {
    return this.craftImgUrl("passive", "/"+path);
};

LeagueAPI.prototype.getSkillIcon = function(path) {
    return this.craftImgUrl("skill", "/"+path);
};

LeagueAPI.prototype.getItemIcon = function(path) {
    return this.craftImgUrl("item", "/"+path);
};

LeagueAPI.prototype.getRuneIcon = function(path) {
    return this.craftImgUrl("rune", "/"+path);
};

LeagueAPI.prototype.getSpellIcon = function(path) {
    return this.craftImgUrl("spell", "/"+path);
};

LeagueAPI = new LeagueAPI("na");
