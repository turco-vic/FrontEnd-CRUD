"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Post.module.css";
import axios from "axios";

export default function Post() { 
    const [loading, setLoading] = useState(false);
    const [addComment, setAddComment] = useState([]);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });

    const criarNovoComentario = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments",{
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim(),
            });

            const commentWithUniqueId = {
                ...response.data,
                id: Date.now() + Math.random() // 
            };

            setAddComment([commentWithUniqueId, ...addComment]);
            setForm({name: "", email: "", body: ""});
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao criar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Criar Novo Comentário</h1>

            <div className={styles.content}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={atualizarForm}
                    placeholder="Digite seu nome fiot!"
                    className={styles.input}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={atualizarForm}
                    placeholder="Digite seu email fiot!"
                    className={styles.input}
                    required
                />
                <textarea
                    name="body"
                    value={form.body}
                    onChange={atualizarForm}
                    placeholder="Digite seu comentário fiot!"
                    className={styles.textarea}
                    rows={4}
                />
                <button onClick={criarNovoComentario} disabled={!form.name.trim() || loading} className={styles.button}>
                    {loading ? "Criando..." : "Criar Comentário"}
                </button>
            </div>

            {error && <p className={styles.error}>❌ Erro ao criar comentário</p>}

            <h2 className={styles.subtitle}>Comentários Criados ({addComment.length})</h2>
            <ul className={styles.commentsList}>
                {addComment.map((comment) => (
                    <li key={comment.id} className={styles.commentItem}>
                        <hr className={styles.divider} />
                        <p className={styles.commentName}>{comment.name}</p>
                        <p className={styles.commentEmail}>{comment.email}</p>
                        <p className={styles.commentBody}>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
