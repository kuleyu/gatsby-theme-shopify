import React, { useState } from 'react';
import { Container, Styled, useThemeUI } from 'theme-ui';
import styled from '@emotion/styled';
import { PulseLoader } from 'react-spinners';

import { Flex } from '@rebass/grid/emotion';
import { Input, Label, Submit, Fieldset, TextArea } from '../elements/FormElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const ContainerForm = styled.div`
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
	padding: ${(props) => props.theme.space[5]}px ${(props) => props.theme.space[5]}px;
	border-radius: ${(props) => props.theme.radius.large}px;
	min-width: 300px;
	max-width: 450px;
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

const SubmitButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
	margin-top: ${(props) => props.theme.space[5] * 2}px;
`;

const SizeFieldset = styled(Fieldset)`
  flex-basis: calc((100% - ${(props) => props.theme.space[4]}px) - 90px);
`;

const Description = styled.p`
	color: ${(props) => props.theme.colors.gray[2]};
	font-size: 15px;
`;

const Content = styled.div`text-align: center;`;

const initialState = {
	name: '',
	email: '',
	message: ''
};

const SectionContact = ({ title, description, apiData, shopName }) => {
	const [ formValues, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState({});
	const { theme } = useThemeUI();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = {};
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (formValues['name'] === '') {
			newErrors['name'] = 'El campo <b>nombre</b> no puede estar vacío.';
		}

		if (formValues['message'] === '') {
			newErrors['message'] = 'El campo <b>mensaje</b> no puede estar vacío.';
		}

		if (!regex.test(formValues['email'])) {
			newErrors['email'] = 'Ingresa un <b>correo</b> válido.';
		}

		if (Object.keys(newErrors).length) {
			setErrors(newErrors);
			return;
		}
		setLoading(true);

		/* Send email */

		const { url, baseURL, auth } = apiData;

		try {
			await axios({
				method: 'post',
				baseURL,
				url,
				data: { ...formValues, shop: 'tc-pork' },
				auth
			});
			setLoading(false);
			setValues(initialState);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleChange = (event) => {
		event.preventDefault();

		if (event.target.value) {
			const lastErrors = errors;
			if (lastErrors[event.target.name]) {
				delete lastErrors[event.target.name];
				setErrors(lastErrors);
			}
		}

		setValues({ ...formValues, [event.target.name]: event.target.value });
	};

	return (
		<Container>
			<Flex justifyContent="center" style={{ padding: '2rem 0 5rem 0' }}>
				<ContainerForm>
					<Content>
						<Styled.h2>{title}</Styled.h2>
						<Description>{description}</Description>
					</Content>
					<form onSubmit={handleSubmit}>
						<Errors show={Object.keys(errors).length}>
							<ErrorSign>
								<FontAwesomeIcon icon="exclamation-circle" />
							</ErrorSign>
							<ErrorMsgs>
								{Object.keys(errors).map((key) => (
									<li key={key} dangerouslySetInnerHTML={{ __html: errors[key] }} />
								))}
							</ErrorMsgs>
						</Errors>
						<SizeFieldset>
							<Label htmlFor="name">Nombre</Label>
							<Input
								name="name"
								type="text"
								id="name"
								onChange={handleChange}
								value={formValues['name']}
								autocomplete="off"
							/>
						</SizeFieldset>
						<SizeFieldset>
							<Label htmlFor="email">Correo</Label>
							<Input
								name="email"
								type="email"
								id="email"
								onChange={handleChange}
								value={formValues['email']}
								autocomplete="off"
							/>
						</SizeFieldset>
						<SizeFieldset>
							<Label htmlFor="message">Mensaje</Label>
							<TextArea
								name="message"
								type="textarea"
								id="message"
								rows="6"
								onChange={handleChange}
								value={formValues['message']}
							/>
						</SizeFieldset>
						<SubmitButton type="submit" disabled={loading}>
							<PulseLoader color={theme.colors.lightest} sizeUnit={'px'} size={12} loading={loading} />
							{!loading && (
								<React.Fragment>
									<FontAwesomeIcon icon="paper-plane" /> Enviar
								</React.Fragment>
							)}
						</SubmitButton>
					</form>
				</ContainerForm>
			</Flex>
		</Container>
	);
};

export default SectionContact;
