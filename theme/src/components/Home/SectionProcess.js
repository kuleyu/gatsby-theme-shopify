import React from 'react';
import styled from '@emotion/styled';
import { Container, Styled } from 'theme-ui';
import { Flex, Box } from '@rebass/grid/emotion';
import { hex2rgba } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WaveSvg } from '../elements/Svgs';

const SectionRoot = styled.div`
	background-color: ${(props) => props.theme.colors.backgroundPrimary};
	position: relative;
	width: 100%;
	padding-bottom: 40px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 120px;
`;

const StyledFlexBox = styled(Box)`
	flex-basis: 300px;
	background: ${(props) => props.theme.colors.lightest};
	padding: ${(props) => props.theme.space[4]}px;
	border-radius: ${(props) => props.theme.radius.large}px;
	position: relative;
	transition: all 0.3s ease-out;

	svg {	
		color: ${(props) => props.theme.colors.primary};
		font-size: 42px;
		margin-bottom: 0.5rem;
	}
	&:hover {
		box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.15);
		color: ${(props) => props.theme.colors.lightest};
		background: ${(props) =>
			`linear-gradient(${hex2rgba(props.theme.colors.primary, 0.6)}, ${hex2rgba(
				props.theme.colors.primaryLight,
				0.6
			)})`};
		h2 {
			color: ${(props) => props.theme.colors.lightest} !important;
		}
		svg {
			color: ${(props) => props.theme.colors.lightest} !important;
		}
	}
`;

const Separator = styled.div`
	max-width: 45px;
	margin: 0 5px;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	> div {
		margin: 0 2px;
		border-radius: 20px;
		background-color: ${(props) => props.theme.colors.primaryLight};
		height: 4px;
		width: 4px;
	}

	> div:nth-of-type(2) {
		height: 8px;
		width: 8px;
	}
	@media (max-width: ${(props) => props.theme.breakPoints.tablet}px) {
		display: none;
	}
`;

const DotSeparator = () => (
	<Separator>
		<div />
		<div />
		<div />
	</Separator>
);

const SectionProcess = ({ title, description, steps }) => {
	return (
		<SectionRoot>
			<Container>
				<Content>
					<Styled.h2>{title}</Styled.h2>
					<p>{description}</p>
					<WaveSvg width="100%" color="true" top="-150px" />
					<div
						style={{
							width: '100%',
							marginTop: '1rem'
						}}
					>
						<Flex flexWrap="wrap" justifyContent="center">
							{steps.slice(0, 3).map(({ title, description, icon }, index) => (
								<React.Fragment key={index}>
									<StyledFlexBox my={2} width={[ 1, 1 / 2, 1 / 4 ]}>
										<FontAwesomeIcon icon={icon} />
										<Styled.h2>{title}</Styled.h2>
										<p>{description}</p>
									</StyledFlexBox>
									{2 !== index ? <DotSeparator /> : null}
								</React.Fragment>
							))}
						</Flex>
					</div>
					<WaveSvg width="100%" />
				</Content>
			</Container>
		</SectionRoot>
	);
};

export default SectionProcess;
