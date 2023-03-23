(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 12) {

                if (h < 10) {
                h = "0" + h;
                }

                if (m < 10) {
                    m = "0" + m;
                }

                if (s < 10) {
                    s = "0" + s;
                }

                c.innerHTML = h + ":" + m + ":" + s + " AM";
            } else {
                h= h%12;
                if (h < 10) {
                h = "0" + h;
                }

                if (m < 10) {
                    m = "0" + m;
                }

                if (s < 10) {
                    s = "0" + s;
                }

                c.innerHTML = h + ":" + m + ":" + s + " PM";
            }
            
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        if (document.getElementById("fname").value==="" || document.getElementById("lname").value ==="") {
            alert("Nimi või perekonnanimi on puudu");
            return;
        } else if (/[0-9]/.test(document.getElementById("fname").value) || /[0-9]/.test(document.getElementById("lname").value)){
            alert("Nimi või perekonnanimi ei tohi sisaldada numbreid");
            return;
        } else if (!document.getElementById("r1").checked && !document.getElementById("r2").checked) {
            alert("Vali vähemalt üks tarne kohalejõudmisaeg");
            return;
        }
        
        let linn = document.getElementById("linn");
        let summa = 0;
        if (document.getElementById("v1").checked){
            summa+= 5;
        }
        if (document.getElementById("v2").checked){
            summa += 1;
        }
        if (document.getElementById("r1").checked){
            summa += 2;
        }
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            e.innerHTML = "x,xx &euro;";
            return;
        } else if (linn.value === "tln") {
            e.innerHTML= summa + " €";
        } else if (linn.value === "trt" || linn.value === "nrv") {
            e.innerHTML= summa +2.5+ " €";
        } else if (linn.value="prn") {
            e.innerHTML= summa +3+ " €";
        } else{
            e.innerHTML = "0,00 &euro;";
        } 
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map 
//API AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak

let mapAPIKey = "Ajbxya_NJXuN2IMHdnESambvKqUBf0Y4lLtfifPoqpxHWx9zwFnHZxFWuEHqN1g";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true
    });
    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="headerr" class="headerr">Tartu Ülikool</h1>' +
    '<div id="tekst">' +
    "<p><b>Tartu Ülikooli</b> peahoone asub Tartu kesklinnas aadressil Ülikooli tänav 18. " +
    "See on üks silmapaistvamaid klassitsistliku arhitektuuri " +
    "näiteid Eestis. Traditsiooniliselt on peahoones asunud rektoraat ja " +
    "muud administratiivüksused ja humanitaarteaduskonnad.</p>" +
    '<p>Attribution: Taru Ülikool, <a href="https://et.wikipedia.org/wiki/Tartu_%C3%9Clikooli_peahoone"></p>"' +
    "</div>" +
    "</div>";

    const infowindow = new Microsoft.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Tartu Ülikool",
      });
    
    /*let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });*/
    const marker = new Microsoft.maps.Marker({
        position: uluru,
        map,
        title: "Tartu Ülikool",
    });

    marker.addListener("click", () => {
        infowindow.open({
        anchor: marker,
        map,
        });
    });

    map.entities.push(pushpin);

}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

