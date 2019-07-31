import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { keyframes } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProductThumbnails, { ProductThumbnailsContent, Thumbnail } from './ProductThumbnails';
import { SecondaryButton } from '../elements/Button';
import { debounce } from '../../utils/helpers';

const IMAGE_CHANGE_ANIM_DURATION = 250;

const entry = keyframes`
  0% {
    left: 0;
    transform: scale(0.8);
  }
  100% {
    left: 0;
    transform: scale(1);
  }
`;

const exit = keyframes`
  0% {
    left: 0;
    opacity: 1;
    transform: scale(1);
  }
  99% {
    left: 0;
    opacity: 0;
    transform:  scale(0.8);
  }
  100% {
    left: 100%;
    opacity: 0;
    transform:scale(0.8);
  }
`;

const ProductImagesBrowserRoot = styled.div`
	background: white;
	bottom: 0;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column-reverse;
	justify-content: stretch;
	left: 100%;
	opacity: 1;
	position: fixed;
	top: 0;
	transform: scale(0.8);
	transform-origin: center center;
	width: 100vw;
	will-change: opacity, transform, left;
	z-index: 10000;
	&.open {
		animation: ${entry} 300ms ease-out forwards;
	}
	&.closed {
		animation: ${exit} 200ms ease-out forwards;
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		flex-direction: row;
		height: 100vh;
	}
`;

const change = keyframes`
  0% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;

const ZoomArea = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.colors.brandLight};
	flex-grow: 1;
	flex-shrink: 0;
	height: calc(100% - ${(props) => props.theme.dimensions.pictureBrowserAction.widthDesktop});
	-webkit-overflow-scrolling: touch;
	overflow-x: scroll;
	overflow-y: scroll;
	width: 100%;
	&.change {
		animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		border-bottom: none;
		border-left: 1px solid ${(props) => props.theme.colors.brandLight};
		display: flex;
		height: 100vh;
		justify-content: center;
		overflow-x: hidden;
		overflow-y: auto;
		width: calc(100% - ${(props) => props.theme.dimensions.pictureBrowserAction.widthDesktop});
	}
`;

const ImageBox = styled.a`
	display: block;
	height: 100%;
	position: relative;
	width: 100%;
	.gatsby-image-wrapper {
		height: auto;
		width: ${(props) => (props.superZoom ? props.width * 2 : props.width)}px;
	}
	@media (orientation: landscape) {
		.gatsby-image-wrapper {
			width: ${(props) => (props.superZoom ? '200' : '100')}%;
		}
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		cursor: ${(props) => (props.superZoom ? 'zoom-out' : 'zoom-in')};
		width: ${(props) => (props.superZoom ? '100%' : 'auto')};
		.gatsby-image-wrapper {
			width: ${(props) => (props.superZoom ? '100%' : '100vh')};
		}
	}
`;

const Actions = styled.div`
	align-items: center;
	display: flex;
	flex-grow: 0;
	height: ${(props) => props.theme.dimensions.pictureBrowserAction.heightMobile};
	padding-left: ${(props) => props.theme.space[4]}px;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		align-items: center;
		flex-direction: column;
		height: 100vh;
		padding-left: 0;
		padding-top: ${(props) => props.theme.space[6]}px;
		width: ${(props) => props.theme.dimensions.pictureBrowserAction.widthDesktop};
	}
`;

const CloseButton = styled(SecondaryButton)`
  position: relative;
`;

const ActionsThumbnails = styled(ProductThumbnails)`
  @media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
    ${ProductThumbnailsContent} {
      align-items: center;
      flex-direction: column;
    }
    ${Thumbnail} {
      height: 70px;
      margin-bottom: ${(props) => props.theme.space[4]}px;
      margin-right: 0;
      width: 70px;
    }
  }
`;

const ProductImagesBrowser = ({ images, position, imageFeatured, toggle }) => {
	const zoomAreaRef = useRef();
	const imageBoxRef = useRef();
	const [ imageSettings, setImageSettings ] = useState({
		zoomAreaWidth: null,
		imageBoxHeight: null,
		superZoom: false
	});
	const { superZoom, imageBoxHeight, zoomAreaWidth } = imageSettings;

	const image = imageFeatured ? imageFeatured : images[0];

	const { localFile: { childImageSharp: { fluid } } } = image;

	useEffect(() => {
		measureImage();
		centerImage();
		window && window.addEventListener('resize', debounce(250, measureImage));

		return () => window && window.removeEventListener('resize', measureImage);
	}, []);

	useEffect(
		() => {
			if (position === 'open' && superZoom) {
				setImageSettings({ ...imageSettings, superZoom: false });
			}

			centerImage();
			if (zoomAreaRef && zoomAreaRef.current) zoomAreaRef.current.classList.add('change');

			setTimeout(
				() => zoomAreaRef && zoomAreaRef.current && zoomAreaRef.current.classList.remove('change'),
				IMAGE_CHANGE_ANIM_DURATION
			);
		},
		[ position, imageFeatured ]
	);

	const toggleZoomRatio = (e) => {
		e.preventDefault();
		setImageSettings({ ...imageSettings, superZoom: !superZoom });
	};

	const measureImage = () => {
		if (zoomAreaRef && zoomAreaRef.current && imageBoxRef && imageBoxRef.current) {
			setImageSettings({
				...imageSettings,
				zoomAreaWidth: zoomAreaRef.current.offsetWidth,
				imageBoxHeight: zoomAreaRef.current.offsetHeight
			});
		}
	};

	const centerImage = () => {
		const offsetToScroll = imageBoxHeight - zoomAreaWidth / 2;
		if (zoomAreaRef && zoomAreaRef.current) zoomAreaRef.current.scrollLeft = offsetToScroll;
	};

	return (
		<ProductImagesBrowserRoot role="dialog" className={position}>
			<Actions>
				<CloseButton onClick={toggle}>
					<FontAwesomeIcon icon="times" />
					Cerrar
				</CloseButton>
				<ActionsThumbnails images={images} />
			</Actions>
			<ZoomArea ref={zoomAreaRef}>
				<ImageBox
					onClick={toggleZoomRatio}
					href={fluid.src}
					superZoom={superZoom}
					width={imageBoxHeight}
					ref={imageBoxRef}
				>
					<Image fluid={fluid} />
				</ImageBox>
			</ZoomArea>
		</ProductImagesBrowserRoot>
	);
};

export default ProductImagesBrowser;
