import React, { Component } from 'react';
import "./carousel.css"
import { register } from 'swiper/element/bundle'
import "bootstrap/dist/css/bootstrap.css"

register();

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          breedImages: {},
        };
    }

    fetchImagesForBreed = async (breedName) => {
        const { selectedNumber } = this.props;
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random/` + selectedNumber);
            if (response.ok) {
                const data = await response.json();
                this.setState((prevState) => ({
                breedImages: {
                    ...prevState.breedImages,
                    [breedName]: data.message,
                },
                }));
            } else {
                console.error(`Error fetching images for ${breedName}`);
            }
        } catch (error) {
          console.error(`Error fetching images for ${breedName}: ${error.message}`);
        }
    }
    
    componentDidMount() {
        const { selectedBreeds } = this.props;
        if (selectedBreeds && Array.isArray(selectedBreeds)) {
            selectedBreeds.forEach((option) => {
                this.fetchImagesForBreed(option);
            });
        }
    }
    
    componentDidUpdate(prevProps) {
        const { selectedBreeds, selectedNumber } = this.props;
        const { selectedBreeds: prevSelectedBreeds, selectedNumber: prevSelectedNumber } = prevProps;

        if (selectedNumber !== prevSelectedNumber || !prevSelectedBreeds) {
            if (selectedBreeds && Array.isArray(selectedBreeds)) {
                selectedBreeds.forEach((option) => {
                    this.fetchImagesForBreed(option);
                });
            }
        } else if (selectedBreeds && prevSelectedBreeds) {
            const newSelectedBreeds = selectedBreeds.filter((option) => !prevSelectedBreeds.includes(option));
            newSelectedBreeds.forEach((option) => {
                this.fetchImagesForBreed(option);
            });
        }
    }

    swapWords = (str) => {
        const words = str.split(' ');
        if (words.length >= 2) {
            const [firstWord, secondWord] = words;
            const swappedString = `${secondWord} ${firstWord}`;
            return swappedString;
        } else {
          return str;
        }
    }
    
    render() {
        const { breedImages } = this.state;
        const { selectedBreeds } = this.props;

        if (!breedImages || breedImages == {} || !selectedBreeds)  {
            return null;
        }

        const selectedBreedValues = new Set(selectedBreeds.map((option) => option));

        return (
            <div>
                {Object.entries(breedImages).map(([breedName, images]) => {
                if (selectedBreedValues.has(breedName)) {
                    return (
                    <div className='frame' key={breedName}>
                        <h3 className="text-center">{this.swapWords(breedName.replace('/', " "))}</h3>
                        <swiper-container
                            slides-per-view="auto"
                            space-between="10"
                            loop= "true"
                            free-mode= "true">
                        {images.map((image, index) => (
                            <swiper-slide key={index}>
                                <img src={image} alt={`${breedName} ${index + 1}`} />
                            </swiper-slide>
                        ))}
                        </swiper-container>
                    </div>
                    );
                }
                return null;
                })}
            </div>
    );
    }
  }
  
export default Carousel;