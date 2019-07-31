import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStore } from '../../reducers/store';
import { useInterface } from '../../reducers/interface';
import Button, { SecondaryButton } from '../elements/Button';
import EmptyCart from './EmptyCart';
import CartList from './CartList';

const CartRoot = styled.div`
	background: ${(props) => props.theme.colors.lightest};
	bottom: 0;
	position: fixed;
	right: 0;
	top: -1px;
	transform: translateX(100%);
	transition: transform 0.75s;
	width: 100%;
	will-change: transform;
	z-index: 1000;
	&.open {
		transform: translateX(0%);
	}
	&.closed {
		transform: translateX(100%);
	}
	::after {
		background-color: ${(props) => props.theme.colors.lightest};
		bottom: 0;
		content: '';
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: all 250ms;
	}
	&.loading {
		::after {
			opacity: 0.9;
			pointer-events: all;
		}
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		width: ${(props) => props.theme.dimensions.cartWidthDesktop};
		&.covered {
			display: none;
		}
	}
`;

const Heading = styled.header`
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.dimensions.headerHeight};
	justify-content: flex-start;
`;

const Title = styled.h2`
	flex-grow: 1;
	font-family: ${(props) => props.theme.fonts.heading};
	font-size: 1.8rem;
	left: -${(props) => props.theme.dimensions.headerHeight};
	margin: 0;
	margin-left: ${(props) => props.theme.space[4]}px;
	position: relative;
	.open & {
		margin-left: calc(${(props) => props.theme.dimensions.headerHeight} + ${(props) => props.theme.space[4]}px);
		@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
			margin-left: ${(props) => props.theme.space[4]}px;
		}
	}
`;

const ItemsNumber = styled.span`
	align-items: center;
	background: ${(props) => props.theme.colors.lemon};
	border-radius: 50%;
	color: ${(props) => props.theme.colors.primaryDark};
	display: flex;
	font-size: 1.3rem;
	font-weight: bold;
	height: 36px;
	justify-content: center;
	width: 36px;
`;

const Content = styled.div`
	bottom: 0;
	overflow-y: auto;
	padding: ${(props) => props.theme.space[5]}px;
	position: absolute;
	top: ${(props) => props.theme.dimensions.headerHeight};
	width: 100%;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		::-webkit-scrollbar {
			height: 6px;
			width: 6px;
		}
		::-webkit-scrollbar-thumb {
			background: ${(props) => props.theme.colors.brandBright};
		}
		::-webkit-scrollbar-thumb:hover {
			background: ${(props) => props.theme.colors.lilac};
		}
		::-webkit-scrollbar-track {
			background: ${(props) => props.theme.colors.brandLight};
		}
	}
`;

const ItemsInCart = styled.div`
	align-items: center;
	display: flex;
	font-size: 0.8rem;
	line-height: 1.2;
	text-align: right;
	${ItemsNumber} {
		margin-left: ${(props) => props.theme.space[2]}px;
		margin-right: ${(props) => props.theme.space[4]}px;
	}
`;

const Costs = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${(props) => props.theme.space[3]}px;
`;

const Cost = styled.div`
	display: flex;
	padding: 0 ${(props) => props.theme.space[2]}px ${(props) => props.theme.space[1]}px;
	:last-child {
		padding-bottom: 0;
	}
	span {
		color: ${(props) => props.theme.colors.textMild};
		flex-basis: 50%;
		font-size: 0.9rem;
		text-align: right;
	}
	strong {
		color: ${(props) => props.theme.colors.lilac};
		flex-basis: 50%;
		text-align: right;
	}
`;

const Total = styled(Cost)`
  border-top: 1px solid ${(props) => props.theme.colors.brandBright};
  color: ${(props) => props.theme.colors.primaryDark};
  margin-top: ${(props) => props.theme.space[2]}px;
  padding-top: ${(props) => props.theme.space[4]}px;
  span {
    font-weight: bold;
    text-transform: uppercase;
  }
  strong,
  span {
    color: inherit;
  }
`;

const iconEntry = keyframes`
  0%, 50% {
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const numberEntry = keyframes`
  0%{
    transform: scale(0)
  }
  90% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(0.6);
  }
`;

const CartToggle = styled(SecondaryButton)`
  /* background: ${(props) => props.theme.colors.lightest}; */
	background: transparent;
  border: none;
  border-radius: 0;
  display: flex;
  height: ${(props) => props.theme.dimensions.headerHeight};
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  width: ${(props) => props.theme.dimensions.headerHeight};
  :focus {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.accent} inset;
  }
  .open & {
    background: ${(props) => props.theme.colors.lilac};
    color: ${(props) => props.theme.colors.lightest};
    transform: translateX(0);
  }
  @media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
    .open & {
      transform: translateX(-100%);
    }
  }
  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 28px;
    margin: 0;
    width: 28px;
  }
  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right: ${(props) => props.theme.space[3]}px;
    top: ${(props) => props.theme.space[3]}px;
    transform: scale(0.6);
  }
`;

const CheckOut = styled(Button)`
  font-size: 1.25rem;
  margin: ${(props) => props.theme.space[5]}px 0 ${(props) => props.theme.space[4]}px;
  width: 100%;
`;

const BackLink = styled(SecondaryButton)`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.space[3]}px;
  width: 100%;
	svg {
		margin-right: 0.75rem;
		font-size: 1rem
	}
`;

const Cart = () => {
	const [ loading, setLoading ] = useState(false);
	const storeReducer = useStore();

	const stateStore = storeReducer && storeReducer[0];
	const dispatchStore = storeReducer && storeReducer[1];

	const interfaceReducer = useInterface();

	const stateInterface = interfaceReducer && interfaceReducer[0];
	const dispatchInterface = interfaceReducer && interfaceReducer[1];

	const { client, checkout } = stateStore || {};
	const { cartStatus } = stateInterface || {};

	const itemsInCart = checkout && checkout.lineItems.reduce((total, item) => total + item.quantity, 0);

	const handleToogleCart = () => {
		dispatchInterface({ type: 'TOGGLE_CART' });
	};

	const setCartLoading = (bool) => setLoading(bool);

	const handleRemove = (itemID) => async (event) => {
		event.preventDefault();
		const newCheckout = await client.checkout.removeLineItems(checkout.id, [ itemID ]);
		dispatchStore({ type: 'SET_SHOPIFY_CHECKOUT', payload: newCheckout });
		setCartLoading(false);
	};

	const handleQuantityChange = (lineItemID) => async (quantity) => {
		if (!quantity) {
			return;
		}
		const lineItemsToUpdate = [ { id: lineItemID, quantity: parseInt(quantity, 10) } ];

		const newCheckout = await client.checkout.updateLineItems(checkout.id, lineItemsToUpdate);
		dispatchStore({ type: 'SET_SHOPIFY_CHECKOUT', payload: newCheckout });
		setCartLoading(false);
	};

	return (
		<CartRoot className={`${cartStatus} ${loading ? 'loading' : ''}`}>
			<Heading>
				<CartToggle aria-label={`Carrito de compras con ${itemsInCart} productos`} onClick={handleToogleCart}>
					{cartStatus === 'open' ? (
						<FontAwesomeIcon icon="times" />
					) : (
						<React.Fragment>
							<FontAwesomeIcon icon="shopping-cart" />
							{itemsInCart > 0 && <ItemsNumber>{itemsInCart}</ItemsNumber>}
						</React.Fragment>
					)}
				</CartToggle>
				<Title>Tu Carrito</Title>
				<ItemsInCart>
					productos
					<br />
					en tu carro
					<ItemsNumber>{itemsInCart}</ItemsNumber>
				</ItemsInCart>
			</Heading>
			{checkout && checkout.lineItems.length > 0 ? (
				<Content>
					<CartList
						items={checkout && checkout.lineItems}
						handleRemove={handleRemove}
						updateQuantity={handleQuantityChange}
						setCartLoading={setCartLoading}
						isCartLoading={loading}
					/>
					<Costs>
						<Cost>
							<span>Subtotal:</span> <strong>MXN ${checkout.subtotalPrice}</strong>
						</Cost>
						<Cost>
							<span>Impuestos:</span> <strong>{checkout.totalTax}</strong>
						</Cost>
						<Cost>
							<span>Envio</span> <strong>GRATIS</strong>
						</Cost>
						<Total>
							<span>Total:</span> <strong>MXN ${checkout.totalPrice}</strong>
						</Total>
					</Costs>
					<CheckOut href={checkout.webUrl}>Revisar</CheckOut>
					<BackLink onClick={handleToogleCart}>
						<FontAwesomeIcon icon="arrow-left" />
						Regresar a comprar
					</BackLink>
				</Content>
			) : (
				<EmptyCart />
			)}
		</CartRoot>
	);
};

export default Cart;
