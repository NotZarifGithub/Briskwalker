export const getPlaceDetails = (map, placeId) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(map);

    service.getDetails(
      {
        placeId,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'opening_hours',
          'website',
          'photos',
          'url',
          'rating',
          'vicinity',
          'geometry',
        ],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(status);
        }
      }
    )
  })
}