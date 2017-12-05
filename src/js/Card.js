import React from 'react';
import PropTypes from 'prop-types';
{
    //{
    //if(_id == activeProperty._id){
    //'is-actove'
    //} else {
    //''
    //}
    /*
    * make card set active property homework
    * */
}

const Card = ({property, activeProperty, setActiveProperty}) => {
    const {_id,price,address,city,picture,bedrooms,bathrooms, carSpaces, index} = property;
    //const {setActiveProperty} = this.props;
    //onClick={setActiveProperty(property)}

    //activateLasers(){
    //    console.log(123);
    //}
    // onClick={this.activateLasers()}

    return (
    <div id={`card-${index}`}  className={`card col-sm-12 col-md-6 col-lg-4 ${property === activeProperty ? 'is-active' : ''}`} onClick={() => setActiveProperty(property, false)} >

        <img src={picture} alt="Singer" />
        <p className="price">{price}</p>
        <div className="details">
            <span className="index">{index+1}</span>
            <p className="location">
                {city}
                <br/>{address}
            </p>
            <ul className="features">
                <li className="icon-bed">{bedrooms}<span></span></li>
                <li className="icon-bath">{bathrooms}<span></span></li>
                <li className="icon-car">{carSpaces}<span></span></li>
            </ul>
        </div>
    </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired,
    //setActiveProperty: PropTypes.func.isRequired

}

export default Card;