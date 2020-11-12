import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
    <div>
      <Navbar />
      <div className="randombeerbackground">
        <Button onClick={handleClick} variant="dark">
          Back
        </Button>{' '}
        <Button onClick={refreshPage} variant="dark">
          Give Me Another!
        </Button>{' '}
        <h1 className="randomName">{randomBeerInfo.name}</h1>;
        <img
          src={
            randomBeerInfo.image_url == null ? dog : randomBeerInfo.image_url
          }
        />
        <p className="randomDescription">
          FACTOIDS: {randomBeerInfo.description}
        </p>
        <p className="randomfoodPairing">
          RECOMMENDED FOOD PAIRING: {randomBeerInfo.food_pairing}
        </p>
        <p className="randombeerABV"> ABV: {randomBeerInfo.abv}</p>
        <p className="randombeerIBU"> IBU: {randomBeerInfo.ibu}</p>
        <h2> Interested in brewing your own? </h2>
        <p className="line"> Try this: </p>
        <p className="randombeerBrew"> {randomBeerInfo.brewers_tips}</p>
      </div>
    </div>
  );
};
export default Randombeer;
