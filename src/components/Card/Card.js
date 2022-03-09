import "./card.css";

export default function Card({ card,bodyId }) {
  return (
    <div className={`card ${bodyId ? "card-shrink" : ""} ${card.hasRead ? "read" : ""}`}>
      <div className="icon"><div className='icon-wrap'>{(card?.from?.name)?.slice(0,1)}</div></div>
      <div className="info">
        <div className="from">
          <span>From:</span> {card?.from?.name} {"<"}
          {card?.from?.email}
          {">"}
        </div>
        <div className="sub"><span>Subject:</span> {card?.subject}</div>
        <div className="desc">{(card?.short_description)?.substring(0,50)} {(card?.short_description)?.length > 50 ? "..." : ""}</div>
        <div className="end">
          <div className="date">
            {new Date(card?.date).toLocaleDateString("en-IN", {
              hour: "numeric",
              hour12: true
            })}
          </div>
          <div className="fav"></div>
        </div>
      </div>
    </div>
  );
}
