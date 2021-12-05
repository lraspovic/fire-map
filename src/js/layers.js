import BingMaps from 'ol/source/BingMaps';
import GeoJSON from 'ol/format/GeoJSON';
import LayerGroup from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import {cesticeStyle} from './styles.js';

export const osm = new TileLayer({
  title: 'OSM',
  type: 'base',
  visible: true,
  source: new OSM(),
});

export const bingMaps = new TileLayer({
  title: 'Bing',
  type: 'base',
  preload: Infinity,
  visible: false,
  source: new BingMaps({
    key: 'Ar9fFHhPA2Ot2KHTFbGp7hFRo4-A8nZQm5wLmxjfQpn2b5cBcWKXbYdaeOCbJEEY',
    imagerySet: 'Aerial',
  }),
});

export const podloge = new LayerGroup({
  title: 'Podloga',
  layers: [osm, bingMaps],
});

export const opoz_cestice = new VectorLayer({
  visible: true,
  zIndex: 10000,
  type: 'overlay',
  title: 'Opožarene čestice',
  source: new VectorSource({
    url: './data/opozarene_cestice.json',
    format: new GeoJSON(),
    projection: 'EPSG:3857',
  }),
  style: function (feature) {
    cesticeStyle.getText().setText(feature.get('Kc_Broj'));
    return cesticeStyle;
  },
});

export const clc_12 = new TileLayer({
  title: 'Corine Land Cover 2012',
  visible: false,
  maxResolution: 4000,
  source: new TileWMS({
    projection: 'EPSG:3857',
    url: 'http://servisi.azo.hr/tlo/wms',
    params: {'LAYERS': 'clc2012rev', 'TILED': true},
    serverType: 'geoserver',
  }),
  opacity: 1,
  zIndex: 1,
});

export const clc_18 = new TileLayer({
  title: 'Corine Land Cover 2018',
  visible: false,
  maxResolution: 4000,
  source: new TileWMS({
    projection: 'EPSG:3857',
    url: 'http://servisi.azo.hr/tlo/wms',
    params: {'LAYERS': 'clc2018', 'TILED': true},
    serverType: 'geoserver',
  }),
  opacity: 1,
  zIndex: 99,
});

export const sume_15 = new TileLayer({
  title: 'Šumski pokrov',
  visible: false,
  maxResolution: 4000,
  source: new TileWMS({
    projection: 'EPSG:3857',
    url: 'http://servisi.azo.hr/tlo/wms',
    params: {'LAYERS': 'dlt_2015_20m', 'TILED': true},
    serverType: 'geoserver',
  }),
  opacity: 1,
  zIndex: 99,
});

export const dnbr_split = new TileLayer({
  title: 'Opožarena površina',
  visible: false,
  maxResolution: 4000,
  source: new TileWMS({
    projection: 'EPSG:3857',
    url: 'http://139.162.157.18:8080/geoserver/pozari_nbr/wms',
    params: {'LAYERS': 'pozari_nbr:D_NBR', 'TILED': true},
    serverType: 'geoserver',
  }),
  opacity: 1,
  zIndex: 99,
});

export const slojevi = new LayerGroup({
  title: 'Slojevi',
  layers: [opoz_cestice, clc_12, clc_18, sume_15, dnbr_split],
});
