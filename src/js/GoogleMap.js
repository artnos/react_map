import React from 'react';
import PropTypes from 'prop-types';


class GoogleMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            markers: []
        }
    }

    componentWillReceiveProps(nextProps){
        const {activeProperty, filteredProperties, isFiltering} = nextProps;
        const {latitude, longitude, index} = activeProperty;
        const {markers} = this.state;


        //filteredProperties.length !== 0 && this.showIW(index);

        if(isFiltering && filteredProperties.length === 0){
            this.hideAll();
        } else {
            this.hideAll();
            this.showIW(index);
        }
    }

    showIW(index){
        const {markers} = this.state;

        markers[index] && markers[index].iw.open(this.map, markers[index]);

    }

    hideAll() {
        const {markers} = this.state;
        markers.forEach(marker => {
            marker.iw.close();
        });
    }


    componentDidMount(){
            const {activeProperty, properties} = this.props;
            const {latitude, longitude} = activeProperty;
            this.map = new google.maps.Map(this.refs.map, {
                center: {lat: latitude, lng: longitude},
                mapTypeControl: false,
                zoom: 15
            });

            this.createMarkers(properties);
    }

    componentDidUpdate(){
        const {filteredProperties, isFiltering} = this.props;
        const {markers} = this.state;

        markers.forEach(marker => {
            const {property} = marker;
            if(isFiltering){
                //console.log(property);
                //console.log(filteredProperties);
                if(filteredProperties.includes(property)){
                    //console.log(property);
                    markers[property.index].setVisible(true);
                }else {
                    markers[property.index].setVisible(false);
                }
            } else {
                markers[property.index].setVisible(true);
            }
        })

    }


    createMarkers(properties){
        const {setActiveProperty, activeProperty, isFiltering} = this.props;
        const activePropertyIndex = activeProperty.index;
        const {markers} = this.state;
        const propertiesList = isFiltering ? filteredProperties : properties;



        propertiesList.map((property, index)=> {
            const {latitude, longitude, address} = property;
            this.marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map: this.map,
                label: {
                    color: '#ffffff',
                    text: `${index+1}`
                },
                icon: {
                    url: 'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
                    // This marker is 22 pixels wide by 40 pixels high.
                    size: new google.maps.Size(22, 55),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, -15),
                    // The anchor for this image is the base of the cross (11, 52).
                    anchor: new google.maps.Point(11, 52)
                },
                property: property
            });

            //create info window for each marker
            const iw = new google.maps.InfoWindow({
                content: `<h1>${address}</h1>`
            });

            this.marker.iw = iw;

            this.marker.addListener('click', function(){
                //set this at a App level.
                this.hideAll();
                setActiveProperty(property, true);
            }.bind(this)); //important .bind(this) to bring this into the function

            markers.push(this.marker);
            this.showIW(activePropertyIndex);




        })

    }


    render(){
        return (
            <div className="mapContainer">
                <div id="map" ref="map"></div>
            </div>
        )
    }
}

GoogleMap.propTypes = {
    properties: PropTypes.array.isRequired,
    setActiveProperty: PropTypes.func.isRequired,
    activeProperty: PropTypes.object.isRequired,
    filteredProperties: PropTypes.array,
    isFiltering: PropTypes.bool

}

export default GoogleMap;