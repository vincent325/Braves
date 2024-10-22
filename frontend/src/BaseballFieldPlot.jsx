import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const polarToCartesian = (distance, angleInDegrees) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const x = distance * Math.sin(angleInRadians);
  const y = -distance * Math.cos(angleInRadians);
  return { x, y };
};

const BaseballFieldPlot = ({ hits }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 1000)
      .attr('height', 900)
      .attr('viewBox', '-400 -500 800 800');

    svg.selectAll('*').remove(); // Clear previous content

    const fieldGroup = svg.append('g');

    // Draw the infield (diamond shape)
    const infield = d3.path();
    infield.moveTo(0, 0);
    infield.lineTo(63.6, -63.6);
    infield.lineTo(0, -127);
    infield.lineTo(-63.6, -63.6);
    infield.closePath();

    fieldGroup.append('path')
      .attr('d', infield)
      .attr('fill', 'none')
      .attr('stroke', '#000000')
      .attr('stroke-width', 2);

    const createBulgingArc = (distance, startAngle, endAngle) => {
      const bulgeFactor = 1 * distance;
      const startX = distance * Math.sin(startAngle);
      const startY = -distance * Math.cos(startAngle);
      const endX = distance * Math.sin(endAngle);
      const endY = -distance * Math.cos(endAngle);
      const controlPointX = (startX + endX) / 2;
      const controlPointY = (startY + endY) / 2 - bulgeFactor;
      return `M ${startX} ${startY} Q ${controlPointX} ${controlPointY} ${endX} ${endY}`;
    };

    // Draw outfield arcs (140 ft and 325 ft)
    [140, 325].forEach(baseDistance => {
      const arcPath = createBulgingArc(baseDistance, -Math.PI / 4, Math.PI / 4);

      fieldGroup.append('path')
        .attr('d', arcPath)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-dasharray', '5,5');

      fieldGroup.append('text')
        .attr('x', 0)
        .attr('y', -baseDistance - 48)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000000')
        .attr('font-size', '10px')
        .text(`${baseDistance + 75} ft`);
    });

    // Draw foul lines
    fieldGroup.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 320 * Math.cos(Math.PI / 4))
      .attr('y2', -320 * Math.sin(Math.PI / 4))
      .attr('stroke', '#000000')
      .attr('stroke-width', 2);

    fieldGroup.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', -320 * Math.cos(Math.PI / 4))
      .attr('y2', -320 * Math.sin(Math.PI / 4))
      .attr('stroke', '#000000')
      .attr('stroke-width', 2);

    // Draw bases
    const bases = [
      { x: 0, y: 0, label: 'Home' },
      { x: 63.6, y: -63.6, label: '1B' },
      { x: 0, y: -127, label: '2B' },
      { x: -63.6, y: -63.6, label: '3B' },
    ];

    bases.forEach(base => {
      fieldGroup.append('rect')
        .attr('x', base.x - 2)
        .attr('y', base.y - 2)
        .attr('width', 4)
        .attr('height', 4)
        .attr('fill', '#000000')
        .attr('stroke', 'none');

      fieldGroup.append('text')
        .attr('x', base.x + 5)
        .attr('y', base.y + 5)
        .attr('fill', '#000000')
        .attr('font-size', '10px')
        .text(base.label);
    });

    // Color scheme for hit outcomes
    const colorScheme = {
      'Single': '#0000FF',  // Blue
      'Double': '#FFFF00',  // Yellow
      'Triple': '#800080',  // Purple
      'HomeRun': '#00FF00',  // Very Green
      'Out': '#FF0000'  // Very Red
    };

    // Plot hit data with enhanced hoverable points
    hits.forEach(hit => {
      const { x, y } = polarToCartesian(hit.HIT_DISTANCE, hit.EXIT_DIRECTION);

      const point = fieldGroup.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 4)
        .attr('fill', colorScheme[hit.PLAY_OUTCOME] || 'gray')
        .attr('opacity', 0.8);

      // Create an enhanced tooltip
      const tooltip = fieldGroup.append('g')
        .attr('class', 'tooltip')
        .attr('transform', `translate(${x}, ${y - 120})`)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      tooltip.append('rect')
        .attr('width', 200)
        .attr('height', 140)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('rx', 5)
        .attr('ry', 5);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 20)
        .attr('fill', 'black')
        .text(hit.BATTER);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 40)
        .attr('fill', 'black')
        .text(`Pitcher: ${hit.PITCHER}`);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 60)
        .attr('fill', 'black')
        .text(`Outcome: ${hit.PLAY_OUTCOME}`);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 80)
        .attr('fill', 'black')
        .text(`Distance: ${hit.HIT_DISTANCE} ft`);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 100)
        .attr('fill', 'black')
        .text(`Launch Angle: ${hit.LAUNCH_ANGLE.toFixed(2)}°`);

      tooltip.append('text')
        .attr('x', 10)
        .attr('y', 120)
        .attr('fill', 'black')
        .text(`Exit Speed: ${hit.EXIT_SPEED.toFixed(2)} mph`);

      // Add hover interactions
      const hoverArea = fieldGroup.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', 'transparent')
        .style('cursor', 'pointer');

      hoverArea.on('mouseover', function() {
        point.attr('r', 6);
        tooltip.transition().duration(200).style('opacity', 1);
      }).on('mouseout', function() {
        point.attr('r', 4);
        tooltip.transition().duration(200).style('opacity', 0);
      });
    });

    // Add legend
    const legend = svg.append('g')
      .attr('transform', 'translate(-380, -480)');

    Object.entries(colorScheme).forEach(([outcome, color], i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color);

      legendItem.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(outcome)
        .attr('font-size', '12px')
        .attr('fill', 'black');
    });

  }, [hits]);

  return (
    <div className="baseball-field-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BaseballFieldPlot;