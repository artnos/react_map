import React from 'react';
import Card from './Card';
import Header from './Header';

import GoogleMap from './GoogleMap';
import data from './data/Data';
import jump from 'jump.js';
import {easeInOutCubic } from './utils/Easing';
import image from '../images/house-location-pin.svg'


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            properties: data.properties,
            activeProperty: data.properties[0],
            filterIsVisible: false,
            filterBedrooms: 'any',
            filterBathrooms: 'any',
            filterCars: 'any',
            filterSort: 'any',
            filteredProperties: [],
            isFiltering: false
        }

        this.setActiveProperty = this.setActiveProperty.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.filterProperties = this.filterProperties.bind(this);
        this.clearFilter = this.clearFilter.bind(this);

    }

    handleFilterChange(e){
        const target = e.target;
        const {value, name} = target;

        this.setState({
            [name]: value
        }, function(){
            //console.log('callback');
            //console.log(`${name} ${value}`);
            this.filterProperties();
        });
    }

    filterProperties(){
        const {properties,filterBedrooms,filterBathrooms,filterCars,filterSort} = this.state;
        const isFiltering = filterBedrooms !== 'any' || filterBathrooms !== 'any' || filterCars !== 'any' || filterSort !== 'any'  ;
        const getFilteredProperties = (properties) => {
            const filteredProperties = [];
            properties.map(property => {
                const {bedrooms,bathrooms, carSpaces} = property;

                if(
                    (bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any') &&
                    (bathrooms === parseInt(filterBathrooms) || filterBathrooms === 'any') &&
                    (carSpaces === parseInt(filterCars) || filterCars === 'any')
                ){
                    filteredProperties.push(property);
                }
                //above and below work
                //const match = bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any';
                //match && filteredProperties.push(property);

            })

            //filterSort === 'any' && propertiesList.sort((a,b)=> a.index - b.index );
            parseInt(filterSort) === 0 && filteredProperties.sort((a,b)=> a.price - b.price );
            parseInt(filterSort) === 1 && filteredProperties.sort((a,b)=> b.price - a.price );

            return filteredProperties;
        }



        this.setState({
            filteredProperties: getFilteredProperties(properties),
            activeProperty: getFilteredProperties(properties)[0] || properties[0], //incase filterProperites is NULL '|| properties[0]'
            isFiltering: isFiltering
        })
    }

    setActiveProperty(property, scroll){
        const {index} = property;
        this.setState({
            activeProperty: property
        });

        if(scroll){
            const target = `#card-${index}`;
            jump(target, {
                duration: 800,
                easing: easeInOutCubic,
            })
        }
    }

    toggleFilter(e){
        e.preventDefault();
        this.setState({
            filterIsVisible: !this.state.filterIsVisible
        })
    }

    clearFilter(e,form){
        e.preventDefault();
        this.setState({
            properties: this.state.properties.sort((a,b)=> a.index - b.index ),
            filterBedrooms: 'any',
            filterBathrooms: 'any',
            filterCars: 'any',
            filterSort: 'any',
            filterProperties: [],
            isFiltering: false,
            activeProperties: this.state.properties[0]
        })
        form.reset();
    }

    render(){
        const {properties, activeProperty,  filterIsVisible ,filteredProperties, isFiltering, filterSort} = this.state;
        const propertiesList = isFiltering ? filteredProperties : properties;



        return (
            <div>
                {/* listings - Start */}
                <div className="listings">

                   <Header
                       toggleFilter={this.toggleFilter}
                       filterIsVisible={filterIsVisible}
                       handleFilterChange={this.handleFilterChange}
                       clearFilter={this.clearFilter}
                   />

                    <div className="cards container">
                        <div className={`cards-list row ${propertiesList.length === 0 ?'is-empty':''}`}>
                            {
                                propertiesList.map(property => {


                                    return <Card
                                        key={property._id}
                                        property={property}
                                        activeProperty={activeProperty}
                                        setActiveProperty={this.setActiveProperty}
                                    />
                                })
                            }
                            {
                                (isFiltering && propertiesList.length === 0) && <p className="warning">
                                    <img src={image}/>
                                    No properties were found.</p>
                            }


                       </div>
                    </div>
                </div>
                {/* listings - End */}

                {/* mapContainer - Start */}
                <GoogleMap properties={properties}
                           activeProperty={activeProperty}
                           setActiveProperty={this.setActiveProperty}
                           filteredProperties={filteredProperties}
                           isFiltering={isFiltering} />

                {/* mapContainer - End */}
            </div>
        )
    }
}

export default App;