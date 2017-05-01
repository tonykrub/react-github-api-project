var React = require('react');
var Link = require('react-router').Link;    // we need React Router’s Link component. For more info, read https://github.com/ReactTraining/react-router

var GithubUser = React.createClass({
    propTypes: {
          user: React.PropTypes.object.isRequired
    },
    render: function() {
        return (  
            <div className="user-info">  
                <Link to= {"/user/" + this.props.user.login}>  
                    <img className="user-info__avatar" src= {this.props.user.avatar_url}/>
                    <h2 className="user-info__title">{this.props.user.login}</h2>
                </Link>
            </div>  
            );
    }
});


module.exports = GithubUser;
