import * as d3 from "d3";

const BASE_CHART_CONFIG = {
  width: 300,
  height: 300,
  margin: { top: 70, right: 0, bottom: 50, left: 0 },
  colors: {
    text: "#20253A",
    tickText: "#9B9EAC",
    background: "#E60000",
    line: "#E60000",
    dot: "#E60000",
  },
};

const createLineChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config };
  const width =
    chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const height =
    chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom;
  let svg;

  const cleanup = () => {
    d3.select(`#${containerId} svg`).remove();
    d3.select(".tooltip").remove();
  };

  const initialize = (data) => {
    cleanup();

    // Définition des libellés pour les jours
    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

    svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", chartConfig.width)
      .attr("height", chartConfig.height);

    // Fond rouge avec border-radius
    svg
      .append("rect")
      .attr("width", chartConfig.width)
      .attr("height", chartConfig.height)
      .attr("fill", "#FF0000")
      .attr("rx", 5)
      .attr("ry", 5);

    // Groupe principal avec marges
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${chartConfig.margin.left},${chartConfig.margin.top})`
      );

    // Utilisation des index pour les échelles X (pour garantir l'affichage de tous les jours)
    const xScaleAxis = d3
      .scalePoint()
      .domain(dayLabels.map((_, i) => i))
      .range([0, width])
      .padding(0.5);

    const xScaleLine = d3
      .scalePoint()
      .domain(dayLabels.map((_, i) => i))
      .range([0, width])
      .padding(0);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sessionLength) * 1.1])
      .range([height, 0]);

    // Génération de la ligne
    const line = d3
      .line()
      .x((d, i) => xScaleLine(i))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveCatmullRom.alpha(0.5));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Points (initialement cachés)
    const dots = g.append("g").style("opacity", 0);

    dots
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => xScaleLine(i))
      .attr("cy", (d) => yScale(d.sessionLength))
      .attr("r", 4)
      .attr("fill", "white");

    // Création du tooltip
    const tooltip = d3
      .select(`#${containerId}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "10px")
      .style("border-radius", "2px")
      .style("pointer-events", "none")
      .style("font-size", "12px");

    // Zone de hover pour le tooltip
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mousemove", (event) => {
        dots.style("opacity", 1);
        const [mouseX] = d3.pointer(event);
        const index = Math.floor(mouseX / (width / dayLabels.length));
        const dataPoint = data[index];
        if (dataPoint) {
          tooltip
            .style("opacity", 1)
            .html(`${dataPoint.sessionLength} min`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        }
      })
      .on("mouseout", () => {
        dots.style("opacity", 0);
        tooltip.style("opacity", 0);
      });

    // Axe X avec des libellés mappés
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScaleAxis).tickFormat((d) => dayLabels[d]))
      .call((gEl) => {
        gEl.selectAll(".domain").remove();
        gEl.selectAll(".tick line").remove();
        gEl
          .selectAll(".tick text")
          .style("fill", "white")
          .style("font-size", "12px")
          .style("font-weight", "500");
      });

    // Titre du graphique
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "15px")
      .style("font-weight", "500")
      .text("Durée moyenne des sessions");
  };

  return {
    initialize,
    cleanup,
  };
};

export { createLineChart };
