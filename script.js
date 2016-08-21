// Array of generally active casters including freecodecamp by default
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];

// URLs to get channel status vs channel info like the user icon, etc are different, so instead of having two
// locations where we manually create the URL lets factor it into a function...
function makeTwitchURL(type, user) {
  return 'https://api.twitch.tv/kraken/' + type + '/' + user + '?callback=?';
}

// Grab stream information for each channel and format/display on the screen
function getChannels() {
  channels.forEach(function(channel) {
    $.getJSON(makeTwitchURL('streams', channel), function(data) {
      // console.log(data);
      // Track if the stream is up/closed for sorting purposes, and if so what's currently being streamed
      var status, currGame;

      if (data.stream === null) {
        console.log("User " + channel + " is not currently streaming...");
        status = "Offline";
        currGame = "Offline";
      } else if (data.stream === undefined) {
        console.log("User " + channel + " does not exist or is closed...");
        status = "Offline";
        currGame = "Account Not Found";
      } else {
        console.log("User " + channel + " is streaming!");
        status = "Online";
        currGame = data.stream.game;
      }

      // console.log("Status: " + status);
      // console.log("Streaming: " + currGame);

      // Now that we have the basic channel status info, lets grab more personalized data
      $.getJSON(makeTwitchURL('channels', channel), function(streamerData) {
        // console.log(streamerData);
        // Set channel information if available, otherwise use a placeholder or something similar
        var logo = streamerData.hasOwnProperty('logo') ? streamerData.logo : 'https://dummyimage.com/80/fff/222.jpg/&text=X';
        var name = streamerData.hasOwnProperty('display_name') ? streamerData.display_name : channel;
        var url = streamerData.hasOwnProperty('url') ? streamerData.url : 'https://twitch.tv/';

        // console.log(logo);
        // console.log(name);

        var html = "<a href='" + url +
                    "' target='_blank'><div class='row streamer " + status + "'>" +
                    "<div class='col-xs-2 col-sm-1 text-center' id='logo'><img src='" + logo + "' class='img-responsive img-thumbnail casterLogo'></div>" +
                    "<div class='col-xs-10 col-sm-4 text-center'>" + name + "</div>" +
                    "<div class='col-xs-10 col-sm-7 text-center'>" + currGame + "</div>" +
                    "</div></a>";

        // Offline streamers should go to the bottom of the list (append) and active should be at the top (prepend)
        status === "Offline" ? $('#fillMe').append(html) : $('#fillMe').prepend(html);
      });
    });
  });
}

$(document).ready(function(){
  getChannels();

  $('.filter').click(function() {
    // console.log("Click");
    // console.log("Set filter to " + $(this).attr('id'));

    // Grab the id of the selected button
    var setFilterTo = $(this).attr('id');

    // Apply/Remove the hidden class to toggle visibility of streamers
    if (setFilterTo === "all") {
      $(".Online, .Offline").removeClass("hidden");
    } else if (setFilterTo === "online") {
      $(".Online").removeClass("hidden");
      $(".Offline").addClass("hidden");
    } else if (setFilterTo === "offline") {
      $(".Offline").removeClass("hidden");
      $(".Online").addClass("hidden");
    }
  });
});
