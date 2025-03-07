import * as d3 from 'd3'
import { createSvg, cleanupChart, injectStyle } from './chartCore'

/**
 * Configuration de base pour le graphique circulaire
 * @typedef {Object} RadialBarChartConfig
 * @property {number} width - Largeur du graphique
 * @property {number} height - Hauteur du graphique
 * @property {Object} colors - Configuration des couleurs
 */

const BASE_CHART_CONFIG = {
  width: 258,
  height: 263,
  colors: {
    background: '#FBFBFB',
    backgroundArc: '#ffffff',
    arc: '#FF0000',
    text: {
      score: '#282D30',
      label: '#74798C'
    }
  }
}

const createRadialBarChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config }
  let svg

  const cleanup = () => cleanupChart(containerId)

  const initialize = (data) => {
    cleanup()

    // Création du SVG via chartCore sans transformation (margin à 0)
    // puis ajout d'un groupe centré pour respecter l'original.
    const svgGroup = createSvg(containerId, {
      width: chartConfig.width,
      height: chartConfig.height,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    })
    svg = svgGroup
      .append('g')
      .attr('transform', `translate(${chartConfig.width / 2}, ${chartConfig.height / 2})`)

    // Calcul du score en pourcentage
    const score = data.score
    const scorePercentage = score * 100

    // Création de l'arc qui sera animé
    const arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(90)
      .cornerRadius(10)
      .startAngle(0)
      .endAngle((scorePercentage / 100) * 2 * Math.PI)

    // Création de l'arc de fond pour le score
    const backgroundArc = d3
      .arc()
      .innerRadius(60)
      .outerRadius(80)
      .startAngle(0)
      .endAngle(2 * Math.PI)

    // Ajout de l'arc de fond
    svg.append('path').attr('d', backgroundArc).attr('fill', chartConfig.colors.background)

    // Ajout de l'arc de score avec animation
    svg
      .append('path')
      .attr('d', arc.endAngle(0)) // Commence à 0
      .attr('fill', chartConfig.colors.arc)
      .transition() // Démarre l'animation
      .duration(1000) // Durée de l'animation
      .ease(d3.easeLinear)
      .attrTween('d', function () {
        return function (t) {
          return arc.endAngle(t * (scorePercentage / 100) * 2 * Math.PI)()
        }
      })

    // Ajout d'un cercle blanc central pour le fond du texte
    svg
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 80)
      .attr('fill', chartConfig.colors.backgroundArc)

    // Animation du texte du pourcentage
    const scoreText = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', '26px')
      .style('fill', chartConfig.colors.text.score)
      .text('0%')

    scoreText
      .transition()
      .duration(1000)
      .tween('text', function () {
        const i = d3.interpolate(0, scorePercentage)
        return function (t) {
          this.textContent = `${Math.round(i(t))}%`
        }
      })

    // Ajout des textes complémentaires
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .style('font-size', '16px')
      .style('fill', chartConfig.colors.text.label)
      .text('de votre')

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '3em')
      .style('font-size', '16px')
      .style('fill', '#74798C')
      .text('objectif')

    // Injection des styles du container via chartCore
    injectStyle(`
      .radial-bar-chart {
        background: ${chartConfig.colors.background};
        border-radius: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 258px;
        height: 263px;
      }
      
      .chart-title {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 15px;
        color: #20253A;
        margin: 0;
      }
    `)
  }

  return {
    initialize,
    cleanup
  }
}

export { createRadialBarChart }
