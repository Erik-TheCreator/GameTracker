import { useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    
    if (rating === value) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const handleMouseMove = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const isHalf = mouseX < width / 2; 
    const value = isHalf ? index + 0.5 : index + 1;
    setHover(value);
  };

  const handleMouseLeave = () => setHover(0);

  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {[...Array(5)].map((_, index) => {
        const currentValue = index + 1;
        const effectiveValue = hover || rating;

        let icon;
        if (effectiveValue >= currentValue) {
          icon = <IoStar size={25} color="#ffc107" />; 
        } else if (effectiveValue >= currentValue - 0.5) {
          icon = <IoStarHalf size={25} color="#ffc107" />; 
        } else {
          icon = <IoStarOutline size={25} color="#ffc107" />; 
        }

        return (
          <span
            key={index}
            onClick={(e) => handleClick(
              e.nativeEvent.offsetX < e.currentTarget.offsetWidth / 2
                ? index + 0.5
                : index + 1
            )}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
