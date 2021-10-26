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

# Data Models and Data Flow
[See details here](Assets/DataModel.md)

# Set up
## Prerequisites

* MongoDB Atlas Account
* Atlas Cluster Deployed (named Team4)
* You have access to a server running Linux and Docker with this repo cloned onto it
* Charts enabled

## Atlas 
* import lsdjgkljsdklglksdgjlksdgjklsg into `mongodbar.inventory` and `mongodbbar.pours`
* Run mgenerate.js to generate the initial data in 'mongodbbar.pours':
  'mgenerate.js iot.json -100 | mongoimport --uri "mongodb+srv://user:pwd@atlas_cluster/mongodbar" --collection pours

## Realm
* Install the Realm-CLI
* Generate a Realm-CLI API Key
* Do a Realm-CLI import on the `RealmExport` directory (note that if cluster name is not `Team4` you need to edit `RealmExport/data_sources/mongodb-atlas/config.json` and change `config.clusterName`)
* This will create a new realm app
* Confirm that hosting is enabled in Realm portal
* Confirm API key authentication is enabled. 
* Generate a authentication API key and save it for use in the next section
* Confirm sync is running

## Containers
* Copy `sample.env` in both the `Broker` and `Generator` directories to `.env` respectively 
* Edit each file and fill in the Realm API key, Realm App ID in the Broker and the IP address of the machine running Docker in the Generator
* Run the `build.sh` script in the Broker first and check log output to confirm it connected
* Once successfully running `build.sh` in the Generator directory
* Confirm output logs that it is writing readings every ~30 seconds
* You should see 4 containers running representing a MQTT broker and 3 simulated IOT liquor pouring sensors

## Website
* Ensure hosting is enabled
* Change the App ID in `sdjgsdjgkldsgkljg`
* Upload the `sdkjklsdjkljsgdkl` folder to Realm Hosting

## Search

dfjhkldfjhlkdfhkljfdhkl

(
You need a search index for numerous reasons:
* exact names/spelling of beverages may not be known. 
* the bottle info was brought in in ALL CAPS.  Making typical searching cumbersome and error prone.  

).....


## Set up Charts

dfdfkhjdlfkhjkldfjh
