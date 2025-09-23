"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Delete.module.css";

export default function Delete() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${commentId}`);
            setSuccess(true);
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Delete Page</h1>
            <p className={styles.subTitle}>Are you sure you want to delete any comment?</p>

            <div className={styles.formGroup}>
                <input
                    type="text"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="Enter Comment ID"
                    className={styles.input}
                />
                <button onClick={buscarComentario} disabled={!commentId || loading}
                className={styles.fetchButton}
                >
                    {loading ? "Loading..." : "Fetch Comment"}
                </button>
            </div>
            {comment && (
                <div className={styles.commentContent}>
                    <h2 className={styles.commentDetailsTitle}>Comment Details : {comment.id}</h2>
                    <p className={styles.commentNameLabel}>Name: {comment.name}</p>
                    <p className={styles.commentEmailText}>Email: {comment.email}</p>
                    <p className={styles.commentComment}>Comment: {comment.body}</p>

                    <button onClick={deletarComentario} disabled={loading}
                    className={styles.delete}
                    >
                        {loading ? "Deleting..." : "Delete Comment"}
                    </button>
                </div>
            )}
            {error && <p> Error in the delete operation</p>}
            {success && <p>Comment deleted successfully!</p>}
        </div>
    );
}
