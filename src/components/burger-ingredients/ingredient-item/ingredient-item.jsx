import React from "react";
import burgerItem from "./burger-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const IngredientItem = ({ ingredient }) => {
    const { image, price, name } = ingredient;
    const constructorIngredients = useSelector(
        (store) => store.constructorIngredients
    );

    const bun = useSelector((store) => store.bun);

    const currentElAmount = constructorIngredients.filter((item) => {
        return item._id === ingredient._id;
    }).length;

    const [{ isDrag }, dragRef] = useDrag({
        type: ingredient.type,
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const counter = currentElAmount ? currentElAmount : 0;

    const renderCounter = () => {
        if (ingredient.type !== "bun") {
            if (counter) {
                return (
                    <Counter count={counter} extraClass={burgerItem.counter} />
                );
            }
        } else {
            if (bun && bun._id === ingredient._id && bun.qty) {
                return (
                    <Counter count={bun.qty} extraClass={burgerItem.counter} />
                );
            }
        }
    };

    const count = renderCounter();

    return (
        !isDrag && (
            <div ref={dragRef} className={`${burgerItem.card} mb-10 ml-3 mr-3`}>
                {count}
                <img className="ml-4 mr-4" src={image} alt={name} />
                <p className={`${burgerItem.price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default mr-2">
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className={`${burgerItem.name} text text_type_main-default`}>
                    {name}
                </p>
            </div>
        )
    );
};

IngredientItem.propTypes = {
    ingredient: PropTypes.object.isRequired,
};

export default IngredientItem;