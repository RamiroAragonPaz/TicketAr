import { ethers } from 'ethers'

const Card = ({ show, setShow, toggle, setToggle }) => {

    const togglePop = () => {
        setShow(show);
        toggle ? setToggle(false) : setToggle(true);
    }

  return (
    <div className='card'>
      <div className='card__info'>
        <p className='card__date'>
          <strong>{show.date}</strong><br />{show.time}
        </p>

        <h3 className='card__name'>
          {show.name}
        </h3>

        <p className='card__location'>
          <small>{show.location}</small>
        </p>

        <p className='card__cost'>
          <strong>
            {ethers.utils.formatUnits(show.cost.toString(), 'ether')}
          </strong>
          ETH
        </p>

        {show.tickets.toString() === "0" ? (
          <button
            type="button"
            className='card__button--out'
            disabled
          >
            Sold Out
          </button>
        ) : (
          <button
            type="button"
            className='card__button'
            onClick={()=>togglePop()}
          >
            View Seats
          </button>
        )}
      </div>

      <hr />
    </div >
  );
}

export default Card;
