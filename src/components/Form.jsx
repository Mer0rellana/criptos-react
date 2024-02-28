import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelect from '../hooks/useSelect'
import { currency } from '../data/currency'
import { Error } from './Error'

const Button = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 18px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCoin}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    const [ co, SelectCurrency ] = useSelect('Elige tu moneda', currency)
    const [ cr, SelectCrypto ] = useSelect('Elige tu criptomoneda', cryptos)


useEffect(()=>{
  const consume = async () =>{
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    const res = await fetch(url)

    const resp = await res.json()

    const cryptos = resp.Data.map( crypto => ({
        id: crypto.CoinInfo.Name,
        name: crypto.CoinInfo.FullName
    }))

    setCryptos(cryptos)

  }
  consume()
},[])

const handleSubmit = e =>{
    e.preventDefault()

    if([co, cr].includes('')){
      setError(true)
      return
    }

    setError(false)
    setCoin({
      co, cr
    })
  }

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}

    <form onSubmit={handleSubmit}>

        <SelectCurrency />
        <SelectCrypto />

        <Button type="submit" value={'Cotizar'}/>
    </form>
    </>
  )
}

export default Form