import React, { Component } from 'react';
import Select from 'react-select';
import Carousel from './carousel';
import './breedsList.css';


class DogBreeds extends Component {
    state={
            breeds: [],
            subBreeds: [],
            selectedBreeds: null,
            selectedNumber: 20,
            error: false
    }
        
    componentDidMount(){
        this.fetchTheApi();
    }
    fetchTheApi = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all')
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    breeds: Object.keys(data.message),
                    subBreeds: Object.values(data.message)
                })
            } else {
                this.setState({
                    error: true
                })
                alert("error loading Dog API")
            }
        } catch (e) {
            this.setState({
                error: true
            })
            alert("error loading Dog API")
        }
    }

    handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => {
            const words = option.value.split(' ');
            if (words.length === 2) {
                return `${words[1]}/${words[0]}`;
            } else {
                return option.value;
            }
        });
        this.setState({ selectedBreeds: selectedValues });
    }

    handleNumberChange = (selectedOption) => {
        this.setState({ selectedNumber: selectedOption.value });
    };
    

    render(){
        var Options = this.state.breeds.map((breed, index) => {
            const subBreeds = this.state.subBreeds[index];
            // eslint-disable-next-line
            if (subBreeds == [] || subBreeds.length === 0) {
                return {
                    value: breed,
                    label: breed
                };
            }
            else {
                const mergedOptions = subBreeds.map(subBreed => ({
                    value: `${subBreed} ${breed}`,
                    label: `${subBreed} ${breed}`
                }));
                
                return mergedOptions;
            }
        }).flat()
        
        const numberOptions = [
            {value: 20, label: 20},
            {value: 25, label: 25},
            {value: 30, label: 30},
            {value: 35, label: 35},
            {value: 40, label: 40},
            {value: 45, label: 45},
            {value: 50, label: 50}
        ]
        return(
            <div className='main'>
                <div className='selection d-flex flex-row justify-content-center w-100'>
                    <div className='col-9 pe-2'>
                    <Select
                        options={Options}
                        onChange={this.handleChange}
                        isMulti
                        hideSelectedOptions/>
                    </div>
                    <div className='col-2'>
                    <Select
                        options={numberOptions}
                        onChange={this.handleNumberChange}
                        defaultValue={numberOptions[0]}/>
                    </div>
                </div>
                <div className='results'>
                    <Carousel 
                    selectedNumber={this.state.selectedNumber}
                    selectedBreeds={this.state.selectedBreeds} />
                </div>
            </div>
        );
    }
}

export default DogBreeds;
