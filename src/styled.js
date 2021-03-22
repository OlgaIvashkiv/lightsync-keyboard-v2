import styled from 'styled-components';

export const Wrapper = styled.main`
    background-color: #282c34;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`;

export const Keyboard = styled.div`
    background-color: #ffffff;
    padding: 25px;
    width: 700px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-top: 10px;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 5px;
`

export const Key = styled.div.attrs(props => ({
  style: {
    borderColor: props.color || '#ffffff',
  },
}))`
    color: #000000;
    border: 2px solid #9A9A9A;
    border-radius: 6px;
    padding: 0 15px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: box-shadow .3s;
    text-transform: uppercase;
    box-shadow: 0 0 0 1px;
    &:nth-child(69){
        flex: 1
    }
    
    &:hover {
    box-shadow: 1px 1px 2px 2px rgba(166,166,166,0.75) ;
    -webkit-box-shadow: 1px 1px 2px 2px rgba(166,166,166,0.75) ;
    -moz-box-shadow: 1px 1px 2px 2px rgba(166,166,166,0.75);
}
`


