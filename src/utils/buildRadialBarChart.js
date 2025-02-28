import * as d3 from "d3";

const BASE_CHART_CONFIG = {
  width: 300,
  height: 300,
  margin: { top: 70, right: 50, bottom: 70, left: 50 },
  colors: {
    background: "#FBFBFB",
    backgroundArc: "#ffffff",
    arc: "#FF0000",
    text: {
      score: "#282D30",
      label: "#74798C",
    },
  },
};

const createRadialBarChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config };

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
      .attr("height", chartConfig.height)
      .append("g")
      .attr(
        "transform",
        `translate(${chartConfig.width / 2}, ${chartConfig.height / 2})`
      );

    // Calcul du score en pourcentage
    const score = data.score;
    const scorePercentage = score * 100;

    // Création de l'arc
    const arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(90)
      .cornerRadius(10)
      .startAngle(0)
      .endAngle((scorePercentage / 100) * 2 * Math.PI);

    // Création de l'arc de fond
    const backgroundArc = d3
      .arc()
      .innerRadius(60)
      .outerRadius(80)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    // Ajout de l'arc de fond
    svg
      .append("path")
      .attr("d", backgroundArc)
      .attr("fill", chartConfig.colors.background);

    // Ajout de l'arc de score
    svg.append("path").attr("d", arc).attr("fill", chartConfig.colors.arc);

    // Ajout d'un cercle blanc central pour le fond du texte
    svg
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 80) // Même taille que innerRadius
      .attr("fill", chartConfig.colors.backgroundArc);

    // Ajout du texte central
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "26px")
      .style("fill", chartConfig.colors.text.score)
      .text(`${scorePercentage}%`);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .style("font-size", "16px")
      .style("fill", chartConfig.colors.text.label)
      .text("de votre");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "3em")
      .style("font-size", "16px")
      .style("fill", "#74798C")
      .text("objectif");

    // Ajout des styles CSS
    const styles = document.createElement("style");
    styles.textContent = `
      .radial-bar-chart {
        background: #FBFBFB;
        border-radius: 5px;
        padding: 20px;
        position: relative;
      }
      
      .chart-title {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 15px;
        color: #20253A;
        margin: 0;
      }
    `;
    document.head.appendChild(styles);
  };

  return {
    initialize,
    cleanup,
  };
};

export { createRadialBarChart };
