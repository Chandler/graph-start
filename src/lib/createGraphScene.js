import {createScene} from 'w-gl';
import LineCollection from './LineCollection';
import PointCollection from './PointCollection';
import bus from './bus';
import getGraph from './getGraph';
import createLayout from 'ngraph.forcelayout';

import { normal } from 'color-blend'
import hexRgb from 'hex-rgb';

function mixUint32Color(c0, c1) {
    return c0
}

function createPositionLayout(graph, data) {
  let api = {
    step: function(){},
    getLinkColor: function(toId, fromId){
      let toData = graph.getNode(toId).data
      let fromData = graph.getNode(fromId).data
      let linkColor = mixUint32Color(fromData.color, toData.color)
      return linkColor
    },
    getNodePosition: function (nodeId) {
      let data = graph.getNode(nodeId).data
      let pos = {
        x: data.x,
        y: data.y,
        z: 0
      }
      return pos
    }
  }
  return api
}

export default function createGraphScene(canvas) {
  let drawLinks = true;

  // Since graph can be loaded dynamically, we have these uninitialized
  // and captured into closure. loadGraph will do the initialization
  let graph, layout;
  let scene, nodes, lines;

  let layoutSteps = 0; // how many frames shall we run layout?
  let rafHandle;

  loadGraph(getGraph());
  bus.on('load-graph', loadGraph);

  return {
    dispose,
    runLayout,
  };

  function loadGraph(newGraph) {
    if (scene) {
      scene.dispose();
      scene = null
      cancelAnimationFrame(rafHandle);
    }
    scene = initScene();
    graph = newGraph

    layout = createPositionLayout(graph, {
      timeStep: 0.5,
      springLength: 10,
      springCoefficient: 0.8,
      gravity: -12,
      dragCoefficient: 0.9,
    });

    layout.step();
    initUIElements();

    rafHandle = requestAnimationFrame(frame);
  }

  function runLayout(stepsCount) {
    layoutSteps += stepsCount;
  }

  function initScene() {
    let scene = createScene(canvas);
    scene.setClearColor(255, 255, 255, 1)
    let initialSceneSize = 40;
    scene.setViewBox({
      left:  -initialSceneSize,
      top:   -initialSceneSize,
      right:  initialSceneSize,
      bottom: initialSceneSize,
    });
    return scene;
  }
  
  function initUIElements() {
    nodes = new PointCollection(scene.getGL(), {
      capacity: graph.getNodesCount()
    });

    graph.forEachNode(node => {
      var point = layout.getNodePosition(node.id);
      let size = 0.1;
      if (node.data && node.data.size) {
        size = node.data.size;
      } else {
        if (!node.data) node.data = {};
        node.data.size = size;
      }
      node.ui = {size, position: [point.x, point.y, point.z || 0], color: node.data.color || 0x90f8fcff};
      node.uiId = nodes.add(node.ui);
    });

    lines = new LineCollection(scene.getGL(), { capacity: graph.getLinksCount() });

    graph.forEachLink(link => {
      var from = layout.getNodePosition(link.fromId);
      var to = layout.getNodePosition(link.toId);
      var linkcolor = layout.getLinkColor(link.fromId, link.toId)
      var line = { from: [from.x, from.y, from.z || 0], to: [to.x, to.y, to.z || 0], color: linkcolor || 0xb7c0c9FF };
      link.ui = line;
      link.uiId = lines.add(link.ui);
    });

    scene.appendChild(lines);
    scene.appendChild(nodes);
  }

  function frame() {
    rafHandle = requestAnimationFrame(frame);

    if (layoutSteps > 0) {
      layoutSteps -= 1;
      layout.step();
    }
    drawGraph();
    scene.renderFrame();
  }

  function drawGraph() {
    graph.forEachNode(node => {
      let pos = layout.getNodePosition(node.id);
      let uiPosition = node.ui.position;
      uiPosition[0] = pos.x;
      uiPosition[1] = pos.y;
      uiPosition[2] = pos.z || 0;
      nodes.update(node.uiId, node.ui)
    });

    if (drawLinks) {
      graph.forEachLink(link => {
        var fromPos = layout.getNodePosition(link.fromId);
        var toPos = layout.getNodePosition(link.toId);
        let {from, to} = link.ui;
        from[0] = fromPos.x; from[1] = fromPos.y; from[2] = fromPos.z || 0;
        to[0] = toPos.x; to[1] = toPos.y; to[2] = toPos.z || 0;
        lines.update(link.uiId, link.ui);
      })
    }
  }

  function dispose() {
    cancelAnimationFrame(rafHandle);

    scene.dispose();
    bus.off('load-graph', loadGraph);
  }
}