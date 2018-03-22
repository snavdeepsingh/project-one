// $(document).ready(function(){
    // init carousel
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDzsha_Y7fmjvpUUwjhXObV1otIdcLlHx0",
        authDomain: "proj0324.firebaseapp.com",
        databaseURL: "https://proj0324.firebaseio.com",
        projectId: "proj0324",
        storageBucket: "",
        messagingSenderId: "978329944664"
      };
      firebase.initializeApp(config);

    // $("h1").on("click", function(){
    //     alert("Success!");
    // });

    

      function login() {
        function newLoginHappened(user){
          if(user){
            // user is signed in
            $("#login").hide();
            app(user);
          } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
          }
        }
        firebase.auth().onAuthStateChanged(newLoginHappened);
      }
    function app(user){
      // user.displayName
      // user.email
      // user.photId
      // user.uid
      
      var userName = $("<p>");
      userName.addClass("user");
      userName.text("welcome " + user.displayName);
      console.log(user.displayName);
      $("#userName").append(userName);
      
    }

    window.onload = login;
    
      
    $("#signOut").on("click", function(){
      signOut();
    })
    
   function signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
   }
  
  // ===================================================================
  // This uploads map to the map.html after user is logged in. 
   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var labelIndex = 0;
   var number = 0;
   function initialize() {
     var austin = { lat: 30.30, lng: -97.75 };
     var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 12,
       center: austin
     });

     // This event listener calls addMarker() when the map is clicked.
     google.maps.event.addListener(map, 'click', function(event) {
       addMarker(event.latLng, map);
     });

     // Add a marker at the center of the map.
     addMarker(austin, map);
   }

   // Adds a marker to the map.
   function addMarker(location, map) {
     // Add the marker at the clicked location, and add the next-available label
     // from the array of alphabetical characters.
     var marker = new google.maps.Marker({
       position: location,
       label: labels[labelIndex++ % labels.length],
       map: map
     });

     var contentString = '<div id="content">'+
         '<div id="siteNotice">'+
         '</div>'+ '<div id="playlistView"></div>'+
         '<div class="input-field col s12">' + 
         '<input placeholder="Create a playlist" id="playlistInput" type="text" class="validate">'+
         '<label for="first_name"></label>' +
         '</div>'+
         '<a type="submit" id="addPlaylist" class="btn-floating btn-large waves-effect waves-light red">' + '<i class="material-icons">+</i>'+ '</a>'+
         '<h1 id="firstHeading" class="firstHeading">'+(number++)+'</h1>'+
         '<div id="bodyContent">'+
         '<p>Barton Springs Playlist</p>'+
         '<p>Attribution: Uluru, <a href="playlist </a> '+
         '(last visited June 22, 2009).</p>'+
         '</div>'+
         '</div>';

     var infowindow = new google.maps.InfoWindow({
       content: contentString
     });
     marker.addListener('click', function() {
       infowindow.open(map, marker);
     });

     $(document).on("click", "#addPlaylist", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var playlist = $("#playlistInput").val().trim(),
          playlistBtn = $("<button>");

          playlistBtn.addClass("playlist-button");
          playlistBtn.attr("data-name");
          playlistBtn.text(playlist);
          $("#playlistView").append(playlistBtn);
          console.log(playlist);
          $("#playlistInput").val("");
    
    });
   }

   google.maps.event.addDomListener(window, 'load', initialize);

   $(document).on("click", ".firstHeading", function(e){
    $(this).text();
    console.log($(this).text());
   }) 

  // });


    