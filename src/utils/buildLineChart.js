import * as d3 from 'd3'
import { createSvg, cleanupChart, injectStyle, createTooltip } from './chartCore'

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

const createLineChart = (containerId, config = {}) => {
  const chartConfig = { ...BASE_CHART_CONFIG, ...config }
  const width = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right
  const height = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom

  const cleanup = () => cleanupChart(containerId)

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
    const tooltip = createTooltip(containerId, {
      className: 'tooltip',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '2px'
    })
    tooltip.style('font-size', '12px')

    // Zone de hover pour afficher le tooltip
    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .on('mousemove', (event) => {
        dots.style('opacity', 1)
        const [mouseX] = d3.pointer(event)
        const index = Math.floor(mouseX / (width / dayLabels.length))
        const dataPoint = data[index]
        if (dataPoint) {
          tooltip
            .style('opacity', 1)
            .html(`${dataPoint.sessionLength} min`)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`)
        }
      })
      .on('mouseout', () => {
        dots.style('opacity', 0)
        tooltip.style('opacity', 0)
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
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '15px')
      .style('font-weight', '500')
      .text('Durée moyenne des sessions')

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
