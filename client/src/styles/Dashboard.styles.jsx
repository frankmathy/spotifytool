import styled from 'styled-components';

export const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 100%;
`;

export const PlaylistNameInput = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
`;

export const ArtistTitleInput = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
`;

export const ResultsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;
`;

export const PlayerContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const StatusMessage = styled.a`
  font-size: 1rem;
  color: green;
`;

export const BottomContainer = styled.div``;

export const Button = styled.button`
  background-color: #3f51b5;
  font-size: 1rem;

  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #283593;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const PageFooter = styled.div`
  margin: 5rem;
`;
