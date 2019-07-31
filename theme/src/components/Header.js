import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import useClickOutside from '../hooks/useClickOutSide';
import Cart from './Cart';

const HeaderRoot = styled.header`
	align-items: center;
	background-color: transparent;
	box-sizing: border-box;
	display: ${(props) => (props.isCovered ? 'none' : 'flex')};
	height: ${(props) => props.theme.dimensions.headerHeight};
	justify-content: space-between;
	left: 0;
	padding-left: ${(props) => props.theme.space[8] + 24}px;
	padding-right: ${(props) => props.theme.space[8] + 24}px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1000;
	transition: background-color 300ms ease-in;

	&.colored {
		background-color: ${(props) => props.theme.colors.lightest};
		border-bottom: 1px solid ${(props) => props.theme.colors.brandLight};
	}

	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		&.covered {
			display: none;
		}
	}
	@media (max-width: ${(props) => props.theme.breakPoints.tablet}px) {
		padding-left: 0;
	}
`;

const HomeLink = styled(GatsbyLink)`
	margin: 0 ${(props) => props.theme.space[3]}px;
	text-decoration: none;
	color: ${(props) => props.theme.colors.gray[2]};
	max-height: 65px;
	:hover {
    color: ${(props) => props.theme.colors.primary};
  }
	&.active {
		color: ${(props) => props.theme.colors.primary};
	}
	&.logo {
		margin: 0 auto;
	}
`;

const HeaderLinksContent = styled.div`
	flex: 1;
	text-align: ${(props) => (props.right ? 'right' : 'left')};
	font-size: ${(props) => props.theme.fontSizes[1]}px;
	${HomeLink} {
		&:first-of-type {
			margin-left: 0;
		}
	}
	@media (max-width: ${(props) => props.theme.breakPoints.tablet}px) {
		display: none;
	}
`;

const MenuLink = styled(HomeLink.withComponent('a'))`
	max-width: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	margin: 0;
	padding: 0 auto;
	cursor: pointer;
	position: relative;

	font-size: ${(props) => props.theme.fontSizes[3]}px;
	@media (min-width: ${(props) => props.theme.breakPoints.tablet}px) {
		display: none;
	}
`;

const CloseMenuLink = styled(MenuLink)`
	display: flex;
	position: absolute;
	right: 0;
	top: 0;
	width: 51px;
	height: 51px;
	font-size: ${(props) => props.theme.fontSizes[3]};

	cursor: pointer;
`;

const Menu = styled.div`
	position: absolute;
	z-index: 2000;
	width: calc(100% - 20px);
	top: 15px;
	left: 10px;
	display: flex;
	justify-content: flex-end;
	pointer-events: none;
	perspective: 2000px;
`;

const MenuContainer = styled.div`
	background: ${(props) => props.theme.colors.lightest};
	box-shadow: 0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3),
		0 -18px 60px -10px rgba(0, 0, 0, .025);
	border-radius: 4px;
	overflow: hidden;
	position: relative;
	font-size: 17px;
	line-height: 40px;
	white-space: nowrap;
	flex-grow: 1;
	opacity: 0;
	transform: scale(.95);
	transform-origin: top left;
	transition-property: transform, opacity, -webkit-transform;
	transition-duration: .25s;

	&.open {
		transform: none;
		opacity: 1;
		pointer-events: auto;
	}
`;

const MenuContent = styled.div`
	display: block;
	padding: 20px 0 15px;
	ul {
		flex-grow: 1;
		padding: 0;
		margin: 0;
		list-style: none;

		li {
			list-style: none;
			> a {
				padding: 0 20px;
				min-width: 100px;
				color: ${(props) => props.theme.colors.gray[1]};
				svg {
					margin: 0 10px 0 -3px;
				}
			}
		}
	}
`;

const Header = ({ isDesktopViewport, productImagesBrowserStatus }) => {
	const [ className, setClassName ] = useState('');
	const [ isOpenMenu, openMenu ] = useState(false);
	const ref = useRef();

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	useEffect(
		() => {
			if (isDesktopViewport) {
				if (productImagesBrowserStatus === 'open') {
					setClassName(`${className} covered`);
				} else {
					setClassName('');
				}
			}
		},
		[ productImagesBrowserStatus ]
	);

	useClickOutside(ref, () => openMenu(false));

	const handleScroll = () => {
		if (window.scrollY > 80 && !className.includes('colored')) {
			setClassName(`${className} colored`);
		} else if (window.scrollY < 80 && className.includes('colored')) {
			setClassName(className.replace('colored', ''));
		}
	};

	const { file } = useStaticQuery(graphql`
		query {
			file(name: { eq: "logo" }) {
				childImageSharp {
					fixed(width: 65, height: 65) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`);

	return (
		<HeaderRoot className={className}>
			<MenuLink onClick={() => openMenu(true)}>
				<FontAwesomeIcon icon="bars" />
			</MenuLink>
			<Menu ref={ref}>
				<MenuContainer className={isOpenMenu ? 'open' : ''}>
					<CloseMenuLink onClick={() => openMenu(false)}>
						<FontAwesomeIcon icon="times" />
					</CloseMenuLink>
					<MenuContent>
						<ul>
							<li>
								<HomeLink activeClassName="active" to="/">
									<FontAwesomeIcon icon="home" />
									Inicio
								</HomeLink>
							</li>
							<li>
								<HomeLink activeClassName="active" to="/products">
									Productos
								</HomeLink>
							</li>
							<li>
								<HomeLink activeClassName="active" to="/about-us">
									Nosotros
								</HomeLink>
							</li>
						</ul>
					</MenuContent>
				</MenuContainer>
			</Menu>
			<HeaderLinksContent>
				<HomeLink activeClassName="active" to="/">
					Inicio
				</HomeLink>
				<HomeLink activeClassName="active" to="/products">
					Productos
				</HomeLink>
			</HeaderLinksContent>
			<HomeLink to="/" className="logo" aria-label="Home Page">
				<Image fixed={file.childImageSharp.fixed} />
			</HomeLink>
			<HeaderLinksContent right>
				<HomeLink activeClassName="active" to="/about-us">
					Nosotros
				</HomeLink>
			</HeaderLinksContent>
			<Cart />
		</HeaderRoot>
	);
};

export default Header;
