import * as d3 from 'd3'
import { createSvg, cleanupChart, injectStyle, initializeTooltip } from './chartCore'

const BASE_CHART_CONFIG = {
  width: 258,
  height: 263,
  margin: { top: 70, right: 0, bottom: 50, left: 0 },
  colors: {
    text: '#20253A',
    tickText: '#9B9EAC',
    background: '#E60000',
    line: '#E60000',
    dot: '#E60000'
  }
}

/**
 * Configuration de base pour le graphique linéaire
 * @typedef {Object} LineChartConfig
 * @property {number} width - Largeur du graphique
 * @property {number} height - Hauteur du graphique
 * @property {Object} margin - Marges du graphique
 * @property {Object} colors - Configuration des couleurs
 */

/**
 * Crée un graphique linéaire pour afficher la durée moyenne des sessions
 * @param {string} containerId - ID du conteneur DOM où le graphique sera rendu
 * @param {LineChartConfig} config - Configuration optionnelle du graphique
 * @returns {Object} Objet contenant les méthodes initialize et cleanup
 */
const createLineChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config }
  const width = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right
  const height = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom

  /**
   * Nettoie le graphique existant
   */
  const cleanup = () => cleanupChart(containerId)

  /**
   * Initialise le graphique avec les données
   * @param {Array<Object>} data - Données des sessions
   * @param {number} data[].sessionLength - Durée de la session
   */
  const initialize = (data) => {
    cleanup()

    // Définition des libellés pour les jours
    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

    // Création du SVG et du groupe principal avec marges via chartCore
    const svgGroup = createSvg(containerId, {
      width: chartConfig.width,
      height: chartConfig.height,
      margin: chartConfig.margin
    })
    // Récupérer l'élément svg parent pour y insérer le background
    const svg = d3.select(svgGroup.node().parentNode)
    svg
      .insert('rect', ':first-child')
      .attr('width', chartConfig.width)
      .attr('height', chartConfig.height)
      .attr('fill', chartConfig.colors.background)
      .attr('rx', 5)
      .attr('ry', 5)

    const g = svgGroup // Le groupe retourné contient déjà la translation (marges)

    // Échelles pour l'axe X et la ligne
    const xScaleAxis = d3
      .scalePoint()
      .domain(dayLabels.map((_, i) => i))
      .range([0, width])
      .padding(0.5)

    const xScaleLine = d3
      .scalePoint()
      .domain(dayLabels.map((_, i) => i))
      .range([0, width])
      .padding(0)

    // Échelle pour l'axe Y
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sessionLength) * 1.1])
      .range([height, 0])

    // Génération de la ligne avec une courbe CatmullRom
    const line = d3
      .line()
      .x((d, i) => xScaleLine(i))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveCatmullRom.alpha(0.5))

    // Création du chemin avec animation
    const path = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('d', line)

    // Animation du tracé de la ligne
    const pathLength = path.node().getTotalLength()
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0)

    // Animation des points
    const dots = g.append('g').style('opacity', 0)
    dots
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScaleLine(i))
      .attr('cy', (d) => yScale(d.sessionLength))
      .attr('r', 0)
      .attr('fill', 'white')
      .transition()
      .delay(2000)
      .duration(500)
      .attr('r', 4)

    // Création du tooltip via chartCore
    initializeTooltip(containerId, {
      className: 'tooltip',
      backgroundColor: '#FFFFFF',
      padding: '7px 10px',
      borderRadius: '2px'
    }).then((tooltip) => {
      tooltip
        .style('font-size', '10px')
        .style('font-weight', '500')
        .style('color', '#000000')
        .style('text-align', 'center')
        .style('min-width', '39px')
        .style('pointer-events', 'none')

      // Création de la zone de hover permanente
      const hoverBackground = g
        .append('rect')
        .attr('class', 'hover-background')
        .attr('width', 0)
        .attr('height', chartConfig.height)
        .attr('fill', 'rgba(0, 0, 0, 0.2)')
        .attr('y', -chartConfig.margin.top)
        .attr('transform', `translate(0, 0)`)
        .style('opacity', 0)

      // Zone de hover pour afficher le tooltip
      g.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mousemove', (event) => {
          const [mouseX] = d3.pointer(event, g.node())
          const xPos = Math.max(0, Math.min(mouseX, width))
          const index = Math.round((xPos / width) * (data.length - 1))
          const dataPoint = data[index]

          if (dataPoint) {
            // Afficher les points
            dots.style('opacity', 1)

            // Mettre à jour le tooltip
            const containerRect = d3.select(`#${containerId}`).node().getBoundingClientRect()
            const tooltipX = event.clientX - containerRect.left + 10
            const tooltipY = event.clientY - containerRect.top - 40

            tooltip
              .style('opacity', 1)
              .html(`${dataPoint.sessionLength} min`)
              .style('left', `${tooltipX}px`)
              .style('top', `${tooltipY}px`)

            // Mettre à jour la zone de hover avec transition
            hoverBackground
              .style('opacity', 1)
              .attr('x', xPos)
              .attr('width', width - xPos)
              .transition()
              .duration(200)
              .style('opacity', 0.5)
          }
        })
        .on('mouseout', () => {
          dots.style('opacity', 0)
          tooltip.style('opacity', 0)
          hoverBackground.transition().duration(200).style('opacity', 0)
        })
    })

    // Axe X avec libellés
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScaleAxis).tickFormat((d) => dayLabels[d]))
      .call((gEl) => {
        gEl.selectAll('.domain').remove()
        gEl.selectAll('.tick line').remove()
        gEl
          .selectAll('.tick text')
          .style('fill', 'white')
          .style('font-size', '12px')
          .style('font-weight', '500')
      })

    // Titre du graphique
    g.append('text')
      .attr('x', 30)
      .attr('y', -18)
      .attr('text-anchor', 'start')
      .style('fill', 'rgba(255, 255, 255, 0.5)')
      .style('font-size', '15px')
      .style('font-weight', '500')
      .text('Durée moyenne des')

    g.append('text')
      .attr('x', 30)
      .attr('y', -0)
      .attr('text-anchor', 'start')
      .style('fill', 'rgba(255, 255, 255, 0.5)')
      .style('font-size', '15px')
      .style('font-weight', '500')
      .text('sessions')

    // Injection du style via chartCore
    injectStyle(`
      .line-chart {
        background: ${chartConfig.colors.background};
        border-radius: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 258px;
        height: 263px;
      }
    `)
  }

  return {
    initialize,
    cleanup
  }
}

export { createLineChart }
