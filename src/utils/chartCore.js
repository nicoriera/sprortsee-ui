import * as d3 from 'd3'

export const createSvg = (containerId, { width, height, margin }) =>
  d3
    .select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

export const cleanupChart = (containerId) => {
  d3.select(`#${containerId} svg`).remove()
  d3.selectAll('.tooltip').remove()
}

export const injectStyle = (styleContent) => {
  const style = document.createElement('style')
  style.textContent = styleContent
  document.head.appendChild(style)
}

export const initializeTooltip = (containerId, options = {}) => {
  return new Promise((resolve) => {
    d3.selectAll(`#${containerId} .tooltip`).remove()

    setTimeout(() => {
      const tooltip = d3
        .select(`#${containerId}`)
        .append('div')
        .attr('class', options.className || 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('pointer-events', 'none')
        .style('background-color', options.backgroundColor || 'white')
        .style('padding', options.padding || '10px')
        .style('border-radius', options.borderRadius || '5px')
        .style('z-index', '1000')

      tooltip.show = function (html, x, y) {
        this.html(html).style('left', `${x}px`).style('top', `${y}px`).style('opacity', 1)
        return this
      }

      tooltip.hide = function () {
        this.style('opacity', 0)
        return this
      }

      tooltip.move = function (x, y) {
        this.style('left', `${x}px`).style('top', `${y}px`)
        return this
      }

      resolve(tooltip)
    }, 100)
  })
}

export const findClosestPoint = (mouseX, xPositions) => {
  return d3.scan(xPositions, (a, b) => Math.abs(a - mouseX) - Math.abs(b - mouseX))
}

export const calculateTooltipPosition = (event, offset = { x: 10, y: -28 }) => {
  return {
    x: event.pageX + offset.x,
    y: event.pageY + offset.y
  }
}
