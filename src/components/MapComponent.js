import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZmFtYXNocmFmIiwiYSI6ImNseXoyY3M4dzFudzgyanNsN2p0eXd6djIifQ.WAROEM1MZX8KdZI1x4XT8A";

const MapComponent = ({searchQuery}) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-97.7431);
  const [lat, setLat] = useState(30.2672);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // You can change this to any Mapbox style you prefer
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      map.current.resize();
    });

    return () => map.current.remove();
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const [longitude, latitude] = data.features[0].center;
          setLng(longitude);
          setLat(latitude);
          setZoom(10); // Adjust zoom level as needed
        })
        .catch(error => {
          console.error('Error fetching location data:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="map-container" ref={mapContainerRef} style={{ height: '100vh' }} />
  );
};

export default MapComponent;
