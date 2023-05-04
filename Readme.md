# Helsinki city bike app

[Pre-assignment](https://github.com/solita/dev-academy-2023-exercise) for Solita Dev Academy 2023.
 

## Prerequisites
To compile amd run the project, Docker and Docker compose need to be installed. 

## Configurations
- Data files need to be added to `/data` folder. Data files:
    * https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
    * https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
    * https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
    * https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
- To run application run `docker-compose up` in root folder and open [http://localhost:7777](http://localhost:7777). It takes a few seconds for the application to show. 

## Technology choices
- Deno runtime: I got familiar with this runtime when I did Web software development course from Aalto university. I like that with Deno libraries are imported by code from URIs as opposed to installing packages through npm like with Nodejs. 
- Oak framework: this framework was also introduced in Web software development course. I chose to use this framework over Deno native simply because it makes the code look cleaner. 
- PostgreSQL: The database used in this project is PostgreSQL. This was chosen because it was the database system that I am familiar with. 
- Bootstrap: I chose Bootstrap for the frontend because it was quick and easy to use. It makes the pages look consistent and adds responsiveness. 
- Docker: I chose to containerize the project so that running it would be easier with just one command.

## Implemented features
The project uses PostgreSQL database to store journey and station information. 
 
Journeys shows 100 random bike trips made. Information for each journey includes departure and return stations, distance in km and duration in minutes. Journeys can also be searched by departure or return station. Search is not case sensitive and can be only a part of the station name, e.g. searching for "aalto" return search results for "Aalto-yliopisto (M), Korkeakouluaukio" and "Aalto-yliopisto (M), Tietotie".

Stations lists all bike stations in Helsinki and Espoo. Stations are separated by city. There is also a search bar that works the same way as in Journeys. 
 
Each station has the address for the station and statistics about the journeys. The statistics are filterable by month (may, june and july or all three months). Statistics include number of journeys to and from the station, average distance of journeys and top 5 departure and return stations for journeys ending or starting at the station.