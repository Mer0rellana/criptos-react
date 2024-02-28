import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import IMGCrypto from './img/imagen-criptos.png'
import Form from './components/Form'
import { Result } from './components/Result'
import { Spinner } from './components/Spinner'

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [coin, setCoin] = useState({})
  const [exchange, setExchange] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (Object.keys(coin).length > 0) {
      const exchange = async () => {
        setLoading(true)
        setExchange({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin.cr}&tsyms=${coin.co}`

        const res = await fetch(url)
        const resp = await res.json()

        setExchange(resp.DISPLAY[coin.cr][coin.co])

        setLoading(false)
      }

      exchange()
    }
  }, [coin])

  return (
    <Container>
      <Img src={IMGCrypto} alt='cryptos' />

      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form setCoin={setCoin} />

        {loading && <Spinner/>}
       {exchange.PRICE && <Result res={exchange}/> }
      </div>
    </Container>
  )
}

export default App
