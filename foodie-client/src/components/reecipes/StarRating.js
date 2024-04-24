import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ average, quantity }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={"half"} style={{ opacity: 0.5 }} />
      );
    }

    const remainingStars = quantity - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`empty-${i}`}
          style={{ opacity: 0.2 }}
        />
      );
    }

    return stars;
  };

  return <div className="text-amber-500">{renderStars()}</div>;
};

export default StarRating;
