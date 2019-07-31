import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from '@emotion/styled';
import { Label, Input, Fieldset, Submit, Select } from '../elements/FormElements';
import Link from '../elements/Link';
import { useStore } from '../../reducers/store';

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: ${(props) => props.theme.space[7]}px ${(props) => props.theme.space[4]}px 0;
	@media (min-width: ${(props) => props.theme.breakPoints.tablet}px) {
		padding: ${(props) => props.theme.space[7]}px ${(props) => props.theme.space[6]}px 0;
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		justify-content: flex-start;
	}
`;

const Errors = styled.div`
	display: ${(props) => (props.show ? 'flex' : 'none')};
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.space[2]}px;
	width: 100%;
`;

const ErrorSign = styled.div`
	align-items: center;
	background: ${(props) => props.theme.colors.error};
	border-radius: ${(props) => props.theme.radius.default}px 0 0 ${(props) => props.theme.radius.default}px;
	color: ${(props) => props.theme.colors.lightest};
	display: flex;
	flex-basis: 40px;
	justify-content: center;
	svg {
		height: 20px;
		width: 20px;
	}
`;

const ErrorMsgs = styled.ul`
	border: 1px dashed ${(props) => props.theme.colors.error};
	border-left: none;
	border-radius: 0 ${(props) => props.theme.radius.default}px ${(props) => props.theme.radius.default}px 0;
	color: ${(props) => props.theme.colors.error};
	flex-grow: 1;
	margin: 0;
	padding: ${(props) => props.theme.space[2]}px;
	padding-left: ${(props) => props.theme.space[6]}px;
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 65px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${(props) => props.theme.space[4]}px;
  ${Label} {
    text-align: center;
  }
  ${Input} {
    padding: ${(props) => props.theme.space[3]}px ${(props) => props.theme.space[3]}px;
    text-align: center;
  }
`;

const SizeFieldset = styled(Fieldset)`
  flex-basis: calc((100% - ${(props) => props.theme.space[4]}px) - 90px);
  ${Label} {
    justify-content: space-between;
  }
`;

// const InfoLinks = styled(`div`)`
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   margin-top: ${(props) => props.theme.space[5]}px;
//   width: 100%;
// `;

const AddToCartButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
	margin: 2rem 0;
  /* height: ${(props) => (props.fullWidth ? 'auto' : '')};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')}; */
`;

const ProductForm = ({ id: rawId, variants }) => {
	const storeReducer = useStore();
	const state = storeReducer && storeReducer[0];
	const dispatch = storeReducer && storeReducer[1];

	const [ errors, setErrors ] = useState([]);
	const [ formValues, setValues ] = useState({
		variant: variants.length === 1 ? variants[0].shopifyId : '',
		quantity: 1
	});

	const hasVariants = variants.length > 1;

	/*
		* For products without variants, we disable the whole Add to Cart button
		* and change the text. This flag prevents us from duplicating the logic in
		* multiple places.
		*/

	const isOutOfStock = !hasVariants && !variants[0].availableForSale;

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = [];

		if (formValues['quantity'] < 1) {
			newErrors.push({
				field: 'quantity',
				msg: 'La <b>cantidad</b> no puede ser 0.'
			});
		}

		if (formValues['variant'] === '' || formValues['variant'] === '.') {
			newErrors.push({
				field: 'variant',
				msg: 'Por favor selecciona una <b>opción</b>.'
			});
		}

		if (newErrors.length) {
			setErrors(newErrors);
			return;
		}

		const { quantity, variant: variantId } = formValues;

		dispatch({ type: 'ADDING_PRODUCT' });

		const { client, checkout } = state;
		const checkoutId = checkout.id;

		const lineItemsToUpdate = [ { variantId, quantity: parseInt(quantity, 10) } ];

		try {
			const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToUpdate);
			dispatch({ type: 'CHECKOUT_SHOPIFY', payload: checkout });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event) => {
		event.preventDefault();

		if (event.target.value) {
			const newErrors = errors;
			const errorIdx = newErrors.findIndex((error) => error.field === event.target.name);
			newErrors.splice(errorIdx, 1);

			if (errorIdx) setErrors(newErrors);
		}

		setValues({ ...formValues, [event.target.name]: event.target.value });
	};

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<Errors show={errors.length}>
				<ErrorSign>
					<FontAwesomeIcon icon="exclamation-circle" />
				</ErrorSign>
				<ErrorMsgs>
					{errors.map((error) => <li key={error.field} dangerouslySetInnerHTML={{ __html: error.msg }} />)}
				</ErrorMsgs>
			</Errors>
			<QtyFieldset>
				<Label htmlFor="quantity">Cantidad</Label>
				<Input
					type="number"
					id="quantity"
					name="quantity"
					min="1"
					step="1"
					onChange={handleChange}
					value={formValues['quantity']}
				/>
			</QtyFieldset>
			{hasVariants && (
				<SizeFieldset>
					<Label htmlFor="variant">
						Opciones
						<Link to="/product-details">
							<FontAwesomeIcon icon="info-circle" />
							<span>Size Chart</span>
						</Link>
					</Label>
					<Select id="variant" value={formValues['variant']} name="variant" onChange={handleChange}>
						<option disabled value="">
							Elije una opción
						</option>
						{variants.map((variant) => {
							const { title, availableForSale, shopifyId } = variant;
							return (
								<option disabled={!availableForSale} value={shopifyId} key={shopifyId}>
									{title}
								</option>
							);
						})}
					</Select>
				</SizeFieldset>
			)}
			<AddToCartButton type="submit" disabled={isOutOfStock} fullWidth={hasVariants}>
				{isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
				{isOutOfStock ? <FontAwesomeIcon icon="frown" /> : <FontAwesomeIcon icon="shopping-cart" />}
			</AddToCartButton>
			{/* <InfoLinks>
				<Link to="/product-details?fromProduct#materials-fit">
					<span>Materials &amp; Fit</span>
				</Link>
				&nbsp; • &nbsp;
				<Link to="/product-details?fromProduct#care-instructions">
					<span>Care instructions</span>
				</Link>
			</InfoLinks> */}
		</Form>
	);
};

export default ProductForm;
