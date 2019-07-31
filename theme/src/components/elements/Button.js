import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { hex2rgba } from '../../utils/helpers';

const SecondaryButtonRoot = styled.button`
	align-items: center;
	background: ${(props) => (props.inverse ? props.theme.colors.primaryDark : props.theme.colors.lightest)};
	border: 1px solid ${(props) => (props.inverse ? props.theme.colors.primaryLight : props.theme.colors.primary)};
	/* border-radius: ${(props) => props.theme.radius.default}px; */
	border-radius: 9999px;
	color: ${(props) => (props.inverse ? props.theme.colors.primaryLight : props.theme.colors.primary)};
	text-decoration: none;
	cursor: pointer;
	display: inline-flex;
	font-family: ${(props) => props.theme.fonts.heading};
	font-size: 1.1rem;
	justify-content: center;
	padding: 0.5em 0.75rem;
	transition: 0.5s;
	:focus {
		box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent};
		outline: 0;
		transition: box-shadow 0.15s ease-in-out;
	}
	svg {
		height: 1.1em;
		margin-left: ${(props) => (props.iconOnLeft ? 0 : '0.5em')};
		margin-right: ${(props) => (props.iconOnLeft ? '0.5em' : 0)};
		width: 1.1em;
	}
	@media (hover: hover) {
		&:hover {
			box-shadow: 0 0 0 1px ${(props) => props.theme.colors.accent};
		}
	}
`;

const ButtonBase = styled.button`
	border-width: 0;
	border-radius: 9999px;
	font-size: 14px;
	z-index: 100;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	color: #f5f5fa;
	padding-left: 32px;
	padding-right: 32px;
	transition: box-shadow 0.15s ease, transform 0.15s ease;
	will-change: box-shadow, transform;
	text-shadow: 0 1px 0 #4b5ef0;
	background: ${(props) =>
		`linear-gradient(${props.theme.colors.primaryLight}, ${props.theme.colors.primary}) no-repeat`};
	box-shadow: 0 7px 13px -3px ${(props) => hex2rgba(props.theme.colors.primaryDark, 0.3)},
		0 2px 4px 0 ${(props) => hex2rgba(props.theme.colors.primaryDark, 0.4)},
		inset 0 -2px 0 0 ${(props) => props.theme.colors.primaryDark};
	height: 42px;
	cursor: pointer;

	&:hover,
	&:focus {
		box-shadow: 0 11px 16px -3px ${(props) => hex2rgba(props.theme.colors.primaryDark, 0.3)},
			0 4px 5px 0 ${(props) => hex2rgba(props.theme.colors.primaryDark, 0.4)},
			inset 0 -2px 0 0 ${(props) => props.theme.colors.primaryDark};
		transform: translateY(-2px);
		outline: none;
	}

	&:active {
		transition: none !important;
		transform: translateY(2px);
		box-shadow: inset 0 2px 0 1px rgba(132, 138, 184, 0.11), inset 0 2px 9px 0 rgba(93, 100, 148, 0.9),
			inset 0 -1px 0 1px ${(props) => props.theme.colors.primary};
		background-blend-mode: multiply, normal;
		background-image: ${(props) => `linear-gradient(
					${props.theme.colors.primary},
					${props.theme.colors.primary}
				),
				linear-gradient(to top, #fff, #e4e4e9)`};
	}

	> span {
		font-family: ${(props) => props.theme.fonts.heading};
		font-weight: 400;
		letter-spacing: 1.5px;
		/* text-transform: uppercase; */

		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 98%;
			height: 90%;
			left: 50%;
			top: 50%;
			transform: translateY(-52%) translateX(-50%);
			z-index: -1;
			margin: 0 0 0 0;
			border-radius: 9999px;
			box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.05), 0 2px 5px rgba(255, 255, 255, 0.1);
			/* background: linear-gradient(#cbc7bc, #d2cbc3); */
			/* background: ${(props) =>
				`radial-gradient(${props.theme.colors.primaryLight}, ${props.theme.colors.primary}) no-repeat`}; */
		}

		> div {
			display: flex;
			align-items: center;
			svg {
				height: 1.1em;
				margin-left: ${(props) => (props.iconOnLeft ? 0 : '0.5em')};
				margin-right: ${(props) => (props.iconOnLeft ? '0.5em' : 0)};
				width: 1.1em;
			}
		}
	}
`;

const ButtonAsExternalLink = styled(ButtonBase.withComponent(`a`))`
  display: inline-flex;
  text-decoration: none;
`;

const ButtonAsInternalLink = ButtonAsExternalLink.withComponent(({ iconOnLeft, inverse, ...rest }) => (
	<Link {...rest} />
));

const Button = ({ to, href, ref, inverse = false, children, ...rest }) => {
	const iconOnLeft = typeof children[0] !== 'string';
	if (to) {
		return (
			<ButtonAsInternalLink to={to} iconOnLeft={iconOnLeft} inverse={inverse} {...rest}>
				<span>
					<div>{children}</div>
				</span>
			</ButtonAsInternalLink>
		);
	} else if (href) {
		return (
			<ButtonAsExternalLink href={href} inverse={inverse} iconOnLeft={iconOnLeft} {...rest}>
				<span>
					<div>{children}</div>
				</span>
			</ButtonAsExternalLink>
		);
	}
	return (
		<ButtonBase inverse={inverse} iconOnLeft={iconOnLeft} {...rest}>
			<span>
				<div>{children}</div>
			</span>
		</ButtonBase>
	);
};

const SecondaryButtonAsInternalLink = SecondaryButtonRoot.withComponent((props) => <Link {...props} />);

export const SecondaryButton = ({ to, children, ...restProps }) => {
	if (to) {
		return (
			<SecondaryButtonAsInternalLink to={to} {...restProps}>
				{children}
			</SecondaryButtonAsInternalLink>
		);
	}
	return <SecondaryButtonRoot {...restProps}>{children}</SecondaryButtonRoot>;
};
export default Button;
