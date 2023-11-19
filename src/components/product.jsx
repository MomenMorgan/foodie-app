export default function Product(props) {
        const { image, title, category, price, description } = props.product;
      
        return (
          <div>
            <div style={{ backgroundImage: `url(${image})` }}></div>
            <div>
              <h3>{title}</h3>
              <p>{category}</p>
              <p>{price}</p>
              <p>{description}</p>
            </div>
          </div>
        );
      }