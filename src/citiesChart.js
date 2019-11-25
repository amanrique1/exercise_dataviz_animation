import React, { Component } from 'react';
import * as d3 from "d3";

export default class citiesChart extends Component {

    state = {
        data: [
            { name: "Medellín", w2005: 3, w2006: 33 },
            { name: "Cali", w2005: 39, w2006: 45 },
            { name: "Bogotá", w2005: 7, w2006: 31 },
            { name: "Pereira", w2005: 35, w2006: 36 },
            { name: "Bucaramanga", w2005: 16, w2006: 23 },
            { name: "Cúcuta", w2005: 45, w2006: 45 },
            { name: "Armenia", w2005: 6, w2006: 16 }
        ],
        year: 2005,
        x: "",
        y: "",
        iheight: "",
        g: null
    }

    componentDidMount() {
        this.drawChart(this.state.data)
    }

    drawChart(data) {
        const svg = d3.select(this.refs.canvas).append("svg")
            .attr("width", 400)
            .attr("height", 200)
            .style("border-color", "black")
            .style("border-style", "solid")
            .style("border-width", "1px");
        //código de la gráfica
        let numMayor = 45;
        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        let bars = g.selectAll("rect").data(data);

        const y = d3.scaleLinear()
            .domain([0, numMayor])
            .range([iheight, 0]);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1);

        if (this.state.year === 2005) {
            bars.enter().append("rect")
                .attr("class", "bar")
                .style("fill", "steelblue")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.w2005))
                .attr("height", d => iheight - y(d.w2005))
                .attr("width", x.bandwidth())
        } else {
            bars.enter().append("rect")
                .attr("class", "bar")
                .style("fill", "steelblue")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.w2006))
                .attr("height", d => iheight - y(d.w2006))
                .attr("width", x.bandwidth())
        }
        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
        this.setState({ x: x, y: y, g: g, iheight: iheight });
    }

    changeChart = (e,year) => {
        let g=this.state.g;
        let bars = g.selectAll("rect").data(this.state.data);
        let x=this.state.x;
        let y=this.state.y;  
        let iheight=this.state.iheight;
        if (year === 2005) {


            bars.style("fill", "steelblue")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.w2005))
                .attr("height", d => iheight - y(d.w2005))
                .attr("width", x.bandwidth())
        }
        else {

            bars.style("fill", "black")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.w2006))
                .attr("height", d => iheight - y(d.w2006))
                .attr("width", x.bandwidth())
        }
        this.setState({year:year});
    }

    render() {
        return (
            <div>
                <button id="start" onClick={e => this.changeYear(e, "2005")}>2005</button>
                <button id="reset" onClick={e => this.changeYear(e, "2005")}>2006</button>
                <div ref="canvas">

                </div>
            </div>
        );
    }
}
