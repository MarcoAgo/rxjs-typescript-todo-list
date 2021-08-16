// @ts-ignore
import styled from "styled-components";

interface ContainerType {
	visible: boolean,
}

export const Container = styled.div`
	display: ${(p: ContainerType) => p.visible ? 'block' : 'none'};
`;

export const ButtonsContainer = styled.div`
	margin-top: 12px;
	margin-bottom: 12px;
`;
