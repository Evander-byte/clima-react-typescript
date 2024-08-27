import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FromProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

const Form = ({ fetchWeather }: FromProps) => {

    const initialState = {
        city: '',
        country: ''
    }

    const [search, setSearch] = useState<SearchType>(initialState)

    const [alert, setAlert] = useState('');

    setTimeout(() => {
        setAlert('')
    }, 5000)

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
        setSearch(initialState)
    }

    return (
        <form className={styles.form} action="" onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.fields}>
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={search.city}
                    placeholder="Ciudad"
                    onChange={handleChange}
                />
            </div>
            <div className={styles.fields}>
                <label htmlFor="country">País</label>
                <select
                    name="country"
                    id="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >{country.name}</option>
                    ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value="Consultar Clima" />
        </form>
    )
}

export default Form
