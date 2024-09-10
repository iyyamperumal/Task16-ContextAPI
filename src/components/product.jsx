import { createContext, useState, useContext } from "react";
import propTypes from "prop-types";
const AmountContext = createContext(null);
const props = {
    cost: propTypes.number,
};
const Child1 = () => {
    const { cost } = useContext(AmountContext);
    return (
        <>
            <span className="mid-set">
                <span className="mid1">
                    <p>SUBTOTAL:</p>
                    <p>SHIPPING:</p>
                </span>
                <span className="mid2">
                    <p><b>${cost}</b></p>
                    <p><b>FREE</b></p>
                </span>
            </span>
            <hr />
            <Child2 />
        </>
    )
}
Child1.propTypes = props;
const Child2 = () => {
    const { cost, increase, decrease } = useContext(AmountContext);
    return (
        <>
            <span className="bottom-set">
                <h3>TOTAL:</h3>
                <h3>${cost}</h3>
            </span>
            <hr />
        </>
    )
}
Child2.propTypes = props;
const Product = ({ title, image, description, category, price, rating }) => {
    const [count, setCount] = useState(1);
    const [cost, setCost] = useState(price);
    function increase() {
        setCount(count + 1);
        setCost(cost + price);
    }
    function decrease() {
        if (count > 1) {
            setCount(count - 1);
            setCost(cost - price);
        }

    }

    return (
        <>
            <AmountContext.Provider value={{ cost, increase, decrease }}>
                <div className="poduct-div">
                    <span className="first-set">
                        <img src={image} />
                        <span className="first">
                            <h2>{title}</h2>
                            <p style={{ fontWeight: "bold" }}>Details & Core</p>
                            <p>{description}</p>
                            <p style={{ fontWeight: "bold" }}>{category}</p>
                            <span style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                                <a><b>${price} /item</b></a><a> Rating: {rating.rate}</a><a> Count: {rating.count}</a>
                            </span>
                        </span>
                        <span className="second">
                            <button onClick={increase}>➕</button>
                            <h3>{count}</h3>
                            <button onClick={decrease}>➖</button>
                        </span>
                        <span className="third">
                            <h3>${cost}</h3>
                            <a style={{
                                color: "red",
                                fontWeight: "bold",
                                textDecoration: "none"
                            }} href="#">REMOVE</a>
                        </span>
                    </span>
                    <hr />
                    <Child1 />
                </div>
            </AmountContext.Provider>
        </>
    )
};
Product.propTypes = {
    title: propTypes.string,
    id: propTypes.number,
    description: propTypes.string,
    category: propTypes.string,
    image: propTypes.string,
    price: propTypes.number,
}
export default Product;