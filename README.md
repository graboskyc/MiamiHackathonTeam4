# Miami Hackathon Team4 - MongoDBar

![](Assets/header.png)
**MongoDBar**: _A simple (and fun!) way to look at an IOT use case._

# Background
The MongoDB Enterprise SA team would like to attend their next QBR in Aruba. However Mark needs to accurately account for liquor consumption during the trip.

To handle this, Team 4 has built the "MongoDBar" application. It allows for IOT-enabled liquor bottles to accurately record number of shots poured over time for each bottle in the bar.

# Participants
* Matt Davis - Data modeling and mgenerate
* Chris Grabosky - Realm Sync, Readme
* Robbert Kauffman - Search, Charts, Web UI
* Sahil Kedar - Data modeling and Window Functions
* Peter Kim - Triggers and Charts

# Components
* MongoDB **Atlas** for data retention
* MongoDB 5.0 **Time Series Collections** for measurements
* MongoDB `$setWindowFields`
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
* `mgeneratejs` is installed - instructions here:  https://github.com/rueckstiess/mgeneratejs

## Atlas 

* using Compass or `mongoimport` to insert `Data/inventory.json` into `mongodbar.inventory`
* Create the `mongodbar.pours` Time Series Collection:
```
  use mongodbar
  
  db.createCollection("pours",
     {
       timeseries: {
         timeField: "pourTime",
         metaField : "bottle"
       }
     }
   )
   ```
* Run mgenerate.js to generate the initial data in 'mongodbbar.pours':
`mgenerate.js Data/iot.json -100 | mongoimport --uri "mongodb+srv://user:pwd@atlas_cluster/mongodbar" --collection pours`

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

![](Screenshots/01.png)

![](Screenshots/02.png)

![](Screenshots/03.png)

## Search

* Create the following indexes in Atlas:

**autocomplete**

```
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "Brand Label Name": {
        "type": "autocomplete"
      }
    }
  }
}
```

## Set up Charts
* Enable charts for your project
* From within the Charts UI, press the green down arrow next to `Add Dashboard` and choose `Import Dashboard`
* Upload the `Charts\ MongoDBar - Dashboard.json`

## Website
* Open the Realm App that was imported earlier
  * Go to `Third Party Services`
    * Select the `mongodbar` service
      * Select the `autocomplete` webhook
        * Click on the `Settings` tab and scroll down to the `Webhook URL` and copy it
        * Open the file `RealmExport/hosting/files/js/autocomplete.js` and edit line 20 to use the URL that was copied
      * Select the `getFieldValues` function
        * Click on the `Settings` tab and scroll down to the `Webhook URL` and copy it
        * Open the file `RealmExport/hosting/files/js/charts.js` and edit line 4 to use the URL that was copied, and add `?filterField=";` to the end of the line so that it reads `...incoming_webhook/getFieldValues?filterField=";`
* Import the realm app again to the same App ID and overwrite any existing functions
* Go back to the Realm App and navigate to `Hosting`
  * Copy the listed URL and open it in your browser to view the dashboard / website
* All done!
