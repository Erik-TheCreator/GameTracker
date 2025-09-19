import { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (starValue) => setHover(starValue);
  const handleMouseLeave = () => setHover(0);

  return (
    
    <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        let fill;
        const value = hover || rating;
        if (value >= star) fill = "100%"; 
        else if (value >= star - 0.5) fill = "50%"; 
        else fill = "0%"; 

        return (
          <div
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setRating(rating === star ? 0 : star)}

            style={{
              position: "relative",
              fontSize: "24px",
              width: "24px",
              height: "24px",
            }}
          >
            <span
              style={{
                position: "absolute",
                overflow: "hidden",
                width: fill,
                color: "gold",
              }}
            >
              ★
            </span>
            <span style={{ color: "lightgray" }}>★</span>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
