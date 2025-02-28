import * as d3 from 'd3';

export const createSvg = (containerId, { width, height, margin }) =>
  d3
    .select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

export const cleanupChart = (containerId) => {
  d3.select(`#${containerId} svg`).remove();
  d3.selectAll('.tooltip').remove();
};

export const injectStyle = (styleContent) => {
  const style = document.createElement('style');
  style.textContent = styleContent;
  document.head.appendChild(style);
};

export const createTooltip = (containerId, options = {}) =>
  d3
    .select(`#${containerId}`)
    .append('div')
    .attr('class', options.className || 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', options.backgroundColor || 'white')
    .style('padding', options.padding || '10px')
    .style('border-radius', options.borderRadius || '5px')
    .style('pointer-events', 'none');
