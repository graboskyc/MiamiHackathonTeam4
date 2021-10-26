const CHART_BASE_URL = "https://charts.mongodb.com/charts-team-4-htynh";
const CHART_IDS = ["6f7d891f-754c-4af4-b47a-12670fd2e76e", "5605824e-863e-4845-b657-d1c659549de1", "5f253f94-32b9-434d-8be0-cc6062775b8d"];
const CHART_ELM_IDS = ["chart-oz-remaining", "chart-window-function", "chart-bar-inventory"];
const FIELD_VALUES_BASE_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/team4-uafre/service/mongodbar/incoming_webhook/getFieldValues?filterField=";
const BOTTLE_FIELD_NAME = "bottle.Brand Label Name";
const LOCATION_FIELD_NAME = "location.barName";
const BOTTLE_ELM_ID = "bottle-filter-listener";
const LOCATION_ELM_ID = "location-filter";

async function renderChart() {
  for (i = 0; i < CHART_IDS.length; i++) {
    //console.log(`${i} ${CHART_IDS[i]} ${CHART_ELM_IDS[i]}`);
    const sdk = new ChartsEmbedSDK({
      baseUrl: CHART_BASE_URL,
      autoRefresh: true,
      maxDataAge: 60
    });

    const chart = sdk.createChart({
      chartId: CHART_IDS[i],
      height: "700px"
    });

    await chart.render(document.getElementById(CHART_ELM_IDS[i]));

    document.getElementById("refresh").addEventListener("click", () => {
      chart.refresh();
    });
    document.getElementById(BOTTLE_ELM_ID).addEventListener("change", e => {
      const bottle = e.target.value;
      const location = document.getElementById(LOCATION_ELM_ID).value;
      const bottleField = chart.options.chartId === "5f253f94-32b9-434d-8be0-cc6062775b8d" ? "Brand Label Name" : "bottle.Brand Label Name";

      const filter = {};
      if (bottle && bottle !== "all") {
        filter[bottleField] = { $regex: `^${bottle}` };
      }
      if (location && location !== "all") {
        filter[LOCATION_FIELD_NAME] = location;
      }
      console.log(filter);
      chart.setFilter(filter);
    });
    document.getElementById(LOCATION_ELM_ID).addEventListener("change", e => {
      const location = e.target.value;
      const bottle = document.getElementById(BOTTLE_ELM_ID).value;
      const bottleField = chart.options.chartId === "5f253f94-32b9-434d-8be0-cc6062775b8d" ? "Brand Label Name" : "bottle.Brand Label Name";

      const filter = {};
      if (bottle && bottle !== "all") {
        filter[bottleField] = { $regex: `^${bottle}` };
      }
      if (location && location !== "all") {
        filter[LOCATION_FIELD_NAME] = location;
      }
      console.log(filter);
      chart.setFilter(filter);
    });
  }

  initializeFilter(BOTTLE_FIELD_NAME, BOTTLE_ELM_ID);
  initializeFilter(LOCATION_FIELD_NAME, LOCATION_ELM_ID);
}

async function initializeFilter(fieldName, elmId) {
  const values = await getFieldValues(fieldName);
  updateSelectOptions(values, elmId);
}

async function getFieldValues(fieldName) {
  const url = FIELD_VALUES_BASE_URL + fieldName;

  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    // console.log(data);
    return data;
  }).catch(function (err) {
    console.warn(`Failed while getting field values from webhook: ${err}`);
  });
}

function updateSelectOptions(newOptions, selectElmId) {
  const selectElm = document.getElementById(selectElmId);

  for (i = 0; i < newOptions.length; i++) {
    var opt = document.createElement("option");
    opt.text = newOptions[i];
    opt.value = newOptions[i];
    selectElm.add(opt, null);
  }
}

renderChart().catch(e => window.alert(e.message));