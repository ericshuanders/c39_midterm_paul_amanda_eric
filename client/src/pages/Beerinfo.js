import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import dog from '../images/dog.jpg';
import Button from 'react-bootstrap/Button';

const Beerinfo = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/results');
  };
  const [beerInfo, setBeerInfo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getBeerInfo = async () => {
      const result = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
      const data = await result.json();
      setBeerInfo(data[0]);
    };
    try {
      getBeerInfo();
    } catch (error) {
      alert('Error');
    }
  }, [id]);
  console.log(beerInfo);
  return (
    <div>
      <Navbar />
      <div className="beerPage">
        <Button onClick={handleClick} variant="dark">
          Back
        </Button>
        <div className="beer-info-background">
          <h1 className="beerName">{beerInfo.name}</h1>

          <img
            src={beerInfo.image_url == null ? dog : beerInfo.image_url}
            className="beerImage"
          />
          <h2 className="beerABV"> abv: {beerInfo.abv}</h2>
          <h2 className="beerIBU"> ibu: {beerInfo.ibu}</h2>
          <h2 className="tasting-notes">Tasting Notes:</h2>
          <p className="beerDescription">{beerInfo.description}</p>
          <h2 className="foodPairing-header">Recommended food pairing: </h2>
          {beerInfo.food_pairing?.map((food) => (
            <p className="foodPairing">{food}</p>
          ))}
          {console.log(beerInfo.food_pairing)}
          {console.log(beerInfo.food_pairing?.[0])}

          <h2> Interested in brewing your own? </h2>
          <h3>Try this: </h3>

          <p className="beerBrew"> {beerInfo.brewers_tips}</p>
        </div>
      </div>
    </div>
  );
};
export default Beerinfo;
