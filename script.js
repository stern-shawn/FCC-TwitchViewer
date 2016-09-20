// Array of generally active casters including freecodecamp by default
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];

// URLs to get channel status vs channel info like the user icon, etc are different, so instead of having two
// locations where we manually create the URL lets factor it into a function...
function makeTwitchURL(type, user) {
  // API now requires a user account for Client-ID before content can be accessed
  return 'https://api.twitch.tv/kraken/' + type + '/' + user + '?client_id=ltzn231aztgg1154evnm33ojt7rfob0&callback=?';
}

// Grab stream information for each channel and format/display on the screen
function getChannels() {
  // Lets change .forEach to .map for stylistic/performance reasons
  channels.map(function(channel) {
    $.getJSON(makeTwitchURL('streams', channel), function(data) {
      // console.log(data);
      // Track if the stream is up/closed for sorting purposes, and if so what's currently being streamed
      var status, currGame;

      if (data.stream === null) {
        console.log("User " + channel + " is not currently streaming...");
        status = "offline";
        currGame = "offline";
      } else if (data.stream === undefined) {
        console.log("User " + channel + " does not exist or is closed...");
        status = "offline";
        currGame = "Account Not Found";
      } else {
        console.log("User " + channel + " is streaming!");
        status = "online";
        currGame = data.stream.game;
      }

      // console.log("Status: " + status);
      // console.log("Streaming: " + currGame);

      // Now that we have the basic channel status info, lets grab more personalized data
      $.getJSON(makeTwitchURL('channels', channel), function(streamerData) {
        // console.log(streamerData);
        // Set channel information if available, otherwise use a placeholder or something similar
        // Looks like instead of ternary, I can use OR logic instead. If the keys don't exist, OR will default to the right-hand value!
        // Dummy image syntax: https://dummyimage.com/[Image height/width]/[Background color in hex]]/[Text color in hex].jpg/&text=[text to render]
        var logo = streamerData.logo || 'https://dummyimage.com/100/fff/222.jpg/&text=X';
        var name = streamerData.display_name || channel;
        var url = streamerData.url || 'https://twitch.tv/';

        // console.log(logo);
        // console.log(name);

        var html = "<a href='" + url +
                    "' target='_blank'><div class='row streamer " + status + "'>" +
                    "<div class='col-xs-2 col-sm-1 text-center'><img src='" + logo + "' class='img-responsive casterLogo'></div>" +
                    "<div class='col-xs-10 col-sm-4 text-center'>" + name + "</div>" +
                    "<div class='col-xs-10 col-sm-7 text-center'>" + currGame + "</div>" +
                    "</div></a>";

        // offline streamers should go to the bottom of the list (append) and active should be at the top (prepend)
        status === "offline" ? $('#fillMe').append(html) : $('#fillMe').prepend(html);
      });
    });
  });
}

$(document).ready(function(){
  // On load, populate the page
  getChannels();

  // Monitor filter buttons for clicks and modify visibility accordingly
  $('.filter').click(function() {
    // console.log("Click");
    // console.log("Set filter to " + $(this).attr('id'));

    // Grab the id of the selected button
    var setFilterTo = $(this).attr('id');

    // Apply/Remove the hidden class to toggle visibility of streamers
    if (setFilterTo === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (setFilterTo === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else if (setFilterTo === "offline") {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });
});
