import {gql} from '@apollo/client';
import {Wrapper} from '@googlemaps/react-wrapper';
import {useRef, useEffect} from 'react';
import {GoogleMapsFragment} from '../../types/graphql';

gql`
  fragment GoogleMaps on BandApplication {
    latitude
    longitude
  }
`;

export default function GoogleMaps(props: GoogleMapsFragment) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''}>
      <MapComponent {...props} />
    </Wrapper>
  );
}

function MapComponent({latitude, longitude}: GoogleMapsFragment) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const kult = new google.maps.LatLng(48.078143, 11.375518);
    const map = new window.google.maps.Map(ref.current, {
      center: kult,
      zoom: 12,
      gestureHandling: 'cooperative',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var bounds = new google.maps.LatLngBounds(kult);
    const band = new google.maps.LatLng(latitude!, longitude!);
    new google.maps.Marker({
      position: band,
      map,
    });
    new google.maps.Marker({
      position: kult,
      icon: {
        url: '/marker.png',
        size: new google.maps.Size(52, 74),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(13, 37),
        scaledSize: new google.maps.Size(26, 37),
      },
      map,
    });

    bounds.extend(band);
    map.fitBounds(bounds);
  });

  return <div ref={ref} style={{height: '100%'}} />;
}
