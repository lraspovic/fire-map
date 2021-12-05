import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

export const cesticeStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.0)',
  }),
  stroke: new Stroke({
    color: 'black',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'black',
    }),
  }),
});

export const cesticeHoverStyle = new Style({
  fill: new Fill({
    color: 'rgba(0, 0, 0, 0.0)',
  }),
  stroke: new Stroke({
    color: 'orange',
    width: 5,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#c33b23',
    }),
    stroke: new Stroke({
      color: '#c33b23',
      width: 1,
    }),
  }),
  zIndex: 500,
});

export const cesticeSelectStyle = new Style({
  fill: new Fill({
    color: '#FFA50050',
  }),
  stroke: new Stroke({
    color: 'orange',
    width: 5,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#c33b23',
    }),
    stroke: new Stroke({
      color: '#c33b23',
      width: 1,
    }),
  }),
  zIndex: 500,
});
