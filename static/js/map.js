require([
    "esri/widgets/Search",
    "esri/layers/CSVLayer",
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/Print",
    "esri/widgets/Legend",
    "esri/widgets/Expand"
], (Search, CSVLayer, MapView, Map, Print, Legend, Expand) => {
    const url =
        "http://localhost:9999/files/getCSVFile";

    const template = {
        title: "Accident Info",
        content: "CausedBy {CausedBy} , Date {Date}."
    };

    const csvLayer = new CSVLayer({
        url: url,
        popupTemplate: template,
        title: "Car Accidents",
        definitionExpression: (localStorage.getItem("userGroup") === "fullAccess") ? "1=1" : "Severity IN('Minor','Moderate')"
    });

    let renderer = {
        type: "unique-value",  // autocasts as new UniqueValueRenderer()
        field: "Severity",
        defaultSymbol: { type: "simple-marker" },
        legendOptions: {
            title: "Accidents Severity",
        },
        uniqueValueInfos: [{
            value: "Minor",
            symbol: { type: "simple-marker", outline: { style: "none", color: [113, 88, 88, 0.5] }, color: [249, 255, 25, 1] }
        }, {
            value: "Moderate",
            symbol: { type: "simple-marker", outline: { style: "none", color: [113, 88, 88, 0.5] }, color: [245, 112, 112, 1] }
        }, {
            value: "Severe",
            symbol: { type: "simple-marker", outline: { style: "none", color: [113, 88, 88, 0.5] }, color: [244, 117, 32, 1] }
        }, {
            value: "Death",
            symbol: { type: "simple-marker", outline: { style: "none", color: [113, 88, 88, 0.5] }, color: [237, 49, 49, 1] }
        }]
    };

    csvLayer.renderer = renderer;
    
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        center: [54.465792, 24.440883],
        zoom: 12,
        map: map
    });

    map.add(csvLayer);

    const searchWidget = new Search({
        view: view,
        includeDefaultSources: false,
        sources: [
            {
                layer: csvLayer,
                searchFields: ["CausedBy","AccidentID"],
                suggestionTemplate: "ID: {AccidentID}, CausedBy: {CausedBy}",
                displayField: "CausedBy",
                exactMatch: false,
                outFields: ["*"],
                name: "Accidents",
                zoomScale: 800,
                placeholder: "Search By CausedBy or Accident ID",
                locationEnabled:false
            }
        ]
    });

    // Add the search widget to the top left corner of the view
    view.ui.add(searchWidget, {
        position: "top-right"
    });

    view.ui.add("PrintMapDiv", "top-left");

    const legend = new Expand({
        content: new Legend({
            view: view,
            style: "card" // other styles include 'classic'
        }),
        view: view,
        expanded: true
    });
    view.ui.add(legend, "bottom-left");

    
  document.querySelector("#PrintMapDiv").addEventListener("click", function () {
    let options = {
        width: 794,
        height: 1123
      };
      view.takeScreenshot(options).then(function(screenshot) {
        let imageElement = document.querySelector("#mapImage");
        imageElement.src = screenshot.dataUrl;
        $('#printModal').modal('show');
      });
  });

  document.querySelector("#printBtn").addEventListener("click", function () {
    printJS(document.querySelector("#mapImage").src, 'image')
  });
});