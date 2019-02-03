import React, { Component } from 'react';
import Constants from './utils/Constant';
import Loader from './component/loader';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: new Date(),
      trending : [],
      clickedPosts : [],
      showtPosts : [],
      selectedLang : [],
      defaulPosts : [],
      isLoading : true
    };
  }

  componentDidMount(){
    this.getTop10PopularTags();
    this.getDefaultPosts();
  }

  getTop10PopularTags = () => {
    let _this = this;
    fetch(`${Constants.API_HOST}/getTrending`,Constants.getAuthConfig())
    .then(function (response) {
        return response.json();
    })
    .then(function (resJson) {
        _this.setState({
          trending : resJson
        });
    }).catch(function (err) {
        console.log(err);
    });
  }

  getDefaultPosts = () => {
    let _this = this;
    fetch(`${Constants.API_HOST}/tech`,Constants.getAuthConfig())
    .then(function (response) {
        return response.json();
    })
    .then(function (resJson) {
        _this.setState({
          showtPosts : resJson,
          defaulPosts : resJson,
          isLoading : false
        });
    }).catch(function (err) {
        console.log(err);
    });
  }

  getAllPosts = () => {
    
  }

  handleClick = (event) => {
    window.scrollTo(0, 0);
    this.setState({
      isLoading : true,
    });
    let val = event.target.value;
    let arr = this.state.selectedLang;
    if(arr.indexOf(val) == -1){
      let _this = this;
      arr.push(val);
      fetch(`${Constants.API_HOST}/lang/${val}`,Constants.getAuthConfig())
      .then(function (response) {
          return response.json();
      })
      .then(function (resJson) {
          _this.setState({
            showtPosts : resJson,
            selectedLang : arr,
            isLoading : false
          });
      }).catch(function (err) {
          console.log(err);
      });
    }else{
      let defPost = this.state.defaulPosts;
      this.setState({
        selectedLang : [],
        showtPosts : defPost
      });
    }
  }

  render() {
    var date = moment().format("Do MMM,HH:MMA");
    var trend = this.state.trending;
    var posts = this.state.showtPosts ? this.state.showtPosts : [];
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
      <div className="container">
        <div className="headerParent">
          <div className="header">
            <h2>Meta News</h2>
          </div>
          <div className="dateTime">
            <h3 style={{fontSize:14}}>{date}</h3>
          </div>
        </div>
        <div className="autoCompleteParent">
            <input type="text" id="autoComplete" name="autoComplete" className="autoComplete" placeholder="Type to search"/>
        </div>
        <h3 className="tagLine">Here's your latest news feed</h3>
        {
          !this.state.isLoading && posts && posts.length > 0 ? (<div>
          {
              posts.map((object,i) => {
              var con = object.content.replace(/(<([^>]+)>)/ig,"");
              if(con.indexOf('Continue reading on') > -1)
                con = con.substring(0, con.indexOf('Continue reading on'))
              return (
                <div key={i} className="main-content">
                  <h3>{object.title}</h3>
                  <p>{renderHTML(con)}</p>
                  <p className="readMore"><a href={object.link} target="_blank">Read More</a> at {object.website}</p>
                </div>
              );
            })
          }
          </div> ) : (<div className="loaderReact">
                        <Loader type='bubbles'  color='#7c52a6' />
                    </div>)
        }
        <h3 className="customtags">Here's most popular tags</h3>
        <div className="row tags">
            {
              trend.map((object, i) => {
                return (
                <div key={i} className="roundedBox col-lg-2 col-md-6 col-sm-3 col-xs-4">
                  <input type="button" className="button button1 btn-block" value={object} onClick={(e) => this.handleClick(e)}/>
                </div>
                );
              })
            }
        </div>
        <p style={{textAlign:'center'}}>>----------/></p>
      </div>
    );
  }
}

export default App;
