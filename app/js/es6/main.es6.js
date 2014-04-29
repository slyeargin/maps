/* global google:true */
/* jshint unused:false */
/* jshint camelcase:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initMap(36, -86, 3);
    $('#add').click(add);
    $('#show').click(show);
    $('#nsa').click(nsa);
  }

  function nsa(){
    let options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    navigator.geolocation.getCurrentPosition(success, error => console.log(error), options);
  }

  function success(pos){
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    let flagIcon = './media/flag_pink.png';
    addMarker(lat, lng, null, flagIcon);
    let latLng = new google.maps.LatLng(lat, lng);
    map.setCenter(latLng);
    map.setZoom(15);
  }

  function add(){
    let place = $('#place').val().trim();
    let vacation = `<option>${place}</option>`;
    $('#vacations').append(vacation);
    $('#place').val('');
    $('#place').focus();
  }

  function show(){
      let vacation = $('#vacations').val();
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({address: vacation}, (results, status)=>{
        let name = results[0].formatted_address;
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        addMarker(lat, lng, name);
        let latLng = new google.maps.LatLng(lat, lng);
        map.setCenter(latLng);
        map.setZoom(15);
      });
    }

  function addMarker(lat, lng, name, flagImg='./media/flag_blue.png'){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: flagImg});
  }

  var map;

  function initMap(lat, lng, zoom){
    let styles = [{'featureType':'landscape.natural','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'color':'#e0efef'}]},{'featureType':'poi','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'hue':'#1900ff'},{'color':'#c0e8e8'}]},{'featureType':'landscape.man_made','elementType':'geometry.fill'},{'featureType':'road','elementType':'geometry','stylers':[{'lightness':100},{'visibility':'simplified'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'water','stylers':[{'color':'#7dcdcd'}]},{'featureType':'transit.line','elementType':'geometry','stylers':[{'visibility':'on'},{'lightness':700}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

}());
