// Import các chức năng cần thiết từ Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    set,
    get,
    child,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCYVzO92NAQBy4LGDjJJECC_ve_QTybA38",
    authDomain: "smarthomeiot-f2a2a.firebaseapp.com",
    databaseURL:
        "https://smarthomeiot-f2a2a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smarthomeiot-f2a2a",
    storageBucket: "smarthomeiot-f2a2a.appspot.com",
    messagingSenderId: "588338496897",
    appId: "1:588338496897:web:e3c1e7ca15488e802e1480",
    measurementId: "G-C6E6E87Y7L",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const RESET_TIME = 10;


function update_array(roomid, out_chart_temp, out_chart_lux) {
    let temp = 0;
    let lux = 0;
    onValue(ref(database, `${roomid}/sensors/temperature/value`), (snapshot) => {
        const result_firebase = snapshot.val();
        temp = result_firebase;
    });

    onValue(ref(database, `${roomid}/sensors/light/value`), (snapshot) => {
        const result_firebase = snapshot.val();
        lux = result_firebase;
    });



    out_chart_lux.data.labels.push(new Date().toLocaleTimeString());
    out_chart_lux.data.datasets.forEach((dataset) => {
        dataset.data.push(lux);
    });
    if(out_chart_lux.data.labels.length > RESET_TIME) {
        out_chart_lux.data.labels.shift();
        out_chart_lux.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
    }
    out_chart_lux.update();

    out_chart_temp.data.labels.push(new Date().toLocaleTimeString());
    out_chart_temp.data.datasets.forEach((dataset) => {
        dataset.data.push(temp);
    });

    if(out_chart_temp.data.labels.length > RESET_TIME) {
        out_chart_temp.data.labels.shift();
        out_chart_temp.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
    }
    out_chart_temp.update();
}




let bedroom_chart_temp = new Chart(document.getElementById("bedroom_chart_temp"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Nhiet do",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});





let bedroom_chart_lux = new Chart(document.getElementById("bedroom_chart_lux"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Do sang",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});

let livingroom_chart_temp = new Chart(document.getElementById("livingroom_chart_temp"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Nhiet do",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});

let livingroom_chart_lux = new Chart(document.getElementById("livingroom_chart_lux"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Do sang",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});

let kitchen_chart_temp = new Chart(document.getElementById("kitchen_chart_temp"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Nhiet do",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});

let kitchen_chart_lux = new Chart(document.getElementById("kitchen_chart_lux"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Do sang",
            data: [],
            borderWidth: 1
        }]
    },

    options: {
        animation: false
    }
});



setInterval(function () {
    update_array("bedroom", bedroom_chart_temp, bedroom_chart_lux);
}, 1000);

setInterval(function () {
    update_array("livingroom", livingroom_chart_temp, livingroom_chart_lux);
}, 1000);

setInterval(function () {
    update_array("kitchen", kitchen_chart_temp, kitchen_chart_lux);
}, 1000);