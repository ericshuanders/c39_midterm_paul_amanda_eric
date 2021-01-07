import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import dog from '../images/dog.jpg';
import Button from 'react-bootstrap/Button';

const Randombeer = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/results');
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const [randomBeerInfo, setRandomBeerInfo] = useState({});

  useEffect(() => {
    const getRandomBeerInfo = async () => {
      const result = await fetch(`https://api.punkapi.com/v2/beers/random`);
      const data = await result.json();
      setRandomBeerInfo(data[0]);
    };
    try {
      getRandomBeerInfo();
    } catch (error) {
      alert('Error');
    }
  }, []);

  return (
    <div className="beer-info-wrapper">
      <Navigation />

      <Container className="beer-info-background">
        <Button onClick={handleClick} variant="dark">
          Back
        </Button>
        <div className="beerHeader">
          <h1 className="beerName">{randomBeerInfo.name}</h1>
          <h3 className="beerTag">"{randomBeerInfo.tagline}"</h3>
        </div>

        <img
          src={
            randomBeerInfo.image_url == null ? dog : randomBeerInfo.image_url
          }
          className="beerImage"
        />
        <h2 className="beerABV">
          First Brewed in {randomBeerInfo.first_brewed}
        </h2>
        <h2 className="beerABV"> abv: {randomBeerInfo.abv}</h2>
        <h2 className="beerIBU"> ibu: {randomBeerInfo.ibu}</h2>
        <h2 className="tasting-notes">Tasting Notes:</h2>
        <p className="beerDescription">{randomBeerInfo.description}</p>
        <div className="foodPairing-div">
          <h2 className="foodPairing-header">Recommended food pairing: </h2>
          <ul>
            {randomBeerInfo.food_pairing?.map((food) => (
              <li className="foodPairing">{food}</li>
            ))}
          </ul>
        </div>
        {console.log(randomBeerInfo.food_pairing)}
        {console.log(randomBeerInfo.food_pairing?.[0])}
        <div className="brewing-tips-div">
          <h2 className="brewing-tips">
            Interested in brewing your own? Try this:{' '}
          </h2>
          <h3>Malts: </h3>
          <ul>
            {randomBeerInfo.ingredients?.malt?.map((malt) => (
              <li className="beerBrew">
                {malt?.name} : {malt?.amount?.value} {malt?.amount?.unit}
              </li>
            ))}
          </ul>
          <h3>Hops: </h3>
          <ul>
            {randomBeerInfo.ingredients?.hops?.map((hop) => (
              <li className="beerBrew">
                {hop?.name} : {hop?.amount?.value} {hop?.amount?.unit}
              </li>
            ))}
          </ul>
          <p className="beerBrew">
            Boil Volume: {randomBeerInfo.volume?.value}{' '}
            {randomBeerInfo.volume?.unit}
          </p>
          <p className="beerBrew">
            Mash Temperature: {randomBeerInfo.method?.mash_temp[0].temp?.value}{' '}
            {randomBeerInfo.method?.mash_temp[0].temp?.unit}
          </p>
          <p className="beerBrew"> {randomBeerInfo.brewers_tips}</p>
        </div>
      </Container>
    </div>
  );
};
export default Randombeer;
