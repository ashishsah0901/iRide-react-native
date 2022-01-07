import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectSource,
  setTimeTaken,
} from "../redux/reducers/appReducer";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_API_KEY } from "@env";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const Map = () => {
  const source = useSelector(selectSource);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!source || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["source", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [source, destination]);

  useEffect(() => {
    if (!source || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origin=${source.description}&destination=${destination.description}&key=${GOOGLE_MAP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTimeTaken(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [source, destination, GOOGLE_MAP_API_KEY]);
  return (
    <View>
      <MapView
        ref={mapRef}
        mapType="mutedStandard"
        style={tw`flex-1`}
        initialRegion={{
          latitude: source.location.lat,
          longitude: source.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {source && destination && (
          <MapViewDirections
            origin={source.description}
            destination={destination.description}
            apikey={GOOGLE_MAP_API_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        {source?.location && (
          <Marker
            coordinate={{
              latitude: source.location.lat,
              longitude: source.location.lng,
            }}
            title="Source"
            description={source.description}
            identifier="source"
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
