import { utils } from "ethers";
import { useEffect, useState } from "react";
import close from '../assets/close.svg'


const Navigation = ({ shows, account, setAccount, ticketAr  }) => {
    const [tickets, setTickets] = useState([]);
    const [toggleTicket, setToggleTicket] = useState(false)
    const [loading, setLoading] = useState(false);

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = utils.getAddress(accounts[0]);
        setAccount(account);
    }

    const getTickets = async() => {
        setLoading(true)
        const tickets = [];
        for(let i=0; i <= shows.length; i++){
            const ticket = await ticketAr.tickets(i);
            if(ticket.client == account){
            tickets.push(ticket)
            }
        }
        setTickets(tickets);
        setLoading(false);
    }



    const togglePop = async() => {
        toggleTicket ? setToggleTicket(false) : setToggleTicket(true);
        getTickets()
    }

 
    return(
        <nav>
            <div className="nav__brand">
                <h1>TicketAr</h1>
            </div>
            {account ? (
                <div className="nav__buttons">
                    <div>
                        <button
                        type="button"
                        className="nav__connect">
                            {account.slice(0,6) + '...' + account.slice(38,42)}
                        </button>
                    </div>
                    <div className="nav__ticket">
                    <button 
                    type="button" 
                    className="nav__tickets"
                    onClick={togglePop}>
                        Your Tickets
                    </button>
                    </div>
                    {toggleTicket && (
                        <div className="ticketbox">
                            <div className="ticketbox__place">
                                <div>
                                    <button onClick={()=>setToggleTicket(false)} className="occasion__close">
                                        <img src={close} alt="close"/>
                                    </button>
                                </div>
                                <h1 className="tricket__title">This are your tickets</h1>
                                {loading ? (
                                <div className='cards'>
                                    <div className='card__info'>
                                        <p className='card__date'>Loading...</p>
                                    </div>
                                </div>
                                ):(
                                    <div className='cards'>
                                        {tickets.length <= 0 ? (
                                            <div className='card'>
                                                <div className='card__info'>
                                                    <p className='card__name'>No Tickets Yet!</p>
                                                </div>
                                            </div>
                                        ):(
                                            <div>
                                            {tickets.map((ticket, id)=>{
                                                return(
                                                    <div className='card' key={id}>
                                                    <hr/>
                                                        <div className='card__info'>
                                                            <p className='card__date'>
                                                                <strong>{ticket.date}</strong><br />
                                                                {ticket.time}
                                                            </p>
                                                            <h3 className='card__name'>
                                                            {ticket.name}
                                                            </h3>
                                                            <p className='card__location'>
                                                            <small>{ticket.location}</small>
                                                            </p>
                                                            <p className='card__cost'>
                                                                Seat: {ticket.id.toString()}
                                                            </p>
                                                        </div>
                                                        <hr/>
                                                    </div>
                                                    )
                                                })}
                                                </div> 
                                        )}
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                ):(
                <div className="nav__buttons">
                    <button
                    type="button"
                    className="nav__connect"
                    onClick={connectHandler}>
                        Connect
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navigation