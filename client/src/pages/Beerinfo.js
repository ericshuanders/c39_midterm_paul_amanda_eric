import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import dog from '../images/dog.jpg';
import Button from 'react-bootstrap/Button';

const Beerinfo = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
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
    <div className="beer-info-wrapper">
      <Navigation />

      <Container className="beer-info-background">
        <Button onClick={handleClick} variant="dark">
          Back
        </Button>
        <div className="beerHeader">
          <h1 className="beerName">{beerInfo.name}</h1>
          <h3 className="beerTag">"{beerInfo.tagline}"</h3>
        </div>

        <img
          src={beerInfo.image_url == null ? dog : beerInfo.image_url}
          className="beerImage"
        />
        <h2 className="beerABV">First Brewed in {beerInfo.first_brewed}</h2>
        <h2 className="beerABV"> abv: {beerInfo.abv}</h2>
        <h2 className="beerIBU"> ibu: {beerInfo.ibu}</h2>
        <h2 className="tasting-notes">Tasting Notes:</h2>
        <p className="beerDescription">{beerInfo.description}</p>
        <div className="foodPairing-div">
          <h2 className="foodPairing-header">Recommended food pairing: </h2>
          <ul>
            {beerInfo.food_pairing?.map((food) => (
              <li className="foodPairing">{food}</li>
            ))}
          </ul>
        </div>
        {console.log(beerInfo.food_pairing)}
        {console.log(beerInfo.food_pairing?.[0])}
        <div className="brewing-tips-div">
          <h2 className="brewing-tips">
            Interested in brewing your own? Try this:{' '}
          </h2>
          <h3>Malts: </h3>
          <ul>
            {beerInfo.ingredients?.malt?.map((malt)=> (
              <li className="beerBrew">{malt?.name} : {malt?.amount?.value} {malt?.amount?.unit}</li>
            ))}
          </ul>
          <h3>Hops: </h3>
          <ul>
            {beerInfo.ingredients?.hops?.map((hop)=>(
              <li className="beerBrew">{hop?.name} : {hop?.amount?.value} {hop?.amount?.unit}</li>
            ))}
          </ul>
          <p className="beerBrew">
            Boil Volume: {beerInfo.volume?.value} {beerInfo.volume?.unit}
          </p>
          <p className="beerBrew">
            Mash Temperature: {beerInfo.method?.mash_temp[0].temp?.value}{' '}
            {beerInfo.method?.mash_temp[0].temp?.unit}
          </p>
          <p className="beerBrew"> {beerInfo.brewers_tips}</p>
        </div>
      </Container>
    </div>
  );
};
export default Beerinfo;
