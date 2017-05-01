var React = require('react');
var $ = require("jquery");
var GithubUser = require('./GithubUser');

// to do step 1 of this exercise, you also need to go to file User.jsx to add access token. And in the User.jsx, we added the access token in the componentDidMount function. Got the access token from https://github.com/settings/tokens/new 

var GithubRepo = React.createClass({
    
    propTypes: {
          user: React.PropTypes.object.isRequired
    },
    getInitialState: function() {   
        return (
            {}    
        );
    },                
    fetchData: function() {    
        var that = this;          // because below in .getJSON we use this.setState inside a function. But this.setState is REACT's function which exists outside any specific function As per the previous exercise's instruction under "NOTE" of "components and AJAX", You are going to run into trouble when trying to use this.setState inside the callback of your jQuery AJAX call. That's because the callback is a new function and creates a new this context, so you lose the this that you had access to in the componentDidMount outer function. The way to fix this problem is to set this = that 
                      // in the below link , we need to add '/followers' during step 4 of the exercise.
        $.getJSON( `https://api.github.com/users/${this.props.params.username}/repos?access_token=05e8ce22dd6fc73e385971d4e10c489f54145097`, function(data) {  // for the step 1 of the exercise, we need to add the access token in the link as well otherwise it would not work.  Regarding how to pass the access token, read http://stackoverflow.com/questions/16526211/how-should-a-client-pass-a-facebook-access-token-to-the-server   // use getJSON as per the instruction of the previous exercise. For the format of getJSON, got it from http://api.jquery.com/jquery.getjson/
             // in the above getJSON, if you want to use this.props.params.username as variable inside the link, you need to wrap this.props.params.username with {} with $ in the front, like what is done above. And don't forget to use ``(back tick) to wrap the whole link.
            console.log(data);  // need to console.log(data) here to see (in the dev tool) what information is inside the data object, so that we know what will be the names that we will after dot in order to access it.
            that.setState({      // For step 1 of the exercise, here you need to include the access token into the api link. You also need to go to file User.jsx to add the access token there as well in the componentDidMount function of the User.jsx file, because that function is where we make AJAX call in that file. My access token is 05e8ce22dd6fc73e385971d4e10c489f54145097. Got the access token from https://github.com/settings/tokens/new 
                repos: data  
            });
            console.log(data);
        });
    },
    componentDidMount: function() {   
        this.fetchData();   
    },
//     componentDidUpdate(prevProps) {         // For more info on componentDidUpdate, read https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/postrender_with_componentdidupdate.html. However the code that is used in this link is not entirely the same as what is written below
//   // only update if the data has changed    
//         if (prevProps.params.username !== this.props.params.username) { 
//             this.fetchData();
//         }
//     },
    render: function() {
     
        if(!this.state.repos) {   
            return (<div>LOADING REPOS...</div>);
        }
    
        else {
            return (  // // we need to add "star" as per the picture workshop's instruction. http://www.w3schools.com/charsets/ref_utf_symbols.asp
                <div className="repos-page">
                    <h2>Public Repos of {this.props.params.username}</h2>
                        <div>
                            <ul>
                                {this.state.repos.map(function(eachRepo) {
                                return(
                                  <div>
                                    <a href = {eachRepo.html_url}>
                                      {eachRepo.full_name} 
                                    </a><span> </span>
                                    <span>{eachRepo.stargazers_count} &#9733;</span>
                                  </div>
                                );
                                })}              
                            </ul>
                        </div>
                    </div>
                );  
        }
    }
});



module.exports = GithubRepo;


