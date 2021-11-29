import * as olProj from 'ol/proj';
import $ from 'jquery';
import LayerSwitcher from 'ol-layerswitcher';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import ScaleLine from 'ol/control/ScaleLine';
import Select from 'ol/interaction/Select';
import Swipe from 'ol-ext/control/Swipe';
import View from 'ol/View';
import {cesticeHoverStyle, cesticeSelectStyle} from './styles.js';
import {pointerMove} from 'ol/events/condition';
import {singleClick} from 'ol/events/condition';

import * as Layers from './layers.js';
import {burnChart} from './chart.js';
import {forestChart} from './chart.js';

/// MAP FEATURES ///
const layerSwitcher = new LayerSwitcher({
  tipLabel: 'Slojevi',
  activationMode: 'click',
  collapseLabel: '',
});

const swipe = new Swipe();

const scaleline = new ScaleLine();

const selectClick = new Select({
  condition: singleClick,
  style: (feature) => {
    cesticeSelectStyle.getText().setText(feature.get('Kc_Broj'));
    return cesticeSelectStyle;
  },
});

const selectHover = new Select({
  condition: pointerMove,
  style: (feature) => {
    cesticeHoverStyle.getText().setText(feature.get('Kc_Broj'));
    return cesticeHoverStyle;
  },
});

const popup = new Overlay({
  element: $('#popup')[0],
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

const map = new Map({
  target: 'map',
  layers: [Layers.podloge, Layers.slojevi],
  overlays: [popup],
  view: new View({
    center: olProj.transform([16.522, 43.522], 'EPSG:4326', 'EPSG:3857'),
    zoom: 17,
  }),
});

map.addControl(layerSwitcher);
map.addControl(scaleline);
map.addInteraction(selectClick);
map.addInteraction(selectHover);

map.on('singleclick', (e) => {
  map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
    if (!layer) {
      return;
    } else {
      const burnChartData = [];
      const kc_broj = feature.get('Kc_Broj');
      $('#th-kc_broj').html('KČ ' + kc_broj);

      const povrsina = Math.round(feature.get('Povrsina'));
      $('#th-povrsina').html(povrsina);

      const opozareno = Math.round(feature.get('Opozareno'));
      $('#th-opozareno').html(opozareno);

      const neOpoz = povrsina - opozareno;
      burnChartData.push(neOpoz);

      const opozSlabo = Math.round(feature.get('Opozareno1'));
      $('#th-slabo').html(opozSlabo);
      burnChartData.push(opozSlabo);

      const opozSrednje = Math.round(feature.get('Opozareno2'));
      $('#th-srednje').html(opozSrednje);
      burnChartData.push(opozSrednje);

      const opozSrednjeJako = Math.round(feature.get('Opozareno3'));
      $('#th-srednje-jako').html(opozSrednjeJako);
      burnChartData.push(opozSrednjeJako);

      const opozJako = Math.round(feature.get('Opozareno4'));
      $('#th-jako').html(opozJako);
      burnChartData.push(opozJako);

      const bjelogorica = Math.round(feature.get('Bijelog'));
      $('#th-bg-pokrov').html(bjelogorica);

      const bjelogoricaIzg = Math.round(feature.get('B_Izgoreno'));
      $('#th-bg-izgoreno').html(bjelogoricaIzg);
      const bjelogoricaNeIzg = bjelogorica - bjelogoricaIzg;

      const crnogorica = Math.round(feature.get('Crnog'));
      $('#th-cg-pokrov').html(crnogorica);

      const crnogoricaIzg = Math.round(feature.get('C_Izgoreno'));
      $('#th-cg-izgoreno').html(crnogoricaIzg);
      const crnogoricaNeIzg = crnogorica - crnogoricaIzg;

      burnChart.updateOptions({
        series: burnChartData,
      });

      forestChart.updateOptions({
        series: [
          {
            name: 'Izgoreno',
            data: [bjelogoricaIzg, crnogoricaIzg],
          },
          {
            name: 'Neizgoreno',
            data: [bjelogoricaNeIzg, crnogoricaNeIzg],
          },
        ],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            if (opts.dataPointIndex === 0) {
              return `${Math.round((val / bjelogorica) * 100)}%`;
            } else {
              return `${Math.round((val / crnogorica) * 100)}%`;
            }
          },
        },
      });

      popup.setPosition(e.coordinate);
    }
  });
});

/// SEARCH BAR ///
const searchCestica = () => {
  const cestica_br = document.getElementById('unos').value;
  const cestice = Layers.opoz_cestice.getSource().getFeatures();
  cestice.forEach((cestica) => {
    if (cestica_br === cestica.get('Kc_Broj')) {
      const cestica_geom = cestica.getGeometry();
      const cestica_geom_extent = cestica_geom.getExtent();
      return map.getView().fit(cestica_geom_extent, map.getSize());
    }
  });
};

$('#searchBar').on('keyup', (e) => {
  if (e.keyCode === 13) {
    searchCestica();
    const search_input = document.getElementById('unos');
    search_input.value = '';
    search_input.blur();
  }
});

/// HOME BTN ///
$('#home-container').on('click', () => {
  const home = map.getView();
  home.animate(
    {center: olProj.transform([16.522, 43.522], 'EPSG:4326', 'EPSG:3857')},
    {zoom: 17, duration: 1500}
  );
  map.setView(home);
});

/// LEGEND BTNS ///
$('#legend').on('click', () => {
  $('#menu').animate({
    width: 'toggle',
  });
  $('.submenu-list').slideUp(400);
});

$('#legend1').on('click', () => {
  $('#list1').slideToggle(
    {
      direction: 'down',
    },
    500
  );
  $('#list2').slideUp(400);
});

$('#legend2').on('click', () => {
  $('#list2').slideToggle(
    {
      direction: 'down',
    },
    500
  );
  $('#list1').slideUp(400);
});

$('#legend3').on('click', () => {
  $('#list3').slideToggle(
    {
      direction: 'down',
    },
    500
  );
  $('#list2').slideUp(400);
});

/// POPUP ///
$('#close-icon').on('click', () => {
  popup.setPosition(undefined);
});

/// CHART BTN ///
$('#chart-icon').on('click', () => {
  $('#chart-icon').toggleClass('btn-active');
  $('#chart').animate({
    width: 'toggle',
  });
});

/// SWIPE BTN ///
let swipe_active = false;
$('#swipe-container').on('click', () => {
  if (swipe_active === false) {
    Layers.clc_12.setVisible(true);
    Layers.clc_18.setVisible(true);
    swipe.addLayer(Layers.clc_12);
    swipe.addLayer(Layers.clc_18, true);
    map.addControl(swipe);
    $('.comparison-info').show();
    swipe_active = true;
  } else {
    map.removeControl(swipe);
    Layers.clc_12.setVisible(false);
    Layers.clc_18.setVisible(false);
    $('.comparison-info').hide();
    swipe_active = false;
  }
});
