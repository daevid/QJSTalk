var request = require('request');
var _ = require('lodash');
(function compareGithubRepos(){
    var firstRepoList;
    var secondRepoList;
    function handleResponse(error, response, body){
        var thirdRepoList;
        if(!firstRepoList){
            firstRepoList = body;
            return;
        }
        if(!secondRepoList){
            secondRepoList = body;
            return;
        }
        thirdRepoList = body;
        printLikeProjects(firstRepoList, secondRepoList, thirdRepoList);
    }
    request(githubRepoFor('rhagigi'), handleResponse);
    request(githubRepoFor('khemikale'), handleResponse);
    request(githubRepoFor('unusualbob'), handleResponse);
})();


function printLikeProjects(first, second, third){
    var matchingRepos = getLikeProjects(first, second, third);
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