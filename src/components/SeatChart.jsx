import { useEffect, useState } from "react";
import close from '../assets/close.svg'
import Seat from "./Seat";
import { Contract } from 'ethers'
import { abi, CONTRACT_ADDRESS } from "../constants";

const SeatChart = ({ show, ticketAr, provider, setToggle }) => {
    
    const [seatsTaken, setSeatsTaken] = useState(null);
    const [hasSold, setHasSold] = useState(null);


    const getSeatsTaken = async()=>{
        const seatsTaken = await ticketAr.getSeatsTaken(show.id)
        setSeatsTaken(seatsTaken);
    }

    const buyHandler = async(_seat) => {
        setHasSold(false);
        const signer = await provider.getSigner();
        const contractTx = new Contract(
            CONTRACT_ADDRESS,
            abi,
            signer
        )
        const tx = await contractTx.mint(show.id, _seat, { value: show.cost, gasLimit: 3000000 });
        console.log(tx)
        await tx.wait(); 
        setHasSold(true)
    }    

    useEffect(()=>{
        getSeatsTaken()
    },[])

    return(
        <div className="occasion">
            <div className="occasion__seating">
                <h1>{show.name} Seating Map</h1>
                <button onClick={()=>setToggle(false)} className="occasion__close">
                    <img src={close} alt="close"/>
                </button>
                <div className="occasion__stage">
                    <strong>STAGE</strong>
                </div>
                {seatsTaken && Array(25).fill(1).map((e, i)=>
                        <Seat
                            i={i}
                            step={1}
                            columnsStart={0}
                            maxColumns={5}
                            rowStart={2}
                            maxRows={5}
                            seatsTaken={seatsTaken}
                            buyHandler={buyHandler}
                            key={i}
                        />
                    
                    )}
                    
                    <div className="occasion__spacer--1 ">
                        <strong>WALKWAY</strong>
                    </div>
                    
                    {seatsTaken && Array(Number(show.maxTickets.toString()) - 50).fill(1).map((e, i)=>
                        
                            <Seat
                            i={i}
                            step={26}
                            columnsStart={6}
                            maxColumns={15}
                            rowStart={2}
                            maxRows={15}
                            seatsTaken={seatsTaken}
                            buyHandler={buyHandler}
                            key={i}
                        />
                    
                    )}
                    <div className="occasion__spacer--2 ">
                        <strong>WALKWAY</strong>
                    </div>
                    
                    
                    {seatsTaken && Array(25).fill(1).map((e, i) =>
                        
                        <Seat
                            i={i}
                            step={(Number(show.maxTickets) - 24)}
                            columnsStart={22}
                            maxColumns={5}
                            rowStart={2}
                            maxRows={5}
                            seatsTaken={seatsTaken}
                            buyHandler={buyHandler}
                            key={i}
                        />
                    )}
            </div>
        </div>
    )

}
export default SeatChart