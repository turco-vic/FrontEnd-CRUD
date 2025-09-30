"use client"
import axios from "axios";
import { useState } from "react";

export default function Update() {
    const [commentId, setCommentid] = useState("");
    const [form, setForm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setForm({ name: data.name, email: data.email, body: data.body });
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, form);
            setSuccess(true);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>EDITAR COMENTÁRIO</h1>
            <input
                type="number"
                value={commentId}
                onChange={(e) => setCommentid(e.target.value)}
                placeholder="ID do comentário!"
            />
            <button onClick={buscarComentario} disabled={loading || !commentId}>
                {loading ? "Buscando..." : "Buscar Comentário"}
            </button>

            {form.name && (
                <div>
                    <h2>Editar detalhes de comentário</h2>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Digite aqui o nome do Caboclo"
                    />
                    <br />
                    <input
                        type="text"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Digite aqui o email do Caboclo"
                    />
                    <br />
                    <textarea
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder="Digite aqui o comentário do Caboclo"
                    />
                    <br />
                    <button onClick={editarComentario} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            )}
            {error && <p>Erro na operação, da seus pulo</p>}
            {success && <p>Comentário editado com sucesso!</p>}
        </div>
    );
}