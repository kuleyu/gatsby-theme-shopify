import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSiteMetadata from '../hooks/useSiteMetadata';

const FooterRoot = styled.footer`
	align-items: center;
	color: ${(props) => props.theme.colors.textMild};
	display: flex;
	flex-direction: column;
	font-size: 0.85rem;
	padding: ${(props) => props.theme.space[4]}px;
	padding-bottom: calc(${(props) => props.theme.space[6]}px + 50px);
	a {
		color: ${(props) => props.theme.colors.primary};
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		min-height: 50px;
		padding: 0 ${(props) => props.theme.space[6]}px 10px;
	}
`;

const Row = styled.span`
	display: inline-block;
	flex-shrink: 0;
	line-height: 1.3;
	padding-bottom: ${(props) => props.theme.space[1]}px;
	text-align: center;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		line-height: 1.4;
		padding-bottom: 0;
	}
`;

const Spacer = styled.span`
	display: none;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		display: inline-block;
		padding: 0 ${(props) => props.theme.space[3]}px;
	}
`;

const SocialButton = styled.a`
	color: ${(props) => props.theme.colors.primary};
	padding: 0 5px;
	font-size: 1rem;
`;

const Footer = () => {
	const { socialMedia, email } = useSiteMetadata();

	return (
		<FooterRoot>
			<Row>
				Contactanos por nuetras redes sociales
				{Object.keys(socialMedia).map((key, index) => (
					<SocialButton key={index} href={socialMedia[key]} alt={key}>
						<FontAwesomeIcon icon={[ 'fab', key ]} />
					</SocialButton>
				))}
			</Row>
			<Row>
				&nbsp;o envia un email a <a href={`mailto:${email}`}>{email}</a>
			</Row>
			<Spacer>•</Spacer>
			<Row>
				Develop by <a href="https://www.gatsbyjs.com/">Plukke Team</a>
			</Row>
			<Spacer>•</Spacer>
			<Row>
				<a href="https://www.gatsbyjs.com/">Terminos</a> y <a href="https://www.gatsbyjs.com/">Privacidad</a>
			</Row>
		</FooterRoot>
	);
};

export default Footer;
