const Seat = ({ i, step, columnsStart, maxColumns, rowStart, maxRows, seatsTaken, buyHandler })=>{
    let column = (i % maxColumns) + 1 + columnsStart;
    let row = Math.ceil(((i + 1) / maxRows )) + rowStart;
    
    return(
    <div 
        onClick={()=>buyHandler(i+step)}
        className={seatsTaken.find(seat => Number(seat) == i + step) ? 'occasion__seats--taken' : 'ocasion__seats'}
        style={{
            gridColumn: `${(column)}`,
            gridRow: `${row}`
        }}
    >  
        {i+step}
    </div>
    )
}
export default Seat