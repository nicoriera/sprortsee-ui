import * as d3 from "d3";

export const BASE_CHART_CONFIG = {
  margin: { top: 70, right: 30, bottom: 30, left: 30 },
  width: 900,
  height: 300,
  colors: {
    text: "#20253A",
    tickText: "#9B9EAC",
    legendText: "#74798C",
    weight: "#282D30",
    calories: "#E60000",
  },
};

export const createActivityChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config };
  const width =
    chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const height =
    chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom;
  let svg = null;
  let tooltip = null;
  let scales = null;

  const cleanup = () => {
    d3.select(`#${containerId} svg`).remove();
    d3.select(".tooltip").remove();
  };

  const createSvg = () => {
    return d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", chartConfig.width)
      .attr("height", chartConfig.height)
      .append("g")
      .attr(
        "transform",
        `translate(${chartConfig.margin.left},${chartConfig.margin.top})`
      );
  };

  const createTooltip = () => {
    return d3
      .select(`#${containerId}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", chartConfig.colors.calories)
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");
  };

  const handleTooltip = (event, data) => {
    tooltip
      .style("opacity", 1)
      .html(`${data.kilogram}kg<br>${data.calories}kCal`)
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 28}px`);
  };

  const createScales = (data) => ({
    x: d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.day))
      .padding(0.8),
    yKilogram: d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.kilogram) - 1,
        d3.max(data, (d) => d.kilogram) + 1,
      ])
      .range([height, 0]),
    yCalories: d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.calories)])
      .range([height, 0]),
  });

  const setupAxes = () => {
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(scales.x))
      .call((g) => {
        g.selectAll(".domain").remove();
        g.selectAll(".tick line").remove();
        g.selectAll(".tick text")
          .style("fill", chartConfig.colors.tickText)
          .style("font-size", "14px")
          .style("font-weight", "500");
      });

    svg
      .append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(scales.yKilogram).ticks(3))
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll(".tick line")
          .attr("x2", -width)
          .attr("stroke", "#DEDEDE")
          .attr("stroke-dasharray", "2,2");
        g.selectAll(".tick text")
          .attr("x", 10)
          .style("fill", chartConfig.colors.tickText)
          .style("font-size", "14px")
          .style("font-weight", "500");
      });
  };

  const addBars = (data) => {
    const barsGroup = svg.append("g");
    const dayGroups = barsGroup
      .selectAll(".day-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "day-group");

    // Barres de poids
    dayGroups
      .append("rect")
      .attr("x", (d) => scales.x(d.day) + scales.x.bandwidth() * 0.1)
      .attr("y", (d) => scales.yKilogram(d.kilogram))
      .attr("width", scales.x.bandwidth() * 0.35)
      .attr("height", (d) => height - scales.yKilogram(d.kilogram))
      .attr("fill", chartConfig.colors.weight)
      .attr("rx", 5)
      .attr("ry", 5);

    // Barres de calories
    dayGroups
      .append("rect")
      .attr("x", (d) => scales.x(d.day) + scales.x.bandwidth() * 0.55)
      .attr("y", (d) => scales.yCalories(d.calories))
      .attr("width", scales.x.bandwidth() * 0.35)
      .attr("height", (d) => height - scales.yCalories(d.calories))
      .attr("fill", chartConfig.colors.calories)
      .attr("rx", 5)
      .attr("ry", 5);

    // Zone de hover
    dayGroups
      .append("rect")
      .attr("x", (d) => scales.x(d.day))
      .attr("y", 0)
      .attr("width", scales.x.bandwidth())
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mouseover", handleTooltip)
      .on("mouseout", () => tooltip.style("opacity", 0))
      .on("mousemove", handleTooltip);
  };

  const addLegend = () => {
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 250}, -10)`);

    // Poids
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", -35)
      .attr("r", 4)
      .attr("fill", chartConfig.colors.weight);

    legend
      .append("text")
      .attr("x", 10)
      .attr("y", -30)
      .text("Poids (kg)")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .style("fill", chartConfig.colors.legendText);

    // Calories
    legend
      .append("circle")
      .attr("cx", 100)
      .attr("cy", -35)
      .attr("r", 4)
      .attr("fill", chartConfig.colors.calories);

    legend
      .append("text")
      .attr("x", 110)
      .attr("y", -30)
      .text("Calories brûlées (kCal)")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .style("fill", chartConfig.colors.legendText);
  };

  const initialize = (data) => {
    cleanup();
    svg = createSvg();
    tooltip = createTooltip();
    scales = createScales(data);

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -40)
      .text("Activité quotidienne")
      .style("font-size", "15px")
      .style("font-weight", "400")
      .style("fill", chartConfig.colors.text);

    setupAxes();
    addBars(data);
    addLegend();
  };

  return {
    initialize,
    cleanup,
  };
};
