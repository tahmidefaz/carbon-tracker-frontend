import React, {useState, useEffect, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from './Table';
import { VictoryPie } from "victory";
import { VictoryAxis, VictoryTheme, VictoryChart, VictoryBar } from "victory";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions({data,props}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dates = data.date;
  const values = data.values;
  const [total, setTotal] = useState(0);
  const [chartValues, setChartValues] = useState([]);
  const [pie, setPie] = useState([]);

  useEffect(() => {
    calculateTotal();

  },[]);

  function calculateTotal(){
    var emissionTotal = 0;
    var vals = [];
    var p = [];
    var p2 = {};
    for (var i in values){
      emissionTotal = emissionTotal + parseFloat(values[i].emission);
      vals.push(values[i].name);
      p2['x'] = values[i].name;
      p2['y'] = values[i].emission;
      p.push(p2);
      p2={};
    }
    setTotal(emissionTotal.toFixed(2));
    setChartValues(vals);
    setPie(p);
  }

  const columns = useMemo(()=>[
    {
      Header: "Name",
      accessor: "name"
    },{
      Header:"Info",
      accessor:"info"
    },{
      Header: "Emission",
      accessor:"emission"
    }
  ])


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (

    <div className={classes.root}>

      <Accordion expanded={expanded === dates} onChange={handleChange(dates)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{dates}</Typography>
          <Typography className={classes.secondaryHeading}>Total Daily Footprint: {total}</Typography>
        </AccordionSummary>
        <AccordionDetails>


          <Table columns={columns} data={values} />


        <VictoryPie
          data={pie}
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
        />


        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
