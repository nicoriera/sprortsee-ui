import * as d3 from "d3";

const BASE_CHART_CONFIG = {
  width: 300,
  height: 300,
  margin: { top: 70, right: 50, bottom: 70, left: 50 },
  colors: {
    background: "#282D30",
    polygon: "#FF0101",
    text: "#FFFFFF",
  },
};

const createRadarChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config };
  const width =
    chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const height =
    chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom;
  let svg;

  const cleanup = () => {
    d3.select(`#${containerId} svg`).remove();
  };

  const initialize = (data) => {
    cleanup();

    // Création du SVG
    svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", chartConfig.width)
      .attr("height", chartConfig.height);

    // Groupe principal avec marges
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${chartConfig.width / 2},${chartConfig.height / 2})`
      );

    // Calcul du rayon maximal
    const maxRadius = Math.min(width, height) / 2;

    // Ajout des hexagones en arrière-plan
    const backgroundHexagons = [
      { size: 1, opacity: 0.8 },
      { size: 0.8, opacity: 0.8 },
      { size: 0.6, opacity: 0.8 },
      { size: 0.4, opacity: 0.8 },
      { size: 0.2, opacity: 0.8 },
    ];

    backgroundHexagons.forEach(({ size, opacity }) => {
      const radius = maxRadius * size;
      const points = [];

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2;
        points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
      }

      g.append("path")
        .attr("d", d3.line()(points.concat([points[0]])))
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .style("opacity", opacity);
    });

    // Configuration des axes
    const features = data.map((d) => d.kind);

    // Modification du radialScale pour que le polygone reste dans les limites
    const radialScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, maxRadius * 0.4]); // Réduction de 5% pour garantir que le polygone reste dans les limites

    // Création des angles pour chaque axe
    const angleSlice = (Math.PI * 2) / features.length;

    // Création des axes
    features.forEach((feature, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const lineCoords = {
        x2: radialScale(100) * Math.cos(angle),
        y2: radialScale(100) * Math.sin(angle),
      };

      // Ajout des labels
      g.append("text")
        .attr("x", lineCoords.x2 * 3.5)
        .attr("y", lineCoords.y2 * 3)
        .attr("text-anchor", "middle")
        .attr("fill", chartConfig.colors.text)
        .style("font-size", "14px")
        .style("font-family", "Arial")
        .text(feature);
    });

    // Création du polygone des données
    const points = data.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      return {
        x: radialScale(d.value) * Math.cos(angle),
        y: radialScale(d.value) * Math.sin(angle),
      };
    });

    // Dessin du polygone
    g.append("path")
      .datum(points)
      .attr("d", (d) => {
        return d3
          .line()
          .x((d) => d.x)
          .y((d) => d.y)
          .curve(d3.curveLinearClosed)(d);
      })
      .attr("fill", chartConfig.colors.polygon)
      .attr("fill-opacity", 0.7);
  };

  return {
    initialize,
    cleanup,
  };
};

export { createRadarChart };
