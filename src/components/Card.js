import React from 'react';

const Card = (props) => {
  return (
    (props.data === '') ? (
    <div className='tc grow bg-black br3 pa3 ma0 dib bw2 shadow-5 flex justify-center' style={{width:'inherit', height:'inherit'}}>
      <img alt='MARS' src={`${props.url}`} style={{width:'inherit' ,height:'inherit'}} />
    </div>
  ) : (
    <div className='tc grow bg-black br3 pa3 ma0 dib bw2 shadow-5 flex justify-center pa2' style={{width:'inherit', height:'inherit'}}>
      <div>
        <h1 className="pa0 ma0">Sol:</h1>
        <h1 className="pa3 ma0 red">{props.data.sol_keys[props.sol]}</h1>
        <p className="pa3">{`Temp min: ${((props.data[props.data.sol_keys[props.sol]].AT.mn - 32)*5/9).toFixed(2)}ºC`}</p>
        <p className="pa2">{`Temp max: ${((props.data[props.data.sol_keys[props.sol]].AT.mx - 32)*5/9).toFixed(2)}ºC`}</p>
        <p className="pa5 red">{props.data[props.data.sol_keys[props.sol]].Season}</p>
      </div>
    </div>
  )
  );
}

export default Card;
