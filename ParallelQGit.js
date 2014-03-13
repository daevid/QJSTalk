var request = require('request');
var _ = require('lodash');
var Q = require('q');
(function compareGithubRepos(){
    var firstRepoPromise = Q.nfcall(request, githubRepoFor('rhagigi')).then(returnSecondArgument);
    var secondRepoPromise = Q.nfcall(request, githubRepoFor('khemikale')).then(returnSecondArgument);
    var thirdRepoPromise = Q.nfcall(request, githubRepoFor('unusualbob')).then(returnSecondArgument);

    return Q.all( [ firstRepoPromise, secondRepoPromise, thirdRepoPromise ] )
        .spread( printLikeProjects ).done();
})();

function returnSecondArgument(response){
    return response[2];
}

function printLikeProjects(first, second, third){
    var matchingRepos = getLikeProjects(first, getLikeProjects(second,third));
    _.forEach(matchingRepos, function(repo){
        console.log(repo.name);
    });
}
function getLikeProjects(first, second){
    return _.filter(first, function(firstRepo){
        return _.any(second, function(secondRepo){
            return firstRepo.name === secondRepo.name;
        });
    });
}

function githubRepoFor(username) {
    var options = {
        url: 'https://api.github.com/users/' + username + '/repos?per_page=100',
        json: true,
        headers: {
            'User-Agent': 'Atlanta Node.js Meetup - Royi Hagigi'
        }
    };
    return options;
}