import * as d3 from 'd3'

/**
 * Configuration pour la création d'un SVG
 * @typedef {Object} SvgConfig
 * @property {number} width - Largeur totale du SVG
 * @property {number} height - Hauteur totale du SVG
 * @property {Object} margin - Marges du SVG
 * @property {number} margin.top - Marge supérieure
 * @property {number} margin.right - Marge droite
 * @property {number} margin.bottom - Marge inférieure
 * @property {number} margin.left - Marge gauche
 */

/**
 * Crée un élément SVG avec un groupe principal tenant compte des marges
 * @param {string} containerId - ID du conteneur DOM
 * @param {SvgConfig} config - Configuration du SVG
 * @returns {d3.Selection} Groupe SVG principal
 */
export const createSvg = (containerId, { width, height, margin }) =>
  d3
    .select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

/**
 * Nettoie les éléments SVG et tooltips existants
 * @param {string} containerId - ID du conteneur DOM
 */
export const cleanupChart = (containerId) => {
  d3.select(`#${containerId} svg`).remove()
  d3.selectAll('.tooltip').remove()
}

/**
 * Injecte du CSS dans le document
 * @param {string} styleContent - Contenu CSS à injecter
 */
export const injectStyle = (styleContent) => {
  const style = document.createElement('style')
  style.textContent = styleContent
  document.head.appendChild(style)
}

/**
 * Options de configuration du tooltip
 * @typedef {Object} TooltipOptions
 * @property {string} [className='tooltip'] - Classe CSS du tooltip
 * @property {string} [backgroundColor='white'] - Couleur de fond
 * @property {string} [padding='10px'] - Padding
 * @property {string} [borderRadius='5px'] - Rayon de la bordure
 */

/**
 * Initialise un tooltip D3
 * @param {string} containerId - ID du conteneur DOM
 * @param {TooltipOptions} options - Options de configuration du tooltip
 * @returns {Promise<d3.Selection>} Tooltip D3
 */
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

/**
 * Trouve le point le plus proche d'une position X donnée
 * @param {number} mouseX - Position X de la souris
 * @param {Array<number>} xPositions - Tableau des positions X possibles
 * @returns {number} Index du point le plus proche
 */
export const findClosestPoint = (mouseX, xPositions) => {
  return d3.scan(xPositions, (a, b) => Math.abs(a - mouseX) - Math.abs(b - mouseX))
}

/**
 * Calcule la position du tooltip
 * @param {Event} event - Événement de la souris
 * @param {Object} offset - Décalage à appliquer
 * @param {number} offset.x - Décalage horizontal
 * @param {number} offset.y - Décalage vertical
 * @returns {Object} Position calculée {x, y}
 */
export const calculateTooltipPosition = (event, offset = { x: 10, y: -28 }) => {
  return {
    x: event.pageX + offset.x,
    y: event.pageY + offset.y
  }
}
