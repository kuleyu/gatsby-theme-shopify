import styled from '@emotion/styled';
import Button from './Button';

export const Input = styled.input`
	background-color: ${(props) => props.theme.colors.lightest};
	border: 1px solid ${(props) => props.theme.colors.brandBright};
	border-radius: ${(props) => props.theme.radius.default}px;
	color: ${(props) => props.theme.colors.text};
	display: block;
	font-size: 1.1rem;
	padding: ${(props) => props.theme.space[3]}px ${(props) => props.theme.space[4]}px;
	width: 100%;
	:focus {
		box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent};
		outline: 0;
		transition: box-shadow 0.15s ease-in-out;
	}
`;

export const TextArea = styled(Input.withComponent('textarea'))`
	min-height: 150px;
	resize: vertical;
`;

export const Select = styled(Input.withComponent('select'))`
	appearance: none;
	background-position: right 0.5rem center;
	background-repeat: no-repeat;
	background-size: 8px 10px;
	padding-right: ${(props) => props.theme.space[6]}px !important;
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23${(
		props
	) => props.theme.colors.lilac.substr(1)}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
`;

export const Fieldset = styled.fieldset`
	border: none;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: 0;
	padding: 0;
`;

export const Label = styled.label`
	color: ${(props) => props.theme.colors.textLight};
	display: flex;
	font-size: 1rem;
	padding: ${(props) => props.theme.space[2]}px;
`;

export const Submit = styled(Button)`
  font-size: 1rem;
  margin-top: ${(props) => props.theme.space[4]}px;
  width: 100%;
`;
