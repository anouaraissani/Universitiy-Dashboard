loadData();

function loadData(){	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);			
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();
	
	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
			update_GroupedBars(jsonData3);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
			update_Pie(jsonData4);
		}
	};
	httpRequest4.send();

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData5 = JSON.parse(httpRequest5.response);
			update_Pie2(jsonData5);
		}
	};
	httpRequest5.send();
}

function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nbr;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {

		  labels: labels,
		  datasets: [
			{
			  label: "nombre",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			  
			  data: data
			
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		 
		}
	});
}

function update_Lines(jsonData){
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				
			},
			legend:{
				position:'top'
			}
		}
	});
}


function update_GroupedBars(jsonData){
	var labels = jsonData.years;		
	
	var data = jsonData.datasets;
	
    new Chart(document.getElementById("groupedBars-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: data
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		 
		}
	});
}

function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nbr;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Nombre d'étudiants",
			backgroundColor: ["#63b2fc", "#fd7575","#fdd463"],
			borderColor: "#363636",
			data: data
		  }]
		},
		options: {
			responsive: false,
			maintainAspectRatio: true,
			title: {
			  display: false,
			},
			legend:{
			  position:'right'
			}
		}
	});	
}

function update_Pie2(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nbr;
	});
	
	new Chart(document.getElementById("pie2-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Nombre d'étudiants",
			backgroundColor: ["#FF7597", "#03DAC6","#c190fc"],
			borderColor: "#363636",
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}


