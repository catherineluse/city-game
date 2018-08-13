import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCitiesWithPopulation,
  fetchCitiesWithCoordinates,
  filterCitiesByState,
  filterCitiesByPopulation,
  setActiveState
 } from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  Navbar,
  NavbarBrand,
  Nav,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
 } from 'reactstrap';

export class TopNavbar extends Component {

  renderStateList() {
    return this.props.states.map((state) => {
      return (
        <DropdownItem
          key={ state.name }
          onClick={ ()=>{
            setActiveState(state);
            fetchCitiesWithPopulation();
            console.log('props updated ', this.props.citiesWithPopulation)
          } }
          className="list-group-item">
          { state.name }
        </DropdownItem>
      )
    });
  }


  componentWillMount(){

    let randomState = null;

    if (!this.props.activeState){
        let randomStateIdx = Math.floor(Math.random() * 51);
        randomState = this.props.states[randomStateIdx];
        this.props.setActiveState(randomState);
     }
  }

  render() {
    console.log('props are ', this.props)

      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Learn Cities <span>(Built with React and Redux)</span></NavbarBrand>

              <Nav className="ml-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    { this.props.activeState ? this.props.activeState.name : ""}
                  </DropdownToggle>
                  <DropdownMenu right>
                   { this.renderStateList() }
                  </DropdownMenu>
                </UncontrolledDropdown>

              </Nav>

          </Navbar>
        </div>
      )
  }
}

function mapStateToProps({
  citiesWithPopulation,
  citiesWithCoordinates,
  citiesInQueue,
  positionInCityQueue,
  activeState,
  states
}) {
  //Whatever is returned will show up as props
  //inside of BookList
  return {
    citiesWithPopulation,
    citiesWithCoordinates,
    citiesInQueue,
    positionInCityQueue,
    activeState,
    states
  }
}

//Anything returned from this function will
//end up as props from the BookList container
function mapDispatchToProps(dispatch){
  //whenever selectBook is called, the result should be
  //passed to all of our reducers
  return bindActionCreators({
    fetchCitiesWithPopulation,
    fetchCitiesWithCoordinates,
    filterCitiesByState,
    filterCitiesByPopulation,
    setActiveState
   }, dispatch)
}

//Promote BookList from a component to a container - it
//needs to know about this new dispatch method, selectBook.
//Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
