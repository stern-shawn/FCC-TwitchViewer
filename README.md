# TwitchTV Viewer App - FreeCodeCamp Project
---
## 1. What This Project Does
This is an app which displays the status of a few pre-determined, popular TwitchTV viewers to the user and allows them to access a desired stream through a mouse click. While nothing too fancy, this was a great opportunity to see how I could make nested AJAX requests and then generate a list of casters to the DOM using the resulting JSON data. This was also a chance to play with implementing filtering in a list, as you have the option of showing all streamers, only active streamers, or only offline steamers!

The user stories for this project are:

* User can see whether Free Code Camp is currently streaming on Twitch.tv.
* User can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
* If a Twitch user is currently streaming, the user can see additional details about what they are streaming.
* User will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed).
* Use any libraries or APIs needed, and give it your own personal style.

Since this is my own personal project with some rather loose guidelines, it has this functionality in addition to the expected user stories:

* User can filter by and only see results within these categories: All, Active, and Offline

The originally submitted version of the app fulfilled all user stories, and the various iterations since then have been improvements either in styling or in making the code more succinct.

## 2. How To Set This Up
If you want to clone this project for yourself, the process is very simple due to the structure of the project.

1. Either manually download and unzip files to a location, or clone this repo through Git.
2. Open the index.html file in your browser. This project is built on HTML5/CSS3/JavaScript/jQuery and the necessary resources from Bootstrap and FontAwesome are linked through the HTML file, so there is no need to install any packages through NPM.

## 3. Project Goals
As one of my early web development projects, this was a chance for me to:

* Continue working with HTML/CSS for styling and creating a crisp, visually appealing user experience.
* Practice using jQuery to monitor divs and buttons for clicks and apply appropriate responses to the DOM.
* Get more experience parsing JSON data from an outside source and using it to render my own unique elements to the DOM.
* Look for opportunities to use special JavaScript functions like .map, .every, etc to make code more pure and declarative vs imperative.
* Continue producing well-documented code with repetitive functionality factored out into specific functions that minimize redundancy, keep code short, and increase readability/maintainability.

Now that I'm coming back and reviewing past projects (such as this one), my new goals in addition to supporting the previous ones are:

* Redesign the app to fit into my growing design language/styling through color, layout, animations, and reduction of unnecessary elements
* Refactor any redundancies in my JavaScript and make old code compliant with current linters (such as AirBnB's standards)

## 4. Link to Live Site
The latest version of the site can be viewed [here](https://stern-shawn.github.io/FCC-TwitchViewer/) thanks to gh-pages hosting.

## 5. Roadmap
TODO:

* ~~Figure out how to get JSON data from the TwitchTV API, and what data we get~~
* ~~Initial API call doesn't provide all necessary data for the caster, implement a nested second call to get more data...~~
* ~~Factor out creation of TwitchTV API URL since it's redundant now~~
* ~~Figure out a good format for user data and convert to html to be printed to the app~~
* ~~Stack Online casters to the top of the page, Offline casters can go to the bottom so they're grouped visually!~~
* ~~Implement filtering functionality!~~
* Restyle app
* Add animations?
