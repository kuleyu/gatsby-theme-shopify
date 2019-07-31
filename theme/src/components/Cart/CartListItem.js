import React, { useState } from 'react';
import styled from '@emotion/styled';
import CartThumbail from './CartThumbail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Input } from '../elements/FormElements';
import { SecondaryButton } from '../elements/Button';

const CartListItemRoot = styled.li`
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.brandLight};
	display: flex;
	justify-content: space-between;
	padding: ${(props) => props.theme.space[4]}px 0;
`;

const Thumbail = styled(CartThumbail)`
  flex-grow: 0;
  margin-left: ${(props) => props.theme.space[1]}px;
  margin-right: ${(props) => props.theme.space[3]}px;
`;

const Info = styled.div`flex-grow: 1;`;

const Name = styled.span`
	display: block;
	font-size: 1rem;
	line-height: 1.2;
`;

const Meta = styled.span`
	color: ${(props) => props.theme.colors.textLight};
	display: block;
	font-size: 0.95rem;
	font-style: normal;
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  margin-right: ${(props) => props.theme.space[2]}px;
  padding: 0 ${(props) => props.theme.space[2]}px 0;
  text-align: center;
  width: 50px;
  @media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
    width: 70px;
  }
`;

const Remove = styled(SecondaryButton)`
  border: 1px dotted ${(props) => props.theme.colors.textLighter};
  display: flex;
  height: 44px;
  justify-content: center;
  margin-right: ${(props) => props.theme.space[1]}px;
  padding: 0;
	min-width: 44px;
  svg {
    height: 24px;
    margin: 0;
    width: 24px;
  }
`;

const CartListItem = ({ item, setCartLoading, updateQuantity, handleRemove, isCartLoading }) => {
	const [ quantity, setQuantity ] = useState(item.quantity);
	// useEffect(() => {
	// 	setQuantity(item.quantity);
	// }, [item.quantity]);

	if (item.quantity !== quantity && quantity !== '' && !isCartLoading) {
		setQuantity(item.quantity);
	}

	const handleInputUpdate = (event) => {
		if (isCartLoading) {
			return;
		}

		if (quantity === '') {
			return;
		}

		if (item.quantity === quantity) {
			return;
		}

		setCartLoading(true);

		if (quantity === 0) {
			handleRemove(event);
			return;
		}

		updateQuantity(quantity);
	};

	const handleInputChange = (event) => {
		const value = event.target.value;

		if (value === '') {
			setQuantity(value);
			return;
		}

		const safeValue = Math.max(Number(value), 0);

		setQuantity(safeValue);
	};

	const handleRemoveItem = (event) => {
		setCartLoading(true);
		handleRemove(event);
	};

	return (
		<CartListItemRoot>
			<Thumbail id={item.variant.image.id} fallback={item.variant.image.src} alt={item.variant.image.altText} />
			<Info>
				<Name>{item.title}</Name>
				<Meta>
					{item.variant.title}, ${item.variant.price}
				</Meta>
			</Info>
			<Quantity
				aria-label="Quantity"
				id={`quantity_${item.id.substring(58, 64)}`}
				type="number"
				name="quantity"
				min="1"
				step="1"
				onChange={handleInputChange}
				onBlur={handleInputUpdate}
				value={quantity}
			/>
			<Remove onClick={handleRemoveItem}>
				<FontAwesomeIcon icon="times" />
			</Remove>
		</CartListItemRoot>
	);
};

export default CartListItem;
