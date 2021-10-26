# Miami Hackathon Team4

_A simple (and fun!) way to look at an IOT use case._

# Background
The MongoDB Enterprise SA team would like to attend their next QBR in Aruba. However Mark needs to accurately account for liquor consumption during the trip.

To handle this, Team 4 has built the "MongoDBar" application. It allows for IOT-enabled liquor bottles to accurately record number of shots poured over time for each bottle in the bar.

# Components
* MongoDB **Atlas** for data retention
* MongoDB 5.0 **Time Series Collections** for measurements
* MongoDB **Realm** to allow the bottles to write offline-first readings and sync to Atlas
* Realm App Services **Triggers** to handle alerting, data movement, and inventory control
* MongoDB **Charts** for reporting
* HTML5/CSS/JS dashboard to allow for searching liquor inventory with **Atlas Search**
* **Realm Hosting** to store the dashboards

# Data
## Data models
insert here

## Data flow
put swim lane diagram here

# Set up
## Prerequisites

* MongoDB Atlas Account
* IP Whitelist configured for API access
* Some knowledge of Realm and Charts


## Getting Started

After you configure your Atlas account set up your database by downloading inventory.json and put them into a database called 'mongodbar' and collection called 'inventory'.  Then add your IOT data using pours.json into the database called 'mongodbar' and collection called 'pours'......

ACTION AND DELETE : upload inventory.json and pours.json


### Set up Search

(
You need a search index for numerous reasons:
* exact names/spelling of beverages may not be known. 
* the bottle info was brought in in ALL CAPS.  Making typical searching cumbersome and error prone.  

).....


### Set up Trigger

.......


### Set up Charts


.......
