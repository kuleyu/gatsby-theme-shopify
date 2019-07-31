import React from 'react';
import styled from '@emotion/styled';
import CartListItem from './CartListItem';

const CartListRoot = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const Headers = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.colors.brandBright};
	display: flex;
	justify-content: space-between;
	span {
		color: ${(props) => props.theme.colors.textLight};
		flex-basis: 60px;
		flex-grow: 0;
		font-size: 0.8rem;
		padding-bottom: ${(props) => props.theme.space[2]}px;
		text-align: center;
		&:first-of-type {
			flex-grow: 1;
			text-align: left;
		}
	}
`;

const CartList = ({ items, handleRemove, updateQuantity, setCartLoading, isCartLaoding }) => {
	return (
		<React.Fragment>
			<Headers>
				<span>Producto</span>
				<span>Cantidad</span>
				<span>Eliminar</span>
			</Headers>
			<CartListRoot>
				{items.map((item) => (
					<CartListItem
						key={item.id}
						item={item}
						handleRemove={handleRemove(item.id)}
						updateQuantity={updateQuantity(item.id)}
						setCartLoading={setCartLoading}
						isCartLoading={isCartLaoding}
					/>
				))}
			</CartListRoot>
		</React.Fragment>
	);
};

export default CartList;
