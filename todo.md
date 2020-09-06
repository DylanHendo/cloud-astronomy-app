* General
    [] comments
    [X] git repo
    [] report
    [] testing

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
    [] error handling 
        [] no value entered
        [] number entered
    [X] filtering by density for neptune not working ??
        [X] it returns a dwarf planet "Makemake" with 1.4 density
        [X] && data[i].enlighsName != "136472 Makemake"

* Client
    [X] search bar
        [X] error handling
        [X] loading bar
    [X] get correctly formatted data object from server
    [X] create a grid
    [X] display data in grid
        [X] add planet name to table
    [X] display NASA image
        [X] display 2 random
    [] style box for tweets
    [X] make buttons allowing comparison between planets
        [X] add error handling
            [X] hitting buttons before planet has been searched
        [X] display some form of loading bar
        [X] find most similar
            [X] gravity
            [X] escape 
            [X] radius
            [X] density 
        [] find most different ??
            [] gravity
            [] escape 
            [] radius
            [] density

* Deployment
    [] create bare AWS instance
    [] create .env file with twitter token
    [] create dockerfile
    [] pull project from laptop to instance from GitHub
        [] store in /app directory
    [] push image to dockerhub
    [] test