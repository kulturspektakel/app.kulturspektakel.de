import {gql} from '@apollo/client';
import {Wrapper} from '@googlemaps/react-wrapper';
import {useRef, useEffect} from 'react';
import {GoogleMapsFragment} from '../../types/graphql';

gql`
  fragment GoogleMaps on BandApplication {
    distance
    city
  }
`;

export default function GoogleMaps(props: GoogleMapsFragment) {
  return (
    <>
      <Wrapper apiKey={'AIzaSyAP-SY6yJqQoHNb5YkkHJdcC-cOpBTJrz4'}>
        <MapComponent city={props.city} />
      </Wrapper>
      {props.city}
      {props.distance != null && <> ({props.distance.toFixed()} km)</>}
    </>
  );
}

function MapComponent({city}: {city: string}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const map = new window.google.maps.Map(ref.current, {
      center: new google.maps.LatLng(-34, 151),
      zoom: 12,
      gestureHandling: 'cooperative',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    // new google.maps.Marker({
    //   position: new google.maps.LatLng(0, 0),
    //   map,
    // });

    const kult = new google.maps.Marker({
      position: new google.maps.LatLng(48.078143, 11.375518),
      map,
    });
  });

  return (
    <div
      ref={ref}
      id="map"
      style={{aspectRatio: '16 / 9', width: '100%', borderRadius: 8}}
    />
  );
}
