import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Header = ({toggleFilter,  filterIsVisible,  handleFilterChange,clearFilter }) => {

    return (
        <header className={` ${filterIsVisible ? 'filter-is-visible' : ''}`}>

            <Filter
                toggleFilter={toggleFilter}
                handleFilterChange={handleFilterChange}
                clearFilter={clearFilter} />

            <h1>Property Listings</h1>
            <button className="btn-filter" onClick={(e) => toggleFilter(e)}>Filter</button>
        </header>
    );
}

Header.propTypes = {
    filterIsVisible: PropTypes.bool.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired
};
//Header.defaultProps = {};

export default Header;
