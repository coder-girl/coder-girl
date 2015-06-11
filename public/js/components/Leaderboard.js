'use strict';

var React = require('react/addons');
var LeaderboardActions = require('../actions/LeaderboardActions');
var LeaderboardStore = require('../stores/LeaderboardStore');
var Router = require('react-router');
var Modal = require('react-modal');
var appElement = document.getElementById('app');



Modal.setAppElement(appElement);




var Leaderboard = React.createClass({

  displayName: 'Leader Board View',
  mixins: [Router.State, Router.Navigation],

  // Parses querystring in URL
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  getInitialState: function(){   
    // The pictures array will be populated via AJAX
    //Default instagram key is app client id
    return { 
      pictures: [],
      username: '',
      modalIsOpen: false,
      modalPicSrc: '',
      currentModalPicIndex: 0,
      modalUser: '',
      modalPicArray: [],
      modalUserUrl: ''
    };
  },

  openModal: function(recentPic, allPics, modalUser, url) {
    this.setState({
      modalIsOpen: true,
      modalPicSrc: recentPic,
      modalPicArray: allPics,
      modalUser: modalUser,
      modalUserUrl: url,
    });

  },


  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  advancePic: function(){
    var index;

    if(this.state.modalPicArray[this.state.currentModalPicIndex + 1]){
      index = this.state.currentModalPicIndex + 1;
    } else {
      index = 0
    }

    this.setState({
      currentModalPicIndex: index,
      modalPicSrc: this.state.modalPicArray[index]
    })
  },

  _onChange : function(){
    this.setState ({
      pictures: LeaderboardStore.getPictures()
    });
  },

  componentDidMount: function(){

    LeaderboardStore.addChangeListener(this._onChange);
    var username = this.getParameterByName("name");

    this.setState({
      username: username
    });
    //If have a username in params, send an AJAX request to the server to get the signed in user's instagram access toekn.
    if(username){
      LeaderboardActions.getAccessToken(username);
    } else {
      //If don't have a user who signed in with instagram, just go ahead and get top scorers
      LeaderboardActions.getTopScorers();
    }
  },



  componentWillUnmount: function() {
    LeaderboardStore.removeChangeListener(this._onChange);
  },


  showUser: function(id){
    var node = React.findDOMNode(this.refs[id]);

    $(node).toggle();
  },



  render: function() {

    var self = this;
    var evens = this.state.pictures.filter(function(item, index){ return index % 2 === 0});
    var odds = this.state.pictures.filter(function(item, index){return index %2 !== 0});



    var evenPictures = evens.map(function(p, index){
      return (
              <li key={p.id} className="card-list-item" onMouseEnter={self.showUser.bind(null, p.id)} onMouseLeave={self.showUser.bind(null, p.id)}>
                <div className="custom-card" >
                  <div>
                    <Modal 
                      isOpen={self.state.modalIsOpen}
                      onRequestClose={self.closeModal}
                    >
                      <div className="picModal">
                        <a href={self.state.modalUserUrl} target="new"><p className="modalUser">{self.state.modalUser}</p></a>
                        <a><img onClick={self.advancePic} src={self.state.modalPicSrc} /></a>
                        <button className="closeModalButton" onClick={self.closeModal}>close</button>
                      </div>
                    </Modal>
                  </div>
                  <div className="picture"  >
                  <a>
                    <img onClick={self.openModal.bind(null, p.src, p.allPics, p.username, p.url)} ref={p.id} src={p.src} title={p.title} />
                  </a>
                  </div>
                  <div ref={p.id} className="custom-card-divider">
                   <div>{p.username}</div>
                    <div>{p.score} Points</div>
                  </div>
                </div>
              </li>
            )
    });



    var oddPictures = odds.map(function(p){
      return (
              <li key={p.id} className="card-list-item" onMouseEnter={self.showUser.bind(null, p.id)} onMouseLeave={self.showUser.bind(null, p.id)}>
                <div className="custom-card">
                  <div>
                    <Modal 
                      isOpen={self.state.modalIsOpen}
                      onRequestClose={self.closeModal}
                    >
                      <div className="picModal">
                        <a href={self.state.modalUserUrl} target="new"><p className="modalUser">{self.state.modalUser}</p></a>
                        <a><img onClick={self.advancePic} src={self.state.modalPicSrc} /></a>
                        <button className="closeModalButton" onClick={self.closeModal}>close</button>
                      </div>
                    </Modal>
                  </div>
                  <div className="picture" >
                  <a>
                    <img onClick={self.openModal.bind(null, p.src, p.allPics, p.username, p.url)} ref={p.id} src={p.src} title={p.title} />
                  </a>
                  </div>
                  <div ref={p.id} className="custom-card-divider">
                   <div>{p.username}</div>
                    <div>{p.score} Points</div>
                  </div>
                </div>
              </li>
            )
    });

    if (!evenPictures.length){
      evenPictures = <p>Loading images...</p>;
    }

    return (
      <div className="leaderboard-container">
        <h4 className="leaderboard-header">Leaderboard</h4>
        <div className="grid-block">
          <div className="grid-block columnContainer">
            <ul className="grid-content"> {evenPictures} </ul>
          </div>
          <div className="grid-block columnContainer">
            <ul className="grid-content"> {oddPictures}</ul> 
          </div> 
        </div>     
      </div>
    );
  }

});


module.exports = Leaderboard;




