import React, {useMemo, useEffect, useState} from "react";
import Table from './Table';
import ControlledAccordions from './Accordion';
import axios from 'axios';


function CarbonDisplay(props){
	const testdata = require('./Resources/testdata.json');
	const results = useState(testdata['data']);
	const [data,setData] = useState([]);

	

	let axiosConfig = {
		headers: {
			'x-identity':'test'
		}
	};

	useEffect(() => {

		(async () => {
			await getEmissionsData();
		})().catch(error => {
			console.log(error);
		});
	},[]);

	async function getEmissionsData(){
		await axios.get('https://carbon-tracker-ec6o7ozhzq-uc.a.run.app/footprint', axiosConfig).then(response => {
			console.log(response);
			var holdData = {};
			var values = []
			var g = {};
			var data = response.data.data;
			for (var i in data){
				Object.entries(data[i]).map((k,v) => {
					console.log(k);
					holdData['date'] = k[0];
					holdData['values'] = k[1];
					
				})
				values.push(holdData);
				holdData = {};
			}
		setData(values);
			

		}).catch(error => {
			console.log(error);
		})
	}


	return(<div className="container">
	<h1>Carbon Tracker</h1>
		<div className="container">
		{
    Object.keys(data).map((k,v) => {
      return(
        <ControlledAccordions data = {data[k]}/>
        )
        
      })

  }
		

	</div>
	</div>)
	
}

export default CarbonDisplay;