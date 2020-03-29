import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import Logo from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile () {

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const [ incidents, setIncidents ] = useState([])

    const history = useHistory()

    useEffect(() => {
        api.get('ongs/incidents', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    },[ongId])

    async function handleDeleteIncident (id){
        try{
            await api.delete(`/ongs/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

            alert('Case removido com sucesso!')
        }catch(err){
            alert('Erro ao deletar case, tente novamente!')
        }
    }

    function handleLogout (){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be The Hero" />
                <span>Ben vinda, {ongName}.</span>

                <Link to="/profile/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <p>{incident.ong_id}</p>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}