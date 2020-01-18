import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {

    const [latitude, setLatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [techs, setTechs] = useState('');
    const [github_username, setGithubUsername] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setlongitude(longitude);
            },
            (err) => {
                console.log(err);
            }, {
            timeout: 3000,
        }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setlongitude(e.target.value)} />
                </div>
            </div>
            <button type="submit" onClick={handleSubmit} >Salvar </button>
        </form>
    )
}