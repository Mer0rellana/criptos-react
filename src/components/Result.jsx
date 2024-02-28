import styled from '@emotion/styled'

const Res = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 30px;
`

const P = styled.p`
    font-size: 18px;
    span{
    font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 24px;
    span{
    font-weight: 700;
    }
`
const Img = styled.img`
    display: block;
    width: 120px;

`

export const Result = ({ res }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = res
    return (
        <Res>
            <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt='crypto' />
            <div>
                <Price>El precio es de: <span> {PRICE}</span></Price>
                <P>Precio más alto del día:  <span> {HIGHDAY}</span></P>
                <P>Precio más bajo del día:  <span> {LOWDAY}</span></P>
                <P>Variación últimas 24hs:  <span> {CHANGEPCT24HOUR}</span></P>
                <P>Ultima actualización:  <span> {LASTUPDATE}</span></P>
            </div>
        </Res>
    )
}
