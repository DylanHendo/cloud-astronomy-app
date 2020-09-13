* General
    [] comments
    [X] git repo
    [] report

* Server
    [X] get correct data back from NASA
        [X] randomise image/s chosen
    [X] get correct data back from OpenData
        [X] only send data going in table
    [X] get correct data back from Twitter
        [X] randomise tweet/s chosen
        [X] create .env for token
    [X] package data up in an object
    [X] send data to client
    [X] error handling 
        [X] no value entered
        [X] number entered
    [X] filtering by density for neptune not working ??
        [X] it returns a dwarf planet "Makemake" with 1.4 density
        [X] && data[i].enlighsName != "136472 Makemake"

* Client
    [] window.location.origin
    [] error msg when clicking button with no previous data
    [X] click on NASA img to take u to NASA site
    [X] search bar
        [X] error handling
        [X] loading bar
    [X] get correctly formatted data object from server
    [X] create a grid
    [X] display data in grid
        [X] add planet name to table
    [X] display NASA image
        [X] display 2 random
    [X] style boxes for tweets
    [X] make buttons allowing comparison between planets
        [X] add error handling
            [X] hitting buttons before planet has been searched
        [X] display some form of loading bar
        [X] find most similar
            [X] gravity
            [X] escape 
            [X] radius
            [X] density 
        [X] find most different 
            [X] gravity
            [X] escape 
            [X] radius
            [X] density

* Deployment
    [] create bare AWS instance
    [] create .env file with twitter token
        [] vi .env
            [] TOKEN=xxxxxxx
    [] create dockerfile
        [] client
        [] server
        [] docker compose
    [] pull code from GitHub to ec2
    [] build / compose
    [] push image to dockerhub
    [] test
        [] pulling
        [] running