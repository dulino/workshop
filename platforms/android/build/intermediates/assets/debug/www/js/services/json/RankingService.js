var RankingService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "http://oldpoapoker.dulino.com/rankingcomdescartes/3";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findAll = function() {
        return $.ajax({url: url});
    }

}