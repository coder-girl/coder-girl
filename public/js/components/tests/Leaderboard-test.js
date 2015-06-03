// Leaderboard-test.js

jest.dontMock('../Leaderboard');

describe('callforImages', function() {
  it('calls into $.ajax with correct params', function() {
    var $ = require('../../../../dist/bower_components/jquery/dist/jquery');
    var LeaderBoard = require('../Leaderboard');
    var instagramKey = require('../../../env/config').INSTAGRAM_CLIENT_ID;

    function dummyCallBack() {};
    Leaderboard.getPics(dummyCallBack); 
    

    expect($.ajax).toBeCalledWith({
      type:'GET',
      url:'https://api.instagram.com/v1/users/' + coder-girl + '/media/recent/?client_id='  + instagramKey,
      success:jasmine.any(Function)
    });
  });
});
